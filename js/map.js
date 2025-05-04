// Map Functionality using Mapbox
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map if the map section is visible
    if (document.getElementById('distance-map')) {
        initMap();
    }
});

// Initialize Mapbox map
function initMap() {
    // Check if mapboxgl is available
    if (typeof mapboxgl === 'undefined') {
        console.error('Mapbox GL JS is not loaded');
        return;
    }
    
    // Initialize map
    mapboxgl.accessToken = 'pk.eyJ1Ijoib3BlbmFpbWFwYm94IiwiYSI6ImNscXVsbjdqcjA5YWcyanFyZ3Z6MnlvbmoifQ.KLQZuZkJ-2su5hDEItCZYg';
    
    const map = new mapboxgl.Map({
        container: 'distance-map',
        style: 'mapbox://styles/mapbox/light-v11',
        center: [17.1, 39.7], // Approximate center between Bayreuth and Ankara
        zoom: 4
    });
    
    // Add map controls
    map.addControl(new mapboxgl.NavigationControl());
    
    // Cities coordinates
    const bayreuth = [11.5819, 49.9456]; // Bayreuth, Germany
    const ankara = [32.8597, 39.9334]; // Ankara, Turkey
    const aegeanSea = [23.8, 38.5]; // Middle of Aegean Sea (approximate)
    
    // Wait for map to load before adding markers and lines
    map.on('load', function() {
        // Add line between cities
        map.addSource('route', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [
                        bayreuth,
                        ankara
                    ]
                }
            }
        });
        
        map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#8A2BE2',
                'line-width': 4,
                'line-dasharray': [1, 1]
            }
        });
        
        // Add markers for each city
        addMarker(map, bayreuth, 'Bayreuth', 'assets/svg/balloon.svg');
        addMarker(map, ankara, 'Ankara', 'assets/svg/balloon.svg');
        
        // Add heart marker in Aegean Sea (initially hidden)
        const heartMarkerElement = document.createElement('div');
        heartMarkerElement.className = 'heart-marker-icon';
        heartMarkerElement.innerHTML = '❤️';
        heartMarkerElement.style.fontSize = '30px';
        heartMarkerElement.style.cursor = 'pointer';
        
        const heartMarker = new mapboxgl.Marker(heartMarkerElement)
            .setLngLat(aegeanSea)
            .addTo(map);
        
        // Initially hide heart marker
        heartMarkerElement.style.opacity = '0';
        
        // Setup heart marker click event
        const heartMarkerTooltip = document.getElementById('heart-marker');
        if (heartMarkerTooltip) {
            map.on('click', function(e) {
                // Calculate distance to heart marker
                const clickPoint = [e.lngLat.lng, e.lngLat.lat];
                const distance = calculateDistance(clickPoint, aegeanSea);
                
                // If click is close to the heart marker or directly on it
                if (distance < 2) {
                    heartMarkerElement.style.opacity = '1';
                    heartMarkerTooltip.classList.remove('hidden');
                    
                    // Add pulse animation
                    heartMarkerElement.style.animation = 'pulse 1.5s infinite';
                    
                    // Fly to the heart marker
                    map.flyTo({
                        center: aegeanSea,
                        zoom: 5.5,
                        essential: true
                    });
                    
                    // Play heart sound
                    const audio = new Audio('assets/audio/heartbeat.mp3');
                    audio.volume = 0.3;
                    audio.play().catch(e => console.log('Audio play failed:', e));
                    
                    // Vibrate the device if supported (mobile)
                    if (navigator.vibrate) {
                        navigator.vibrate([50, 100, 50, 100, 50]);
                    }
                }
            });
        }
        
        // Calculate and display distance
        const distance = calculateGeoDistance(bayreuth, ankara);
        document.querySelector('.map-badge p').textContent = 
            `${Math.round(distance)} km — no distance on your birthday can stop me loving you ❤️`;
    });
}

// Add a custom marker to the map
function addMarker(map, coordinates, title, iconPath) {
    // Create marker element
    const markerElement = document.createElement('div');
    markerElement.className = 'custom-marker';
    
    // Add icon or emoji
    if (iconPath) {
        const icon = document.createElement('img');
        icon.src = iconPath;
        icon.alt = title;
        icon.style.width = '40px';
        icon.style.height = '40px';
        markerElement.appendChild(icon);
    } else {
        markerElement.textContent = '🎈';
        markerElement.style.fontSize = '30px';
    }
    
    // Add marker to map
    new mapboxgl.Marker(markerElement)
        .setLngLat(coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(title))
        .addTo(map);
}

// Calculate distance between two points (for click detection)
function calculateDistance(point1, point2) {
    const dx = point1[0] - point2[0];
    const dy = point1[1] - point2[1];
    return Math.sqrt(dx * dx + dy * dy);
}

// Calculate geographic distance between two points in kilometers
function calculateGeoDistance(point1, point2) {
    // Convert degrees to radians
    const lat1 = point1[1] * Math.PI / 180;
    const lon1 = point1[0] * Math.PI / 180;
    const lat2 = point2[1] * Math.PI / 180;
    const lon2 = point2[0] * Math.PI / 180;
    
    // Haversine formula
    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;
    const a = Math.sin(dlat/2)**2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon/2)**2;
    const c = 2 * Math.asin(Math.sqrt(a));
    
    // Radius of earth in kilometers
    const r = 6371;
    
    // Calculate distance
    return c * r;
} 