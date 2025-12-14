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
    
    // Outdoor Map Image
    let currentImageLayer = L.imageOverlay('assets/map.png', bounds).addTo(map);

    // Initialize Layer Groups
    let routeLayerGroup = L.layerGroup().addTo(map);
    let poiLayerGroup = L.layerGroup().addTo(map);
    let indoorLayerGroup = L.layerGroup().addTo(map); 

    // ==========================================
    // 2. HELPER FUNCTIONS
    // ==========================================

    function calculateDistance(coordA, coordB) {
        const dx = coordB[1] - coordA[1]; 
        const dy = coordB[0] - coordA[0]; 
        const distance = Math.sqrt(dx * dx + dy * dy);
        return Math.round(distance);
    }

    function getPathStats(pathNodeIds, isIndoor = false) {
        let totalPixels = 0;
        const nodes = isIndoor ? indoorNodes : campusGraph; 

        for (let i = 0; i < pathNodeIds.length - 1; i++) {
            let idA = pathNodeIds[i];
            let idB = pathNodeIds[i+1];
            let coordsA = nodes[idA].coords;
            let coordsB = nodes[idB].coords;
            totalPixels += calculateDistance(coordsA, coordsB);
        }
        const meters = Math.round(totalPixels / 4); 
        const minutes = Math.ceil(meters / 80); 
        return { meters, minutes };
    }

    function speakDirections(text) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const msg = new SpeechSynthesisUtterance();
            msg.text = text;
            msg.rate = 0.9;
            window.speechSynthesis.speak(msg);
        }
    }

    function addPoiMarker(building) {
        const marker = L.marker(building.coordinates).addTo(poiLayerGroup);
        marker.bindPopup(`<b>${building.name}</b>`);
    }
    
    // LOAD OUTDOOR MARKERS
    if (typeof campusData !== 'undefined' && campusData.length > 0) {
        map.fitBounds(bounds); 
        campusData.forEach(building => {
            if (building.name === "Main Building") return; 
            addPoiMarker(building); 
        });
    }

    // ==========================================
    // 3. OUTDOOR ROUTING
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

            if (current === endNodeId) return reconstructPath(cameFrom, current);
            openSet.delete(current);

            if (campusGraph[current]) {
                let neighbors = campusGraph[current].neighbors;
                for (let neighborId in neighbors) {
                    let distance = neighbors[neighborId];
                    let tentativeGScore = gScore[current] + distance;
                    if (tentativeGScore < gScore[neighborId]) {
                        cameFrom[neighborId] = current;
                        gScore[neighborId] = tentativeGScore;
                        fScore[neighborId] = gScore[neighborId] + heuristic(neighborId, endNodeId);
                        openSet.add(neighborId);
                    }
                }
            }
        }
        return null; 
    }

    function heuristic(nodeAId, nodeBId) {
        if (!campusGraph[nodeAId] || !campusGraph[nodeBId]) return Infinity;
        return calculateDistance(campusGraph[nodeAId].coords, campusGraph[nodeBId].coords);
    }

    function reconstructPath(cameFrom, current) {
        let totalPath = [current];
        while (current in cameFrom) {
            current = cameFrom[current];
            totalPath.unshift(current);
        }
        return totalPath; 
    }

    function findNodeIdByName(locationName) {
        if (!locationName) return null;
        const lowerInput = locationName.toLowerCase();
        const poi = campusData.find(item => item.name.toLowerCase().includes(lowerInput));
        if (!poi) return null; 

        const mappings = {
            "girls hostel": "hostel-g-entrance",
            "gym": "gym-entrance",
            "mitm school area": "school-area-entrance",
            "main building": "main-building-entrance",
            "canteen": "canteen-entrance"
        };
        
        if (mappings[poi.name.toLowerCase()]) return mappings[poi.name.toLowerCase()];
        const nodeId = poi.name.toLowerCase().replace(/ /g, '-') + "-entrance";
        if (campusGraph[nodeId]) return nodeId;
        return null;
    }

    function drawRoute(startName, endName) {
        routeLayerGroup.clearLayers();
        if (map.hasLayer(poiLayerGroup)) map.removeLayer(poiLayerGroup);

        const startId = findNodeIdByName(startName);
        const endId = findNodeIdByName(endName);

        if (!startId || !endId) { alert("Location not found."); return; }

        const pathIds = findShortestPath(startId, endId);
        if (!pathIds) { alert("No path found."); return; }

        const coords = pathIds.map(id => campusGraph[id].coords);

        const roadBase = L.polyline(coords, { color: '#2563eb', weight: 8, opacity: 0.6 }).addTo(routeLayerGroup);
        L.polyline(coords, { color: '#ffffff', weight: 3, opacity: 0.9, dashArray: '10, 15', className: 'walking-path' }).addTo(routeLayerGroup);

        const startCoord = campusGraph[startId].coords;
        const endCoord = campusGraph[endId].coords;
        L.circleMarker(startCoord, { radius: 8, color: 'white', fillColor: '#10b981', fillOpacity: 1 }).addTo(routeLayerGroup).bindPopup("Start: " + startName);
        L.circleMarker(endCoord, { radius: 8, color: 'white', fillColor: '#ef4444', fillOpacity: 1 }).addTo(routeLayerGroup).bindPopup("End: " + endName).openPopup();

        map.fitBounds(roadBase.getBounds(), { padding: [50, 50] });
        const stats = getPathStats(pathIds, false); 
        speakDirections(`Route calculated. Distance is ${stats.meters} meters. About ${stats.minutes} minutes walking.`);
    }

    // ==========================================
    // 5. INDOOR NAVIGATION (PRODUCTION MODE)
    // ==========================================

    window.enterBuilding = function(buildingName, floorName) {
        console.log(`Step 1: Request received for ${buildingName} - ${floorName}`);

        const target = campusData.find(b => b.name === buildingName);
        if (!target || !target.indoorMap) { alert("No indoor map data found."); return; }

        const selectedFloor = floorName || "Ground Floor";
        window.currentFloorName = selectedFloor; 

        console.log(`Step 2: Selected Floor is "${selectedFloor}"`);
        
        const floorData = target.indoorMap[selectedFloor];
        
        if (!floorData) {
            console.error(`ERROR: No data found in map_data.js for key "${selectedFloor}"`);
            alert(`Error: Missing data for ${selectedFloor}`);
            return;
        }

        console.log(`Step 3: Loading Image -> ${floorData.image}`);

        // Clear old layers
        poiLayerGroup.clearLayers();
        routeLayerGroup.clearLayers();
        if(map.hasLayer(currentImageLayer)) map.removeLayer(currentImageLayer);
        if (window.currentIndoorLayer) map.removeLayer(window.currentIndoorLayer);

        // Load new image
        window.currentIndoorLayer = L.imageOverlay(floorData.image, floorData.bounds).addTo(map);
        map.fitBounds(floorData.bounds);

        addExitButton();
        
        // --- PRODUCTION MODE: DEV TOOLS DISABLED ---
        // loadIndoorMarkers(selectedFloor); 
        // window.showBlueLines(); 
    };

    function addExitButton() {
        if(document.getElementById('exit-btn')) return;
        const backBtn = document.createElement('button');
        backBtn.id = 'exit-btn';
        backBtn.innerText = "← Exit to Dashboard";
        backBtn.style.cssText = "position:absolute; top:20px; left:20px; z-index:9999; padding:12px 20px; background:white; border:2px solid #2563eb; border-radius:30px; cursor:pointer; font-weight:bold; box-shadow:0 4px 10px rgba(0,0,0,0.2);";
        backBtn.onclick = function() { window.location.href = "dashboard.html"; };
        document.body.appendChild(backBtn);
    }

    // --- INDOOR ROUTING ---
    let indoorStart = null;
    let indoorEnd = null;

    function checkIndoorRoute() {
        if (!indoorStart || !indoorEnd) return;

        const pathIds = findIndoorPath(indoorStart, indoorEnd);
        if (!pathIds) { alert("No path found inside building!"); return; }

        // 1. Draw Path
        const routeCoords = pathIds.map(id => indoorNodes[id].coords);
        L.polyline(routeCoords, {
            color: '#2563eb', weight: 6, opacity: 0.9, dashArray: '10, 10', className: 'walking-path' 
        }).addTo(indoorLayerGroup);
        
        // 2. Add START Marker (Green)
        const startNode = indoorNodes[indoorStart];
        L.circleMarker(startNode.coords, { 
            radius: 8, color: 'white', fillColor: '#10b981', fillOpacity: 1 
        }).addTo(indoorLayerGroup).bindPopup("Start: " + startNode.name);

        // 3. Add END Marker (Red)
        const endNode = indoorNodes[indoorEnd];
        L.circleMarker(endNode.coords, { 
            radius: 8, color: 'white', fillColor: '#ef4444', fillOpacity: 1 
        }).addTo(indoorLayerGroup).bindPopup("End: " + endNode.name).openPopup();

        speakDirections(`Navigating from ${startNode.name} to ${endNode.name}.`);
    }

    function findIndoorPath(startId, endId) {
        let openSet = new Set([startId]);
        let cameFrom = {}; 
        let gScore = {}; 
        let fScore = {}; 

        Object.keys(indoorGraph).forEach(id => { gScore[id] = Infinity; fScore[id] = Infinity; });

        gScore[startId] = 0;
        fScore[startId] = calculateDistance(indoorNodes[startId].coords, indoorNodes[endId].coords);

        while (openSet.size > 0) {
            let current = null;
            let lowest = Infinity;
            for (let id of openSet) {
                if (fScore[id] < lowest) { lowest = fScore[id]; current = id; }
            }

            if (current === endId) {
                let path = [current];
                while (current in cameFrom) { current = cameFrom[current]; path.unshift(current); }
                return path;
            }

            openSet.delete(current);

            if (indoorGraph[current]) {
                let neighbors = indoorGraph[current].neighbors;
                for (let neighborId in neighbors) {
                    let tentativeG = gScore[current] + neighbors[neighborId];
                    if (tentativeG < gScore[neighborId]) {
                        cameFrom[neighborId] = current;
                        gScore[neighborId] = tentativeG;
                        fScore[neighborId] = tentativeG + calculateDistance(indoorNodes[neighborId].coords, indoorNodes[endId].coords);
                        openSet.add(neighborId);
                    }
                }
            }
        }
        return null;
    }

    function findIndoorNodeIdByName(searchTerm) {
        if (!searchTerm || typeof indoorNodes === 'undefined') return null;
        const lowerTerm = searchTerm.toLowerCase().trim();
        return Object.keys(indoorNodes).find(key => {
            const nodeName = indoorNodes[key].name.toLowerCase();
            return nodeName.includes(lowerTerm);
        });
    }

    // --- CLICK TOOL (CONSOLE ONLY) ---
    map.on('click', function(e) {
        var coord = Math.round(e.latlng.lat) + ", " + Math.round(e.latlng.lng);
        console.log("Clicked Coordinates:", coord); 
    });

    // ==========================================
    // 7. INITIALIZATION & EVENTS (PRIORITY LOGIC)
    // ==========================================
    
    const urlParams = new URLSearchParams(window.location.search);
    
    const pStart = urlParams.get('start');
    const pEnd = urlParams.get('end');
    const pBuilding = urlParams.get('building');
    const pIndoorStart = urlParams.get('indoorStart');
    const pIndoorEnd = urlParams.get('indoorEnd');
    const forceFloor = urlParams.get('force_floor');

    // PRIORITY 1: Outdoor Routing
    if (pStart && pEnd) {
        setTimeout(() => drawRoute(pStart, pEnd), 500);
    }
    
    // PRIORITY 2: Dev Mode (Force Floor)
    else if (forceFloor) {
        console.log(`Dev Mode: Forcing ${forceFloor}`);
        setTimeout(() => {
            window.enterBuilding("Main Building", forceFloor);
        }, 500);
    }

    // PRIORITY 3: Indoor Routing (From Dashboard)
    else if (pBuilding && pIndoorStart && pIndoorEnd) {
        setTimeout(() => {
            // DEBUG CHECKS
            if (typeof indoorNodes === 'undefined') {
                alert("CRITICAL ERROR: indoor_data.js is not loaded!");
                return;
            }

            const startId = findIndoorNodeIdByName(pIndoorStart);
            const endId = findIndoorNodeIdByName(pIndoorEnd);

            if (startId && endId) {
                const targetFloor = indoorNodes[startId].floor;
                console.log(`Target Floor determined: ${targetFloor}`);
                
                // 1. Load the correct floor image
                window.enterBuilding(pBuilding, targetFloor);
                
                // 2. Draw the path
                setTimeout(() => {
                    indoorStart = startId;
                    indoorEnd = endId;
                    checkIndoorRoute();
                }, 400); 

            } else {
                alert(`Could not find "${pIndoorStart}" or "${pIndoorEnd}" inside.`);
                window.enterBuilding(pBuilding, "Ground Floor");
            }
        }, 500);
    } 

    // PRIORITY 4: Just Enter Building (General View)
    else if (pBuilding) {
        const pFloor = urlParams.get('floor'); // Might be null
        setTimeout(() => {
            window.enterBuilding(pBuilding, pFloor);
        }, 500);
    }
});