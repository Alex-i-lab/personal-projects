import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapContainer, TileLayer, Marker, useMapEvents, Polyline, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Search, X, Navigation } from 'lucide-react';

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const customPickupIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const customDropoffIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapSelectorProps {
  mode?: 'route' | 'single';
  pickupCoords: [number, number] | null;
  dropoffCoords: [number, number] | null;
  onPickupChange: (coords: [number, number] | null, address: string) => void;
  onDropoffChange: (coords: [number, number] | null, address: string) => void;
  pickupDraggable?: boolean;
}

const defaultCenter: [number, number] = [-1.9441, 30.0619]; // Kigali

// Component to handle map clicks
const MapEvents = ({ 
  mode,
  pickupCoords, 
  dropoffCoords, 
  onPickupChange, 
  onDropoffChange,
  pickupDraggable
}: any) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      
      // Reverse geocoding using Nominatim
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();
        const address = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

        if (mode === 'single') {
          onDropoffChange([lat, lng], address);
          return;
        }

        // If pickup is fixed (e.g. Airport), map clicks always update dropoff
        if (!pickupDraggable) {
          onDropoffChange([lat, lng], address);
          return;
        }

        if (!pickupCoords || (pickupCoords && dropoffCoords)) {
          onPickupChange([lat, lng], address);
          if (pickupCoords && dropoffCoords) {
            onDropoffChange(null, '');
          }
        } else if (!dropoffCoords) {
          onDropoffChange([lat, lng], address);
        }
      } catch (error) {
        console.error("Error reverse geocoding:", error);
      }
    },
  });
  return null;
};

