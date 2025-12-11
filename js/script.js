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
    let indoorLayerGroup = L.layerGroup().addTo(map); // For indoor rooms & paths

    // ==========================================
    // 2. HELPER FUNCTIONS (Outdoor)
    // ==========================================

    function calculateDistance(coordA, coordB) {
        const dx = coordB[1] - coordA[1]; 
        const dy = coordB[0] - coordA[0]; 
        const distance = Math.sqrt(dx * dx + dy * dy);
        return Math.round(distance);
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
    // 3. OUTDOOR A* PATHFINDING
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
                        if (!openSet.has(neighborId)) openSet.add(neighborId);
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
            "mitm school play area": "school-play-entrance",
            "ayurveda building": "ayurveda-entrance",
            "bca bba block": "bca-bba-entrance",
            "auditorium": "auditorium-entrance",
            "mba, mca block": "mba-mca-entrance",
            "boys hostel block": "hostel-b-entrance",
            "parking lot a": "parking-a-entrance",
            "basketball ground": "basketball-entrance",
            "college library": "library-entrance",
            "maths department": "maths-dept-entrance",
            "main building": "main-building-entrance",
            "canteen": "canteen-entrance"
        };
        
        if (mappings[poi.name.toLowerCase()]) return mappings[poi.name.toLowerCase()];
        
        const nodeId = poi.name.toLowerCase().replace(/ /g, '-') + "-entrance";
        if (campusGraph[nodeId]) return nodeId;
        return null;
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

    function drawRoute(startName, endName) {
        routeLayerGroup.clearLayers();
        if (map.hasLayer(poiLayerGroup)) map.removeLayer(poiLayerGroup);

        const startId = findNodeIdByName(startName);
        const endId = findNodeIdByName(endName);

        if (!startId || !endId) { alert("Location not found."); return; }

        const pathIds = findShortestPath(startId, endId);
        if (!pathIds) { alert("No path found."); return; }

        const coords = pathIds.map(id => campusGraph[id].coords);

        const roadBase = L.polyline(coords, { color: '#2563eb', weight: 10, opacity: 0.6, lineCap: 'round', lineJoin: 'round' }).addTo(routeLayerGroup);
        L.polyline(coords, { color: '#ffffff', weight: 4, opacity: 0.9, dashArray: '10, 15', lineCap: 'round', lineJoin: 'round', className: 'walking-path' }).addTo(routeLayerGroup);

        const startCoord = campusGraph[startId].coords;
        const endCoord = campusGraph[endId].coords;
        L.circleMarker(startCoord, { radius: 8, color: 'white', fillColor: '#10b981', fillOpacity: 1, weight: 3 }).addTo(routeLayerGroup).bindPopup("Start: " + startName);
        L.circleMarker(endCoord, { radius: 8, color: 'white', fillColor: '#ef4444', fillOpacity: 1, weight: 3 }).addTo(routeLayerGroup).bindPopup("End: " + endName).openPopup();

        map.fitBounds(roadBase.getBounds(), { padding: [50, 50] });
        speakDirections(`Route calculated from ${startName} to ${endName}.`);
    }

    // ==========================================
    // 5. INDOOR NAVIGATION LOGIC
    // ==========================================

    window.enterBuilding = function(buildingName, floorName) {
        console.log(`Request to enter: ${buildingName} - ${floorName}`);

        const target = campusData.find(b => b.name === buildingName);
        if (!target || !target.indoorMap) { alert("No indoor map data found."); return; }

        const selectedFloor = floorName || "Ground Floor";
        window.currentFloorName = selectedFloor; 

        const floorData = target.indoorMap[selectedFloor];
        if (!floorData) { alert(`Map for ${selectedFloor} missing.`); return; }

        // Clear Outdoor Layers
        poiLayerGroup.clearLayers();
        routeLayerGroup.clearLayers();
        if(map.hasLayer(currentImageLayer)) map.removeLayer(currentImageLayer);

        // Load INDOOR Map
        if (window.currentIndoorLayer) map.removeLayer(window.currentIndoorLayer);
        window.currentIndoorLayer = L.imageOverlay(floorData.image, floorData.bounds).addTo(map);
        map.fitBounds(floorData.bounds);

        // NO DEFAULT MARKERS LOADED (Map starts clean)
        indoorLayerGroup.clearLayers();
        
        addExitButton();
    };

    function addExitButton() {
        if(document.getElementById('exit-btn')) return;
        const backBtn = document.createElement('button');
        backBtn.id = 'exit-btn';
        backBtn.innerText = "← Exit to Dashboard";
        backBtn.style.cssText = "position:absolute; top:20px; left:20px; z-index:9999; padding:12px 20px; background:white; border:2px solid #2563eb; border-radius:30px; cursor:pointer; font-weight:bold; box-shadow:0 4px 10px rgba(0,0,0,0.2); transition: transform 0.2s;";
        backBtn.onclick = function() { window.location.href = "dashboard.html"; };
        document.body.appendChild(backBtn);
    }

    // --- DISPLAY ROUTE ONLY (No Clicks) ---
    
    let indoorStart = null;
    let indoorEnd = null;

    function checkIndoorRoute() {
        if (!indoorStart || !indoorEnd) return;

        // 1. Calculate Path
        const pathIds = findIndoorPath(indoorStart, indoorEnd);
        if (!pathIds) { alert("No path found inside building! Check connections."); return; }

        // 2. Clear Previous Route/Markers
        indoorLayerGroup.clearLayers();

        // 3. Draw Path Line
        const routeCoords = pathIds.map(id => indoorNodes[id].coords);
        L.polyline(routeCoords, {
            color: '#2563eb', weight: 6, opacity: 0.8, dashArray: '10, 10', className: 'walking-path' 
        }).addTo(indoorLayerGroup);
        
        // 4. Draw Start Dot (Green)
        const startNode = indoorNodes[indoorStart];
        L.circleMarker(startNode.coords, {
            radius: 12, color: '#059669', fillColor: '#10b981', fillOpacity: 1, weight: 3
        }).bindPopup(`<b>Start: ${startNode.name}</b>`).addTo(indoorLayerGroup).openPopup();

        // 5. Draw End Dot (Red)
        const endNode = indoorNodes[indoorEnd];
        L.circleMarker(endNode.coords, {
            radius: 12, color: '#b91c1c', fillColor: '#ef4444', fillOpacity: 1, weight: 3
        }).bindPopup(`<b>Destination: ${endNode.name}</b>`).addTo(indoorLayerGroup);

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

    // Helper to find ID by Name
    function findIndoorNodeIdByName(searchTerm) {
        if (!searchTerm || typeof indoorNodes === 'undefined') return null;
        const lowerTerm = searchTerm.toLowerCase().trim();
        return Object.keys(indoorNodes).find(key => {
            const nodeName = indoorNodes[key].name.toLowerCase();
            return nodeName.includes(lowerTerm);
        });
    }

    // ==========================================
    // 7. INITIALIZATION & EVENTS
    // ==========================================
    
    const urlParams = new URLSearchParams(window.location.search);
    
    // CASE A: Outdoor Routing
    const pStart = urlParams.get('start');
    const pEnd = urlParams.get('end');
    if (pStart && pEnd) {
        setTimeout(() => drawRoute(pStart, pEnd), 500);
    }

    // CASE B: Indoor Routing (Auto from Dashboard)
    const pBuilding = urlParams.get('building');
    const pIndoorStart = urlParams.get('indoorStart');
    const pIndoorEnd = urlParams.get('indoorEnd');

    if (pBuilding && pIndoorStart && pIndoorEnd) {
        setTimeout(() => {
            const startId = findIndoorNodeIdByName(pIndoorStart);
            const endId = findIndoorNodeIdByName(pIndoorEnd);

            if (startId && endId) {
                const targetFloor = indoorNodes[startId].floor;
                window.enterBuilding(pBuilding, targetFloor);
                
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
    // CASE C: Just Enter Building
    else if (pBuilding) {
        const pFloor = urlParams.get('floor');
        setTimeout(() => {
            window.enterBuilding(pBuilding, pFloor);
        }, 500);
    }

    const sidebar = document.querySelector('.sidebar-card');
    const toggleHandle = document.getElementById('mobile-toggle-handle');
    if (sidebar && toggleHandle) {
        toggleHandle.addEventListener('click', () => sidebar.classList.toggle('open'));
    }
});