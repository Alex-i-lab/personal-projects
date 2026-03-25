// Initialize icons
lucide.createIcons();

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navContainer');
    nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;

        const offset = 100;
        const position = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({ top: position, behavior: 'smooth' });
    });
});

// Scroll reveal animation
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// D3 / Geo: render world map and place markers by lon/lat
(function renderMap(){
    const svg = d3.select('#d3-map');
    const container = document.querySelector('#d3-map').closest('.reveal');
    const bbox = container.getBoundingClientRect();
    const width = Math.max(800, Math.round(bbox.width));
    const height = Math.round(width * 0.5);

    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const topoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

    d3.json(topoUrl).then(topology => {
        const countries = topojson.feature(topology, topology.objects.countries);
        const projection = d3.geoNaturalEarth1()
            .fitSize([width, height], countries);
        const path = d3.geoPath().projection(projection);

        svg.append('g')
            .attr('class', 'countries')
            .selectAll('path')
            .data(countries.features)
            .join('path')
            .attr('d', path)
            .attr('fill', 'rgba(71,85,105,0.18)')
            .attr('stroke', 'rgba(148,163,184,0.25)')
            .attr('stroke-width', 0.4);

        // define Kigali (Rwanda) as meeting point
        const kigali = { id: 'kig', name: 'Kigali, Rwanda', coords: [30.0588, -1.9441] };

        // representative origins from each continent
        const origins = [
            { id: 'ny', name: 'New York', coords: [-74.0060, 40.7128] }, // North America
            { id: 'sao', name: 'Sao Paulo', coords: [-46.6333, -23.5505] }, // South America
            { id: 'ldn', name: 'London', coords: [-0.1278, 51.5074] }, // Europe
            { id: 'hkg', name: 'Hong Kong', coords: [114.1095, 22.3964] }, // Asia
            { id: 'syd', name: 'Sydney', coords: [151.2093, -33.8688] }, // Australia
            { id: 'cpt', name: 'Cape Town', coords: [18.4241, -33.9249] } // Africa
        ];

        // build routes: each origin -> Kigali
        const routes = origins.map(o => [o.coords, kigali.coords]);

        svg.append('g')
            .attr('class', 'routes')
            .selectAll('path')
            .data(routes)
            .join('path')
            .attr('d', d => path({ type: 'LineString', coordinates: d }))
            .attr('fill', 'none')
            .attr('stroke', '#60a5fa')
            .attr('stroke-width', 1.4)
            .attr('class', 'connection-line')
            .style('opacity', 0.8);

        // place origin nodes + Kigali
        const nodes = origins.concat([kigali]);

        const nodeGroup = svg.append('g').attr('class','nodes');

        nodeGroup.selectAll('circle')
            .data(nodes)
            .join('circle')
            .attr('cx', d => projection(d.coords)[0])
            .attr('cy', d => projection(d.coords)[1])
            .attr('r', d => d.id === 'kig' ? 8 : 6)
            .attr('fill', d => d.id === 'kig' ? '#fb923c' : '#60a5fa')
            .attr('stroke', 'rgba(255,255,255,0.95)')
            .attr('stroke-width', d => d.id === 'kig' ? 1.6 : 1.2)
            .attr('class', d => d.id === 'kig' ? 'map-dot-kig' : 'map-dot-svg')
            .on('mouseenter', (event, d) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'map-tooltip';
                tooltip.textContent = d.name;
                tooltip.style.position = 'fixed';
                tooltip.style.pointerEvents = 'none';
                tooltip.style.background = 'rgba(2,6,23,0.9)';
                tooltip.style.color = '#fff';
                tooltip.style.padding = '6px 8px';
                tooltip.style.borderRadius = '6px';
                tooltip.style.fontSize = '12px';
                document.body.appendChild(tooltip);
                const [x,y] = projection(d.coords);
                const rect = container.getBoundingClientRect();
                tooltip.style.left = (rect.left + x + 12) + 'px';
                tooltip.style.top = (rect.top + y - 12) + 'px';
                event.target.__tooltip = tooltip;
            })
            .on('mouseleave', (event) => {
                const t = event.target.__tooltip;
                if (t) t.remove();
            });
    }).catch(err => console.error('Failed to load topojson:', err));
})();