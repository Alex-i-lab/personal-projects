import React from 'react';

const brands = [
  { name: 'Toyota', url: 'https://cdn.simpleicons.org/toyota/000000' },
  { name: 'Mercedes-Benz', url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg' },
  { name: 'BMW', url: 'https://cdn.simpleicons.org/bmw/000000' },
  { name: 'Volkswagen', url: 'https://cdn.simpleicons.org/volkswagen/000000' },
  { name: 'Audi', url: 'https://cdn.simpleicons.org/audi/000000' },
  { name: 'Range Rover', url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDAgODAiPjx0ZXh0IHg9IjE1MCIgeT0iNTAiIGZvbnQtZmFtaWx5PSInSW50ZXInLCBzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iODAwIiBmb250LXNpemU9IjMyIiBsZXR0ZXItc3BhY2luZz0iOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzAwMDAwMCI+UkFOR0UgUk9WRVI8L3RleHQ+PC9zdmc+' },
  { name: 'Porsche', url: 'https://cdn.simpleicons.org/porsche/000000' },
  { name: 'Kia', url: 'https://cdn.simpleicons.org/kia/000000' },
  { name: 'Hyundai', url: 'https://cdn.simpleicons.org/hyundai/000000' },
];

export const CarBrands = () => {
  // Duplicate the brands array enough times to ensure seamless scrolling
  const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="py-20 border-t border-b border-black/5 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-10 text-center">
        <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-black/30">
          The standard behind our fleet's excellence
        </p>
      </div>

      <div className="relative w-full mask-fade-edges">
        <div className="flex items-center gap-16 md:gap-32 w-max px-8 animate-marquee hover:[animation-play-state:paused]">
          {duplicatedBrands.map((brand, index) => (
            <div 
              key={`${brand.name}-${index}`} 
              className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center shrink-0 opacity-20 hover:opacity-100 transition-opacity duration-500 cursor-pointer grayscale group"
            >
              <img 
                src={brand.url} 
                alt={`${brand.name} logo`} 
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
