// ==========================================
// 1. CAMPUS DATA (Destinations)
// ==========================================
const campusData = [
    { name: "Girls Hostel", coordinates: [2286, 2938] },
    { name: "GYM", coordinates: [2536, 2712] },
    { name: "MITM School Area", coordinates: [2202, 2700] },
    { name: "MITM School Play Area", coordinates: [2166, 2622] },
    { name: "Ayurveda Building", coordinates: [2010, 2246] },
    { name: "BCA BBA Block", coordinates: [1498, 2432] },
    { name: "Auditorium", coordinates: [1603, 2097] },
    { name: "MBA, MCA Block", coordinates: [1910, 1956] },
    { name: "Boys Hostel Block", coordinates: [1554, 1858] }, 
    { name: "Parking Lot A", coordinates: [2118, 1754] },
    { name: "Basketball Ground", coordinates: [2423, 1620] },
    { name: "College Library", coordinates: [1942, 1401] },
    { name: "Maths Department", coordinates: [1832, 1138] },
    { name: "Main Building", coordinates: [1616, 872] },
    { name: "MITM Juice Stall", coordinates: [1690, 1534] },
    { name: "MITM Store", coordinates: [1694, 1579] },
    { name: "MITM Bakery", coordinates: [1693, 1622] },
    { name: "MITM Chats", coordinates: [1695, 1654] },
    { name: "MITM Ice Cream", coordinates: [1696, 1679] },
    { name: "Main Auditorium", coordinates: [1643, 1683] },
    { name: "MITM Rolls", coordinates: [1584, 1643] },
    { name: "MITM Fruits", coordinates: [1575, 1616] },
    { name: "MITM Corns", coordinates: [1565, 1574] },
    { name: "canteen", coordinates: [1483, 1519] }
];

