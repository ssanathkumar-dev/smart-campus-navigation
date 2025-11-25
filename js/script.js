document.addEventListener('DOMContentLoaded', function() {
    
    // --- Map Initialization and Setup ---
    const crs = L.CRS.Simple;

    const map = L.map('map', {
        crs: crs,
        minZoom: -2,    // Allows zooming out further
        maxZoom: 3,     // Allows zooming in closer
        zoomDelta: 0.25 // Smooths out the zoom steps
    });

    // Verified map dimensions
    const mapWidth = 4493; 
    const mapHeight = 3178;

    const bounds = [[0, 0], [mapHeight, mapWidth]];

    const imageUrl = 'assets/campus_layout.png';
    L.imageOverlay(imageUrl, bounds).addTo(map);

    // --- Helper Function: Calculate Distance ---
    // Used by the A* heuristic and for data collection
    function calculateDistance(coordA, coordB) {
        const dx = coordB[1] - coordA[1]; // X-difference
        const dy = coordB[0] - coordA[0]; // Y-difference
        const distance = Math.sqrt(dx * dx + dy * dy);
        return Math.round(distance);
    }

    // --- Helper Function: Add POI Markers ---
    function addPoiMarker(coords, name) {
        L.marker(coords).addTo(map)
            .bindPopup(`<b>${name}</b>`)
            .on('click', function(e) {
                console.log(`Clicked on ${name} at: ${e.latlng.lat}, ${e.latlng.lng}`);
            });
    }
    
    // --- Data Loading, Centering, and Marker Display ---
    if (typeof campusData !== 'undefined' && campusData.length > 0) {
        // Set view to fit the entire image bounds first
        map.fitBounds(bounds); 

        // Then, display all markers
        campusData.forEach(building => {
            addPoiMarker(building.coordinates, building.name);
        });
    } else {
        // Fallback: If map_data.js is empty
        map.fitBounds(bounds);
        console.warn("map_data.js is empty or not loaded. Centering map to full image bounds.");
    }

    /*
    ==================================================================
    == A* PATHFINDING ALGORITHM
    ==================================================================
    */

    // [HELPER FUNCTION 1: The A* Algorithm]
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
        return null; // No path found
    }

    // [HELPER FUNCTION 2: A* Heuristic]
    // Estimates the cost from one node to the end node
    function heuristic(nodeAId, nodeBId) {
        if (!campusGraph[nodeAId] || !campusGraph[nodeBId]) {
            return Infinity;
        }
        const coordA = campusGraph[nodeAId].coords;
        const coordB = campusGraph[nodeBId].coords;
        return calculateDistance(coordA, coordB);
    }

    // [HELPER FUNCTION 3: Path Reconstruction]
    function reconstructPath(cameFrom, current) {
        let totalPath = [current];
        while (current in cameFrom) {
            current = cameFrom[current];
            totalPath.unshift(current);
        }
        return totalPath; 
    }

    // [HELPER FUNCTION 4: Find Node ID from Name]
    // Finds the graph node ID (e.g., "canteen-entrance") from a POI name (e.g., "canteen")
    function findNodeIdByName(locationName) {
        if (!locationName) return null;

        const poi = campusData.find(item => 
            item.name.toLowerCase() === locationName.toLowerCase()
        );

        if (!poi) return null; 

        // Handle all 22 special cases from your data
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

        // Fallback just in case
        const nodeId = poi.name.toLowerCase().replace(/ /g, '-') + "-entrance";
        if (campusGraph[nodeId]) {
            return nodeId;
        }

        console.error(`Could not find matching graph node for: ${locationName}`);
        return null;
    }

    // --- Search and Route Finding Logic ---

    let currentRoutePolyline = null; // Stores the route line so we can clear it
    const findRouteBtn = document.getElementById('getDirectionsButton'); 

    findRouteBtn.addEventListener('click', function() {
        const startName = document.getElementById('start-location').value;
        const destName = document.getElementById('destination').value;
        const instructionsDiv = document.getElementById('route-instructions');

        // Clear any old route from the map
        if (currentRoutePolyline) {
            map.removeLayer(currentRoutePolyline);
        }

        if (!startName || !destName) {
            instructionsDiv.innerHTML = "<h2>Error</h2><p>Please enter both a start location and a destination.</p>";
            return;
        }

        // 1. Find the Node IDs from the names
        const startNodeId = findNodeIdByName(startName);
        const endNodeId = findNodeIdByName(destName);

        if (!startNodeId) {
            instructionsDiv.innerHTML = `<h2>Error</h2><p>Start location '${startName}' not found.</p>`;
            return;
        }
        
        if (!endNodeId) {
            instructionsDiv.innerHTML = `<h2>Error</h2><p>Destination '${destName}' not found.</p>`;
            return;
        }

        // 2. RUN THE A* ALGORITHM!
        const pathNodeIds = findShortestPath(startNodeId, endNodeId);

        if (!pathNodeIds) {
            instructionsDiv.innerHTML = "<h2>Error</h2><p>No valid path could be found.</p>";
            return;
        }

        // 3. Convert Node IDs back to Coordinates
        const pathCoords = pathNodeIds.map(nodeId => {
            return campusGraph[nodeId].coords; 
        });

        // 4. DRAW THE ROUTE ON THE MAP
        currentRoutePolyline = L.polyline(pathCoords, { 
            color: '#ff0000', // Red
            weight: 5,
            opacity: 0.8
        }).addTo(map);

        // Zoom the map to fit the new route
        map.fitBounds(currentRoutePolyline.getBounds());

        // 5. Display success message
        instructionsDiv.innerHTML = `<h2>Success!</h2><p>Route found from ${startName} to ${destName}.</p>`;
    });

    // ==========================================
    // DEBUG: VISUALIZE THE GRAPH CONNECTIONS
    // ==========================================
    // This draws blue lines between all connected nodes so you can see gaps.
    
    const debugLayer = L.layerGroup().addTo(map);

    // Loop through every node in the graph
    Object.keys(campusGraph).forEach(nodeId => {
        const node = campusGraph[nodeId];
        
        // Draw a small circle for the node
        L.circleMarker(node.coords, { radius: 5, color: 'blue' })
            .bindPopup(nodeId) // Click a dot to see its ID!
            .addTo(debugLayer);

        // Draw lines to neighbors
        Object.keys(node.neighbors).forEach(neighborId => {
            if (campusGraph[neighborId]) {
                const neighbor = campusGraph[neighborId];
                L.polyline([node.coords, neighbor.coords], { color: 'blue', weight: 1, opacity: 0.5 })
                    .addTo(debugLayer);
            }
        });
    });


    // --- Coordinate Helper (for data collection) ---
    map.on('click', function(e) {
        const y = Math.round(e.latlng.lat);
        const x = Math.round(e.latlng.lng);
        console.log(`Map Click Coordinates (y, x): ${y}, ${x}`);
    });

}); // End of DOMContentLoaded

