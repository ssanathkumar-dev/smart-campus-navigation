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
    // NOTE: We keep a reference to this layer so we can remove it when entering a building
    let currentImageLayer = L.imageOverlay('assets/map.png', bounds).addTo(map);

    // Initialize Layer Groups
    let routeLayerGroup = L.layerGroup().addTo(map);
    let poiLayerGroup = L.layerGroup().addTo(map);

    // ==========================================
    // 2. HELPER FUNCTIONS
    // ==========================================

    function calculateDistance(coordA, coordB) {
        const dx = coordB[1] - coordA[1]; 
        const dy = coordB[0] - coordA[0]; 
        const distance = Math.sqrt(dx * dx + dy * dy);
        return Math.round(distance);
    }

    // UPDATED: Now accepts the whole building object to check for indoor maps
    function addPoiMarker(building) {
        const marker = L.marker(building.coordinates).addTo(poiLayerGroup);
        
        let popupContent = `<b>${building.name}</b>`;
        
        // If this building has an indoor map defined in map_data.js
        if (building.indoorMap) {
            popupContent += `<br><br><button onclick="window.enterBuilding('${building.name}')" style="width:100%; padding:8px; background:#2563eb; color:white; border:none; border-radius:4px; cursor:pointer; font-weight:bold;">View Inside ⤵</button>`;
        }

        marker.bindPopup(popupContent);
    }
    
    // UPDATED: Loop passes the whole object
    if (typeof campusData !== 'undefined' && campusData.length > 0) {
        map.fitBounds(bounds); 
        campusData.forEach(building => {
            addPoiMarker(building); 
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

            if (campusGraph[current]) {
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

    function findNodeIdByName(locationName) {
        if (!locationName) return null;
        const lowerInput = locationName.toLowerCase();
        const poi = campusData.find(item => 
            item.name.toLowerCase().includes(lowerInput)
        );

        if (!poi) return null; 

        // Map POI Names to Graph IDs
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

        const nodeId = poi.name.toLowerCase().replace(/ /g, '-') + "-entrance";
        if (campusGraph[nodeId]) return nodeId;
        return null;
    }

    // ==========================================
    // 4. STATS, VOICE & ROUTING
    // ==========================================

    function getPathStats(pathNodeIds) {
        let totalPixels = 0;
        for (let i = 0; i < pathNodeIds.length - 1; i++) {
            let nodeA = campusGraph[pathNodeIds[i]];
            let nodeB = campusGraph[pathNodeIds[i+1]];
            totalPixels += calculateDistance(nodeA.coords, nodeB.coords);
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

    function drawRoute(startName, endName) {
        routeLayerGroup.clearLayers();
        
        // Hide POIs when routing to reduce clutter
        if (map.hasLayer(poiLayerGroup)) {
            map.removeLayer(poiLayerGroup);
        }

        const startId = findNodeIdByName(startName);
        const endId = findNodeIdByName(endName);

        if (!startId || !endId) { alert("Location not found."); return; }

        const pathIds = findShortestPath(startId, endId);
        if (!pathIds) { alert("No path found."); return; }

        const coords = pathIds.map(id => campusGraph[id].coords);

        const roadBase = L.polyline(coords, { color: '#2563eb', weight: 10, opacity: 0.6, lineCap: 'round', lineJoin: 'round' }).addTo(routeLayerGroup);
        L.polyline(coords, { color: '#ffffff', weight: 4, opacity: 0.9, dashArray: '10, 15', lineCap: 'round', lineJoin: 'round', className: 'walking-path' }).addTo(routeLayerGroup);

        // Add Start/End Markers
        const startCoord = campusGraph[startId].coords;
        const endCoord = campusGraph[endId].coords;
        L.circleMarker(startCoord, { radius: 8, color: 'white', fillColor: '#10b981', fillOpacity: 1, weight: 3 }).addTo(routeLayerGroup).bindPopup("Start: " + startName);
        L.circleMarker(endCoord, { radius: 8, color: 'white', fillColor: '#ef4444', fillOpacity: 1, weight: 3 }).addTo(routeLayerGroup).bindPopup("End: " + endName).openPopup();

        map.fitBounds(roadBase.getBounds(), { padding: [50, 50] });

        const stats = getPathStats(pathIds);
        const instructions = document.getElementById('route-instructions');
        if(instructions) {
            instructions.innerHTML = `
                <div style="background: white; padding: 15px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); text-align: center;">
                    <h3 style="margin:0 0 5px 0; color:#1e293b;">${startName} ➝ ${endName}</h3>
                    <p style="margin:0; font-size:1.1rem;"><strong>${stats.meters}m</strong> (~${stats.minutes} min)</p>
                </div>`;
        }

        speakDirections(`Route calculated from ${startName} to ${endName}. It is a ${stats.minutes} minute walk.`);
    }

    // ==========================================
    // 5. EVENT LISTENERS
    // ==========================================
    
    const urlParams = new URLSearchParams(window.location.search);
    const pStart = urlParams.get('start');
    const pEnd = urlParams.get('end');

    if (pStart && pEnd) {
        setTimeout(() => drawRoute(pStart, pEnd), 500);
    }

    const sidebar = document.querySelector('.sidebar-card');
    const toggleHandle = document.getElementById('mobile-toggle-handle');
    if (sidebar && toggleHandle) {
        toggleHandle.addEventListener('click', () => sidebar.classList.toggle('open'));
        document.getElementById('searchInput')?.addEventListener('focus', () => sidebar.classList.add('open'));
    }

    const findRouteBtn = document.getElementById('getDirectionsButton');
    if (findRouteBtn) {
        findRouteBtn.addEventListener('click', function() {
            const s = document.getElementById('start-location').value;
            const d = document.getElementById('destination').value;
            drawRoute(s, d);
        });
    }

    const clearBtn = document.getElementById('clearRouteButton');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            routeLayerGroup.clearLayers();
            if (!map.hasLayer(poiLayerGroup)) {
                map.addLayer(poiLayerGroup);
            }
            const inst = document.getElementById('route-instructions');
            if(inst) inst.innerHTML = '';
            map.fitBounds(bounds);
            window.speechSynthesis.cancel();
        });
    }

    // ==========================================
    // 6. INDOOR NAVIGATION LOGIC
    // ==========================================

    // We attach this to 'window' so the HTML popup button can call it
    window.enterBuilding = function(buildingName) {
        const target = campusData.find(b => b.name === buildingName);
        if (!target || !target.indoorMap) {
            alert("No indoor map available for this building yet.");
            return;
        }

        // 1. Clear everything
        poiLayerGroup.clearLayers();
        routeLayerGroup.clearLayers();
        if(document.getElementById('route-instructions')) document.getElementById('route-instructions').innerHTML = '';

        // 2. Remove Outdoor Map
        if (map.hasLayer(currentImageLayer)) {
            map.removeLayer(currentImageLayer);
        }

        // 3. Load Indoor Map
        const indoorBounds = target.indoorMap.bounds;
        const indoorImage = target.indoorMap.image;
        
        let indoorLayer = L.imageOverlay(indoorImage, indoorBounds).addTo(map);
        map.fitBounds(indoorBounds);

        // 4. Show "Exit" Button
        const backBtn = document.createElement('button');
        backBtn.innerText = "← Exit Building";
        backBtn.style.position = "absolute";
        backBtn.style.top = "20px";
        backBtn.style.left = "20px";
        backBtn.style.zIndex = "9999";
        backBtn.style.padding = "10px 20px";
        backBtn.style.background = "white";
        backBtn.style.border = "2px solid #2563eb";
        backBtn.style.borderRadius = "30px";
        backBtn.style.cursor = "pointer";
        backBtn.style.fontWeight = "bold";
        backBtn.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
        
        backBtn.onclick = function() {
            location.reload(); // Simplest way to return to main state
        };
        
        document.body.appendChild(backBtn);
        
        // (Optional) Add indoor markers here later...
    };

    // Dev Helper
    map.on('click', function(e) {
        const y = Math.round(e.latlng.lat);
        const x = Math.round(e.latlng.lng);
        console.log(`Map Click Coordinates (y, x): ${y}, ${x}`);
    });

});