// ==========================================
// 2. CAMPUS GRAPH (The Road Network)
// ==========================================
const campusGraph = {

    // --- MAIN ROAD SPINE (The Backbone) ---

    "road-node-01": {
        coords: [2400, 2898],
        neighbors: {
            "hostel-g-entrance": 130, 
            "node-school-path": 260 
        }
    },
    
    // School Path Node (Intermediate)
    "node-school-path": {
        coords: [2308, 2655], 
        neighbors: {
            "road-node-01": 260,        
            "road-node-stadium": 101,   
            "school-area-entrance": 115 
        }
    },

    "road-node-stadium": {
        coords: [2273, 2560], 
        neighbors: {
            "node-school-path": 101, 
            "road-node-02": 88,  
            "node-stadium-path": 191,
            "school-play-entrance": 124 
        }
    },

    "road-node-02": {
        coords: [2244, 2477],
        neighbors: {
            "road-node-stadium": 88,  
            "road-node-03": 296,      
            "node-bca-hub": 484 
        }
    },

    "road-node-03": {
        coords: [2150, 2196],
        neighbors: {
            "road-node-02": 296,      
            "road-node-04": 285,      
            "ayurveda-entrance": 150  
        }
    },

    "road-node-04": {
        coords: [2050, 1929],
        neighbors: {
            "road-node-03": 285,      
            "road-node-05": 118,      
            "mba-mca-entrance": 142,
            "node-basketball-turn": 221
        }
    },

    "road-node-05": {
        coords: [2014, 1817],
        neighbors: {
            "road-node-04": 118,      
            "road-node-05-turn": 364, // Forward to Turn
            "parking-a-entrance": 121,
            "node-hostel-path-1": 144
        }
    },

    // The Intermediate Turn (Connecting 05 to 06)
    "road-node-05-turn": {
        coords: [1889, 1475], 
        neighbors: {
            "road-node-05": 364, // Back to Parking
            "road-node-06": 273, // Forward to Food Court
            "library-entrance": 91,
            "node-maths-path-1": 237
        }
    },

    "road-node-06": {
        coords: [1619, 1518], 
        neighbors: {
            "road-node-05-turn": 273, // Back to Turn
            "road-node-07": 78,       // Forward to Canteen
            "juice-stall": 73, "mitm-store": 97, "mitm-bakery": 120, 
            "mitm-chats": 149, "mitm-icecream": 175, "auditorium-main": 167, 
            "mitm-rolls": 130, "mitm-fruits": 100, "mitm-corns": 80
        }
    },

    "road-node-07": {
        coords: [1541, 1522], 
        neighbors: {
            "road-node-06": 78, 
            "canteen-entrance": 58
        }
    },

    // --- SIDE PATHS & SPECIAL WALKWAYS ---

    // 1. Gym Path
    "node-stadium-path": {
        coords: [2463, 2542], 
        neighbors: {
            "gym-entrance": 185,      
            "road-node-stadium": 191  
        }
    },

    // 2. BCA/Auditorium Hub
    "node-bca-hub": {
        coords: [1794, 2656], 
        neighbors: {
            "road-node-02": 484,      
            "road-node-bca": 216,     
            "road-node-auditorium": 485 
        }
    },
    "road-node-bca": {
        coords: [1713, 2456], 
        neighbors: { "node-bca-hub": 216, "bca-bba-entrance": 216 }
    },
    "road-node-auditorium": {
        coords: [1646, 2194], 
        neighbors: { "node-bca-hub": 485, "auditorium-entrance": 106 }
    },

    // 3. Basketball Path
    "node-basketball-turn": {
        coords: [2253, 1841], 
        neighbors: { "road-node-04": 221, "node-basketball-path": 122 }
    },
    "node-basketball-path": {
        coords: [2362, 1787], 
        neighbors: { "node-basketball-turn": 122, "basketball-entrance": 178 }
    },

    // 4. Boys Hostel Path
    "node-hostel-path-1": {
        coords: [1935, 1612],
        neighbors: { "road-node-05": 144, "node-hostel-path-2": 161 }
    },
    "node-hostel-path-2": {
        coords: [1782, 1662],
        neighbors: { "node-hostel-path-1": 161, "node-hostel-path-3": 125 }
    },
    "node-hostel-path-3": {
        coords: [1759, 1785],
        neighbors: { "node-hostel-path-2": 125, "node-hostel-path-4": 175 }
    },
    "node-hostel-path-4": {
        coords: [1584, 1785],
        neighbors: { "node-hostel-path-3": 175, "hostel-b-entrance": 79 }
    },

    // 5. Maths Path
    "node-maths-path-1": {
        coords: [1768, 1271],
        neighbors: { "road-node-05-turn": 237, "node-maths-path-2": 82 }
    },
    "node-maths-path-2": {
        coords: [1748, 1192],
        neighbors: { "node-maths-path-1": 82, "node-maths-path-3": 93, "node-main-building-turn": 275 }
    },
    "node-maths-path-3": {
        coords: [1790, 1109],
        neighbors: { "node-maths-path-2": 93, "maths-dept-entrance": 51 }
    },

    // 6. Main Building Path
    "node-main-building-turn": {
        coords: [1487, 1104], 
        neighbors: { "node-maths-path-2": 275, "main-building-entrance": 265 }
    },

    // --- POI ENTRANCE NODES ---
    
    "hostel-g-entrance": { coords: [2286, 2938], neighbors: { "road-node-01": 130 } },
    "gym-entrance": { coords: [2536, 2712], neighbors: { "node-stadium-path": 185 } },
    "school-area-entrance": { coords: [2202, 2700], neighbors: { "node-school-path": 115 } },
    "school-play-entrance": { coords: [2166, 2622], neighbors: { "road-node-stadium": 124 } },
    "ayurveda-entrance": { coords: [2010, 2246], neighbors: { "road-node-03": 150 } },
    "mba-mca-entrance": { coords: [1910, 1956], neighbors: { "road-node-04": 142 } },
    
    "bca-bba-entrance": { coords: [1498, 2432], neighbors: { "road-node-bca": 216 } },
    "auditorium-entrance": { coords: [1603, 2097], neighbors: { "road-node-auditorium": 106 } },

    "hostel-b-entrance": { coords: [1554, 1858], neighbors: { "node-hostel-path-4": 79 } },
    "parking-a-entrance": { coords: [2118, 1754], neighbors: { "road-node-05": 121 } },
    "basketball-entrance": { coords: [2423, 1620], neighbors: { "node-basketball-path": 178 } },
    
    "library-entrance": { coords: [1942, 1401], neighbors: { "road-node-05-turn": 91 } },
    "maths-dept-entrance": { coords: [1832, 1138], neighbors: { "node-maths-path-3": 51 } },
    "main-building-entrance": { coords: [1616, 872], neighbors: { "node-main-building-turn": 265 } },

    "canteen-entrance": { coords: [1483, 1519], neighbors: { "road-node-07": 58 } },
    
    // Food Court Stalls (Approximated)
    "juice-stall": { coords: [1690, 1534], neighbors: { "road-node-06": 73 } },
    "mitm-store": { coords: [1694, 1579], neighbors: { "road-node-06": 97 } },
    "mitm-bakery": { coords: [1693, 1622], neighbors: { "road-node-06": 120 } },
    "mitm-chats": { coords: [1695, 1654], neighbors: { "road-node-06": 149 } },
    "mitm-icecream": { coords: [1696, 1679], neighbors: { "road-node-06": 175 } },
    "auditorium-main": { coords: [1643, 1683], neighbors: { "road-node-06": 167 } },
    "mitm-rolls": { coords: [1584, 1643], neighbors: { "road-node-06": 130 } },
    "mitm-fruits": { coords: [1575, 1616], neighbors: { "road-node-06": 100 } },
    "mitm-corns": { coords: [1565, 1574], neighbors: { "road-node-06": 80 } }
};