// Component to handle routing
const RoutingMachine = ({ pickupCoords, dropoffCoords }: { pickupCoords: [number, number] | null, dropoffCoords: [number, number] | null }) => {
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const map = useMap();

  useEffect(() => {
    if (!pickupCoords || !dropoffCoords) {
      setRouteCoords([]);
      return;
    }

    const fetchRoute = async () => {
      try {
        const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${pickupCoords[1]},${pickupCoords[0]};${dropoffCoords[1]},${dropoffCoords[0]}?overview=full&geometries=geojson`);
        const data = await response.json();
        
        if (data.routes && data.routes[0]) {
          const coords = data.routes[0].geometry.coordinates.map((c: [number, number]) => [c[1], c[0]] as [number, number]);
          setRouteCoords(coords);
          
          // Fit bounds to route
          const bounds = L.latLngBounds([pickupCoords, dropoffCoords]);
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();
  }, [pickupCoords, dropoffCoords, map]);

  if (routeCoords.length === 0) return null;

  return <Polyline positions={routeCoords} color="#000000" weight={4} opacity={0.7} />;
};

// Component to center map
const MapCenterer = ({ coords }: { coords: [number, number] | null }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, map.getZoom());
    }
  }, [coords, map]);
  return null;
};

// Component to handle user location
const LocateControl = ({ onLocationFound }: { onLocationFound: (coords: [number, number], address: string, accuracy: number) => void }) => {
  const map = useMap();
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      L.DomEvent.disableClickPropagation(buttonRef.current);
      L.DomEvent.disableScrollPropagation(buttonRef.current);
    }
  }, []);

  const handleLocate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);
    setError(null);

    let watchId: number | null = null;
    let bestPosition: GeolocationPosition | null = null;
    const startTime = Date.now();

    const stopWatching = () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
      }
    };

    const processPosition = async (position: GeolocationPosition) => {
      if (!bestPosition || position.coords.accuracy < bestPosition.coords.accuracy) {
        bestPosition = position;
      }

      // If accuracy is good enough (less than 20 meters) or we've waited 4 seconds
      if (position.coords.accuracy < 20 || Date.now() - startTime > 4000) {
        stopWatching();
        const { latitude: lat, longitude: lng, accuracy } = bestPosition.coords;
        
        map.setView([lat, lng], 16);

        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          const data = await response.json();
          const address = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
          onLocationFound([lat, lng], address, accuracy);
        } catch (error) {
          console.error("Error reverse geocoding location:", error);
          onLocationFound([lat, lng], `${lat.toFixed(4)}, ${lng.toFixed(4)}`, accuracy);
        } finally {
          setIsLocating(false);
        }
      }
    };

    watchId = navigator.geolocation.watchPosition(
      processPosition,
      (e) => {
        stopWatching();
        setIsLocating(false);
        console.error("Location error:", e.message);
        if (e.code === 1) {
          setError("Location permission denied.");
        } else if (e.code === 3) {
          setError("Location request timed out.");
        } else {
          setError("Could not find your location.");
        }
        setTimeout(() => setError(null), 5000);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );

    // Safety timeout to stop watching after 10 seconds
    setTimeout(() => {
      if (watchId !== null) {
        stopWatching();
        if (bestPosition) {
          processPosition(bestPosition);
        } else {
          setIsLocating(false);
          setError("Location request timed out.");
        }
      }
    }, 10000);
  };

  return (
    <div ref={buttonRef} className="absolute bottom-4 right-4 z-[1000] flex flex-col items-end gap-2">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded-xl shadow-lg"
          >
            {error}
          </motion.div>
        )}
        {isLocating && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-2 rounded-xl shadow-lg flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-ping" />
            Refining location...
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={handleLocate}
        disabled={isLocating}
        className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center text-black hover:bg-black hover:text-white transition-all border border-black/10 group"
        title="Locate Me"
      >
        <Navigation size={20} className={isLocating ? "animate-pulse" : "group-hover:scale-110 transition-transform"} />
      </button>
    </div>
  );
};

export const MapSelector: React.FC<MapSelectorProps> = ({ 
  mode = 'route',
  pickupCoords, 
  dropoffCoords, 
  onPickupChange, 
  onDropoffChange,
  pickupDraggable = true
}) => {
  const [locationAccuracy, setLocationAccuracy] = useState<number | null>(null);
  const [lastLocatedCoords, setLastLocatedCoords] = useState<[number, number] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery + ', Kigali, Rwanda')}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching location:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectResult = (result: any) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    const address = result.display_name;

    if (mode === 'single') {
      onDropoffChange([lat, lon], address);
    } else if (!pickupCoords || (pickupCoords && dropoffCoords)) {
      onPickupChange([lat, lon], address);
      if (pickupCoords && dropoffCoords) {
        onDropoffChange(null, '');
      }
    } else if (!dropoffCoords) {
      onDropoffChange([lat, lon], address);
    }

    setSearchResults([]);
    setSearchQuery('');
  };

  const handleMarkerDragEnd = async (e: any, type: 'pickup' | 'dropoff') => {
    const marker = e.target;
    const position = marker.getLatLng();
    const lat = position.lat;
    const lng = position.lng;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      const address = data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;

      if (type === 'pickup') {
        onPickupChange([lat, lng], address);
      } else {
        onDropoffChange([lat, lng], address);
      }
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    }
  };

  const handleLocationFound = (coords: [number, number], address: string, accuracy: number) => {
    setLastLocatedCoords(coords);
    setLocationAccuracy(accuracy);
    
    // Clear accuracy circle after 10 seconds
    setTimeout(() => {
      setLocationAccuracy(null);
    }, 10000);

    if (mode === 'single') {
      onDropoffChange(coords, address);
    } else if (!pickupDraggable) {
      // If pickup is fixed (e.g. Airport), Locate Me sets the destination
      onDropoffChange(coords, address);
    } else if (!pickupCoords || (pickupCoords && dropoffCoords)) {
      onPickupChange(coords, address);
      if (pickupCoords && dropoffCoords) {
        onDropoffChange(null, '');
      }
    } else if (!dropoffCoords) {
      onDropoffChange(coords, address);
    }
  };

  return (
    <div className="h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden border border-black/10 relative z-0">
      {/* Search Overlay */}
      <div className="absolute top-4 left-4 right-4 md:left-4 md:right-auto md:w-80 z-[1000]">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col border border-black/10">
          <div className="flex items-center px-4 py-3 bg-white">
            <Search size={18} className="text-black/40 shrink-0" />
            <input
              type="text"
              placeholder="Search OpenStreetMap..."
              className="w-full border-none focus:ring-0 text-sm py-1 px-3 outline-none bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch(e);
                }
              }}
            />
            {searchQuery && (
              <button type="button" onClick={() => { setSearchQuery(''); setSearchResults([]); }} className="shrink-0 text-black/40 hover:text-black">
                <X size={18} />
              </button>
            )}
          </div>
          
          {searchResults.length > 0 && (
            <div className="max-h-60 overflow-y-auto border-t border-black/5 bg-white">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full text-left px-4 py-3 hover:bg-black/5 text-sm border-b border-black/5 last:border-0 transition-colors"
                  onClick={() => handleSelectResult(result)}
                >
                  <p className="font-medium truncate">{result.display_name.split(',')[0]}</p>
                  <p className="text-xs text-black/50 truncate">{result.display_name}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <MapContainer 
        center={pickupCoords || defaultCenter} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapEvents 
          mode={mode}
          pickupCoords={pickupCoords} 
          dropoffCoords={dropoffCoords} 
          onPickupChange={onPickupChange} 
          onDropoffChange={onDropoffChange} 
          pickupDraggable={pickupDraggable}
        />

        <LocateControl onLocationFound={handleLocationFound} />

        {locationAccuracy && lastLocatedCoords && (
          <Circle 
            center={lastLocatedCoords} 
            radius={locationAccuracy} 
            pathOptions={{ 
              fillColor: '#3b82f6', 
              color: '#3b82f6', 
              weight: 1, 
              opacity: 0.3, 
              fillOpacity: 0.1 
            }} 
          />
        )}

        {pickupCoords && mode === 'route' && (
          <Marker 
            position={pickupCoords} 
            icon={customPickupIcon}
            draggable={pickupDraggable}
            eventHandlers={{
              dragend: (e) => handleMarkerDragEnd(e, 'pickup')
            }}
          />
        )}
        
        {dropoffCoords && (
          <Marker 
            position={dropoffCoords} 
            icon={customDropoffIcon}
            draggable={true}
            eventHandlers={{
              dragend: (e) => handleMarkerDragEnd(e, 'dropoff')
            }}
          />
        )}

        {mode === 'route' && <RoutingMachine pickupCoords={pickupCoords} dropoffCoords={dropoffCoords} />}
        
        {/* Center map on the latest selected coordinate if not routing */}
        {mode === 'single' && <MapCenterer coords={dropoffCoords || pickupCoords} />}
      </MapContainer>

      {/* Map Instructions Overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg text-xs font-bold uppercase tracking-widest text-center pointer-events-none whitespace-nowrap mt-14 md:mt-0">
        {mode === 'single' 
          ? (!dropoffCoords ? 'Click map to set Delivery Location' : 'Drag marker to adjust')
          : (!pickupCoords ? 'Click map to set Pickup' : !dropoffCoords ? 'Click map to set Drop-off' : 'Drag markers to adjust')
        }
      </div>
    </div>
  );
};
