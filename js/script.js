document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. MAP SETUP
    // ==========================================
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
    const imageUrl = 'assets/map.png';
    L.imageOverlay(imageUrl, bounds).addTo(map);

    // ==========================================
    // 2. HELPER FUNCTIONS
    // ==========================================

    // Calculate Distance (Euclidean)
    function calculateDistance(coordA, coordB) {
        const dx = coordB[1] - coordA[1]; 
        const dy = coordB[0] - coordA[0]; 
        const distance = Math.sqrt(dx * dx + dy * dy);
        return Math.round(distance);
    }

    // Add Markers to Map
    function addPoiMarker(coords, name) {
        L.marker(coords).addTo(map)
            .bindPopup(`<b>${name}</b>`);
    }
    
    // Load Data onto Map
    if (typeof campusData !== 'undefined' && campusData.length > 0) {
        map.fitBounds(bounds); 
        campusData.forEach(building => {
            addPoiMarker(building.coordinates, building.name);
        });
    } else {
        map.fitBounds(bounds);
        console.warn("map_data.js is empty or not loaded.");
    }

    // ==========================================
    // 3. A* PATHFINDING ALGORITHM
    // ==========================================

    function findShortestPath(startNodeId, endNodeId) {
        let openSet = new Set([startNodeId]);
        let cameFrom = {}; 
        let gScore = {}; 
        let fScore = {}; 

        Object.keys(campusGraph).forEach(nodeId => {
            gScore[nodeId] = Infinity;
            fScore[nodeId] = Infinity;
        });

        gScore[startNodeId] = 0;
        fScore[startNodeId] = heuristic(startNodeId, endNodeId);

        while (openSet.size > 0) {
            let current = null;
            let lowestFScore = Infinity;
            for (let nodeId of openSet) {
                if (fScore[nodeId] < lowestFScore) {
                    lowestFScore = fScore[nodeId];
                    current = nodeId;
                }
            }

            if (current === endNodeId) {
                return reconstructPath(cameFrom, current);
            }

            openSet.delete(current);

            let neighbors = campusGraph[current].neighbors;
            for (let neighborId in neighbors) {
                let distance = neighbors[neighborId];
                let tentativeGScore = gScore[current] + distance;

                if (tentativeGScore < gScore[neighborId]) {
                    cameFrom[neighborId] = current;
                    gScore[neighborId] = tentativeGScore;
                    fScore[neighborId] = gScore[neighborId] + heuristic(neighborId, endNodeId);
                    
                    if (!openSet.has(neighborId)) {
                        openSet.add(neighborId);
                    }
                }
            }
        }
        return null; 
    }

    function heuristic(nodeAId, nodeBId) {
        if (!campusGraph[nodeAId] || !campusGraph[nodeBId]) return Infinity;
        const coordA = campusGraph[nodeAId].coords;
        const coordB = campusGraph[nodeBId].coords;
        return calculateDistance(coordA, coordB);
    }

    function reconstructPath(cameFrom, current) {
        let totalPath = [current];
        while (current in cameFrom) {
            current = cameFrom[current];
            totalPath.unshift(current);
        }
        return totalPath; 
    }

    // [HELPER FUNCTION 4: Find Node ID from Name (SMART SEARCH)]
    // Allows partial names like "can" -> "canteen" or "mba" -> "MBA Block"
    function findNodeIdByName(locationName) {
        if (!locationName) return null;
        
        const lowerInput = locationName.toLowerCase();

        // 1. Try to find a match in campusData
        // We use 'includes' instead of '===' to allow partial matches
        const poi = campusData.find(item => 
            item.name.toLowerCase().includes(lowerInput)
        );

        if (!poi) return null; 

        // 2. Map the found POI Name to the Graph ID
        // (We use the full name from the found POI to ensure accuracy)
        if (poi.name === "Girls Hostel") return "hostel-g-entrance";
        if (poi.name === "GYM") return "gym-entrance";
        if (poi.name === "MITM School Area") return "school-area-entrance";
        if (poi.name === "MITM School Play Area") return "school-play-entrance";
        if (poi.name === "Ayurveda Building") return "ayurveda-entrance";
        if (poi.name === "BCA BBA Block") return "bca-bba-entrance";
        if (poi.name === "Auditorium") return "auditorium-entrance";
        if (poi.name === "MBA, MCA Block") return "mba-mca-entrance";
        if (poi.name === "Boys Hostel Block") return "hostel-b-entrance";
        if (poi.name === "Parking Lot A") return "parking-a-entrance";
        if (poi.name === "Basketball Ground") return "basketball-entrance";
        if (poi.name === "College Library") return "library-entrance";
        if (poi.name === "MITM Juice Stall") return "juice-stall";
        if (poi.name === "MITM Store") return "mitm-store";
        if (poi.name === "MITM Bakery") return "mitm-bakery";
        if (poi.name === "MITM Chats") return "mitm-chats";
        if (poi.name === "MITM Ice Cream") return "mitm-icecream";
        if (poi.name === "Main Auditorium") return "auditorium-main";
        if (poi.name === "MITM Rolls") return "mitm-rolls";
        if (poi.name === "MITM Fruits") return "mitm-fruits";
        if (poi.name === "MITM Corns") return "mitm-corns";
        if (poi.name === "canteen") return "canteen-entrance";
        if (poi.name === "Maths Department") return "maths-dept-entrance";
        if (poi.name === "Main Building") return "main-building-entrance";

        // Fallback generator
        const nodeId = poi.name.toLowerCase().replace(/ /g, '-') + "-entrance";
        if (campusGraph[nodeId]) return nodeId;
        
        return null;
    }

    // ==========================================
    // 4. ROUTE UI LOGIC
    // ==========================================

    let currentRoutePolyline = null; 
    const findRouteBtn = document.getElementById('getDirectionsButton'); 

    findRouteBtn.addEventListener('click', function() {
        const startName = document.getElementById('start-location').value;
        const destName = document.getElementById('destination').value;
        const instructionsDiv = document.getElementById('route-instructions');

        if (currentRoutePolyline) {
            map.removeLayer(currentRoutePolyline);
        }

        if (!startName || !destName) {
            instructionsDiv.innerHTML = "<h2>Error</h2><p>Please enter both a start location and a destination.</p>";
            return;
        }

        const startNodeId = findNodeIdByName(startName);
        const endNodeId = findNodeIdByName(destName);

        if (!startNodeId || !endNodeId) {
            instructionsDiv.innerHTML = `<h2>Error</h2><p>One of the locations was not found.</p>`;
            return;
        }

        const pathNodeIds = findShortestPath(startNodeId, endNodeId);

        if (!pathNodeIds) {
            instructionsDiv.innerHTML = "<h2>Error</h2><p>No valid path could be found.</p>";
            return;
        }

        const pathCoords = pathNodeIds.map(nodeId => campusGraph[nodeId].coords);

        currentRoutePolyline = L.polyline(pathCoords, { 
            color: '#ff0000', 
            weight: 5, 
            opacity: 0.8 
        }).addTo(map);

        map.fitBounds(currentRoutePolyline.getBounds());
        instructionsDiv.innerHTML = `<h2>Success!</h2><p>Route found from ${startName} to ${destName}.</p>`;
    });

    // ==========================================
    // 5. SEARCH & CLEAR CONTROLS
    // ==========================================

    const clearBtn = document.getElementById('clearRouteButton');
    
    clearBtn.addEventListener('click', function() {
        if (currentRoutePolyline) {
            map.removeLayer(currentRoutePolyline);
            currentRoutePolyline = null;
        }
        document.getElementById('start-location').value = '';
        document.getElementById('destination').value = '';
        document.getElementById('route-instructions').innerHTML = '';
        map.fitBounds(bounds);
    });

    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchButton');

    function performSearch() {
        const query = searchInput.value;
        if (!query) return;

        const target = campusData.find(poi => 
            poi.name.toLowerCase().includes(query.toLowerCase())
        );

        if (target) {
            map.setView(target.coordinates, 2); 
            map.eachLayer(layer => {
                if (layer instanceof L.Marker && layer.getPopup()) {
                    if (layer.getPopup().getContent().includes(target.name)) {
                        layer.openPopup();
                    }
                }
            });
            document.getElementById('location-name').innerText = target.name;
            document.getElementById('location-description').innerText = target.description || "No description available.";
        } else {
            alert("Location not found!");
        }
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') performSearch();
    });

    // --- Dev Helper: Click to get coordinates (Optional: Keep for future updates) ---
    map.on('click', function(e) {
        const y = Math.round(e.latlng.lat);
        const x = Math.round(e.latlng.lng);
        console.log(`Map Click Coordinates (y, x): ${y}, ${x}`);
    });

});