document.addEventListener('DOMContentLoaded', function() {
    const crs = L.CRS.Simple;

    const map = L.map('map', {
        crs: crs,
        minZoom: -2,
        maxZoom: 3,
        zoomDelta: 0.25
    });

    const mapWidth = 4493; 
    const mapHeight = 3178;

    const bounds = [[0, 0], [mapHeight, mapWidth]];

    const imageUrl = 'assets/campus_layout.png';
    L.imageOverlay(imageUrl, bounds).addTo(map);

    // Removed the old 'Geometric Center of Layout' testing marker.

    // Function to add a single marker to the map
    function addPoiMarker(coords, name) {
        L.marker(coords).addTo(map)
            .bindPopup(`<b>${name}</b>`)
            .on('click', function(e) {
                console.log(`Clicked on ${name} at: ${e.latlng.lat}, ${e.latlng.lng}`);
            });
    }
    // --- Data Loading, Centering, and Marker Display Logic ---
    if (typeof campusData !== 'undefined' && campusData.length > 0) {
        // We will still display all the POI markers, but ensure the full map is visible first.
        
        // Set view to fit the entire image bounds (ensures full map view)
        map.fitBounds(bounds); 

        // Then, display all markers
        campusData.forEach(building => {
            addPoiMarker(building.coordinates, building.name);
        });
    } else {
        // If no data, fall back to fitting the full image bounds
        map.fitBounds(bounds);
        console.warn("map_data.js is empty or not loaded. Centering map to full image bounds.");
    }    
    

    // Using the correct HTML ID: 'getDirectionsButton'
    const findRouteBtn = document.getElementById('getDirectionsButton'); 

    findRouteBtn.addEventListener('click', function() {
        const start = document.getElementById('start-location').value;
        const dest = document.getElementById('destination').value;
        const instructionsDiv = document.getElementById('route-instructions');

        if (!start || !dest) {
            instructionsDiv.innerHTML = "<h2>Error</h2><p>Please enter both a start location and a destination.</p>";
            return;
        }

        // This is where you will integrate your A* Pathfinding and data lookup later
        instructionsDiv.innerHTML = `<h2>Route from ${start} to ${dest}</h2><p>Pathfinding logic is running...</p>`;
    });

    map.on('click', function(e) {
        const y = Math.round(e.latlng.lat);
        const x = Math.round(e.latlng.lng);
        console.log(`Map Click Coordinates (y, x): ${y}, ${x}`);
    });
});