// INDOOR MAP DATA (Ground Floor - Final Master with Corrections)

// 1. NODES
const indoorNodes = {
    // --- ENTRANCES ---
    "ent-1-out": { coords: [256, 1704], name: "Main Entrance (Outside)", floor: "Ground Floor", type: "connector" },
    "ent-1-in":  { coords: [616, 1712], name: "Main Entrance (Lobby)",   floor: "Ground Floor", type: "junction" },
    "ent-2-out": { coords: [700, 2768], name: "Side Entrance A (Outside)", floor: "Ground Floor", type: "connector" },
    "ent-2-in":  { coords: [743, 2572], name: "Side Entrance A (Inside)",  floor: "Ground Floor", type: "junction" },
    "ent-3-out": { coords: [1872, 2750], name: "Side Entrance B (Outside)", floor: "Ground Floor", type: "connector" },
    "ent-3-in":  { coords: [1828, 2495], name: "Side Entrance B (Inside)",  floor: "Ground Floor", type: "junction" },

    // --- MAIN HALLWAY JUNCTIONS ---
    "junc-spine-right": { coords: [627, 2430], name: "East Corridor Start", floor: "Ground Floor", type: "junction" },
    "junc-center-1":    { coords: [623, 962],  name: "Center Hall A", floor: "Ground Floor", type: "junction" },
    "junc-center-2":    { coords: [791, 925],  name: "Center Hall B", floor: "Ground Floor", type: "junction" },
    "junc-center-3":    { coords: [808, 829],  name: "Center Hall C", floor: "Ground Floor", type: "junction" },
    
    // Hallway Junctions (Top Side)
    "hall-115":         { coords: [865, 830],  name: "Hallway (Room 115)", floor: "Ground Floor", type: "junction" },
    "hall-116":         { coords: [974, 834],  name: "Hallway (Room 116)", floor: "Ground Floor", type: "junction" },
    "hall-120":         { coords: [1294, 836], name: "Hallway (Room 120/117)", floor: "Ground Floor", type: "junction" },
    "hall-118":         { coords: [1769, 841], name: "Hallway (Room 118)", floor: "Ground Floor", type: "junction" },
    "hall-114":         { coords: [735, 938],  name: "Hallway (Room 114)", floor: "Ground Floor", type: "junction" },

    // Center Extensions
    "junc-center-4":    { coords: [1798, 843], name: "Center Hall D", floor: "Ground Floor", type: "junction" },
    "junc-center-5":    { coords: [1912, 916], name: "Center Hall E", floor: "Ground Floor", type: "junction" },
    "junc-center-6":    { coords: [1964, 1056],name: "Center Hall F", floor: "Ground Floor", type: "junction" },

    // --- RIGHT VERTICAL CORRIDOR ---
    "hall-121":         { coords: [1946, 979],  name: "Hallway (Room 121)", floor: "Ground Floor", type: "junction" },
    "hall-106":         { coords: [1956, 1036], name: "Hallway (Room 106)", floor: "Ground Floor", type: "junction" },
    "hall-122":         { coords: [1964, 1119], name: "Hallway (Room 122)", floor: "Ground Floor", type: "junction" },
    "hall-123":         { coords: [1962, 1450], name: "Hallway (Room 123)", floor: "Ground Floor", type: "junction" },
    "hall-124":         { coords: [1963, 1942], name: "Hallway (Room 124)", floor: "Ground Floor", type: "junction" },
    "hall-125":         { coords: [1959, 2060], name: "Hallway (Room 125)", floor: "Ground Floor", type: "junction" },
    "hall-126":         { coords: [1957, 2158], name: "Hallway (Room 126)", floor: "Ground Floor", type: "junction" },

    // --- LEFT VERTICAL SPINE (Admin & Staff) ---
    "hall-110":         { coords: [618, 1498], name: "Hallway (Accounts)", floor: "Ground Floor", type: "junction" },
    "hall-111":         { coords: [619, 1276], name: "Hallway (Admission)", floor: "Ground Floor", type: "junction" },
    
    "hall-102":         { coords: [623, 2267], name: "Hallway (Staff/Dining)", floor: "Ground Floor", type: "junction" },
    "hall-103":         { coords: [626, 2336], name: "Hallway (Room 103)", floor: "Ground Floor", type: "junction" },
    "hall-134":         { coords: [627, 2342], name: "Hallway (Room 134)", floor: "Ground Floor", type: "junction" },
    "hall-133":         { coords: [575, 2456], name: "Hallway (Room 133)", floor: "Ground Floor", type: "junction" },

    // --- SOUTH HUB & BOTTOM CORRIDOR ---
    "junc-south-1":     { coords: [1959, 2421], name: "South Corridor End", floor: "Ground Floor", type: "junction" },
    "junc-south-2":     { coords: [1749, 2563], name: "South Entrance Hall", floor: "Ground Floor", type: "junction" },

    // Bottom Hallway Chain
    "hall-139":         { coords: [1683, 2564], name: "Hallway (Room 139)", floor: "Ground Floor", type: "junction" },
    "hall-128":         { coords: [1541, 2568], name: "Hallway (Room 128)", floor: "Ground Floor", type: "junction" },
    "hall-138":         { coords: [1460, 2566], name: "Hallway (Room 138)", floor: "Ground Floor", type: "junction" },
    "hall-129":         { coords: [1288, 2569], name: "Hallway (Room 129)", floor: "Ground Floor", type: "junction" },
    "hall-131":         { coords: [1196, 2569], name: "Hallway (Room 131)", floor: "Ground Floor", type: "junction" },
    "hall-137":         { coords: [1132, 2569], name: "Hallway (Room 137)", floor: "Ground Floor", type: "junction" },
    "hall-130":         { coords: [1079, 2570], name: "Hallway (Room 130)", floor: "Ground Floor", type: "junction" },
    "hall-136":         { coords: [907, 2571],  name: "Hallway (Room 136)", floor: "Ground Floor", type: "junction" },
    
    // UPDATED NAME: 123-S -> 132
    "hall-132":         { coords: [788, 2574],  name: "Hallway (Room 132)", floor: "Ground Floor", type: "junction" },
    
    "hall-135":         { coords: [721, 2546],  name: "Hallway (Room 135)", floor: "Ground Floor", type: "junction" },

    // --- ROOMS (Top & Center) ---
    "room-119":         { coords: [1562, 943], name: "Room 119 (Center)", floor: "Ground Floor" },
    "room-119-inner":   { coords: [1444, 943], name: "Room 119 (Inner)", floor: "Ground Floor" },
    "r119-door":        { coords: [1442, 905], name: "Room 119 Door", floor: "Ground Floor", type: "junction" },
    "conn-119-120":     { coords: [1291, 904], name: "Connector 119-120", floor: "Ground Floor", type: "junction" },
    "r120-left":        { coords: [1182, 904], name: "Room 120 (Left)", floor: "Ground Floor", type: "junction" },
    "room-120-center":  { coords: [1078, 945], name: "Room 120 (Center)", floor: "Ground Floor" },
    "r120-mid":         { coords: [1183, 951], name: "Room 120 (Mid)", floor: "Ground Floor", type: "junction" },

    "room-117":         { coords: [1388, 674], name: "Room 117", floor: "Ground Floor" },
    "r117-door":        { coords: [1397, 778], name: "Room 117 Door", floor: "Ground Floor", type: "junction" },
    "r117-path":        { coords: [1294, 790], name: "Room 117 Path", floor: "Ground Floor", type: "junction" },
    "room-116":         { coords: [934, 745], name: "Room 116", floor: "Ground Floor" },
    "r116-door":        { coords: [973, 748], name: "Room 116 Door", floor: "Ground Floor", type: "junction" },
    "room-115":         { coords: [822, 752], name: "Room 115", floor: "Ground Floor" },
    "r115-door":        { coords: [864, 751], name: "Room 115 Door", floor: "Ground Floor", type: "junction" },
    "room-118":         { coords: [1774, 746], name: "Room 118", floor: "Ground Floor" },

    // --- ROOMS (Admin & Staff Complex) ---
    "room-114":         { coords: [642, 822],  name: "Class Theatre (114)", floor: "Ground Floor" },
    "r114-door":        { coords: [733, 782],  name: "Room 114 Door", floor: "Ground Floor", type: "junction" },
    "room-110":         { coords: [511, 1497], name: "Accounts (110)", floor: "Ground Floor" },
    "room-111":         { coords: [512, 1276], name: "Admission (111)", floor: "Ground Floor" },

    // The Dining Complex (102, 104, 105, 106, 108)
    "room-102":         { coords: [540, 2271], name: "Room 102", floor: "Ground Floor" },
    "room-104":         { coords: [468, 2273], name: "Room 104", floor: "Ground Floor" },
    "r104-mid":         { coords: [476, 2092], name: "Passage 104-106", floor: "Ground Floor", type: "junction" },
    "room-106-dining":  { coords: [536, 2093], name: "Dining Room Entrance", floor: "Ground Floor", type: "junction" },
    "room-106-end":     { coords: [556, 1938], name: "Dining Room (106)", floor: "Ground Floor" },
    "room-105":         { coords: [461, 2058], name: "Room 105", floor: "Ground Floor" },
    "room-108":         { coords: [473, 2369], name: "Room 108", floor: "Ground Floor" },

    "room-103":         { coords: [553, 2333], name: "Room 103", floor: "Ground Floor" },
    "room-134":         { coords: [684, 2342], name: "Room 134", floor: "Ground Floor" },
    "room-133":         { coords: [599, 2572], name: "Room 133", floor: "Ground Floor" },

    // --- ROOMS (Right Side) ---
    "room-121":         { coords: [1965, 859], name: "Room 121 (Class Theatre)", floor: "Ground Floor" },
    "r121-path":        { coords: [2010, 952], name: "Room 121 Path", floor: "Ground Floor", type: "junction" },
    "room-106":         { coords: [1867, 1036], name: "Room 106", floor: "Ground Floor" },
    "room-122":         { coords: [2098, 1114], name: "Room 122", floor: "Ground Floor" },
    "room-123":         { coords: [2133, 1453], name: "Room 123", floor: "Ground Floor" },
    "room-124":         { coords: [2066, 1941], name: "Room 124", floor: "Ground Floor" },
    "room-125":         { coords: [2070, 2051], name: "Room 125", floor: "Ground Floor" },
    "room-126":         { coords: [2119, 2154], name: "Room 126", floor: "Ground Floor" },
    "room-127":         { coords: [1962, 2561], name: "Room 127", floor: "Ground Floor" },
    "r127-path":        { coords: [2018, 2451], name: "Room 127 Path", floor: "Ground Floor", type: "junction" },

    // --- ROOMS (Bottom Side) ---
    "room-139":         { coords: [1678, 2457], name: "Room 139", floor: "Ground Floor" },
    "room-128":         { coords: [1544, 2712], name: "Room 128", floor: "Ground Floor" },
    "room-138":         { coords: [1458, 2461], name: "Room 138", floor: "Ground Floor" },
    "room-129":         { coords: [1295, 2712], name: "Board Room 129", floor: "Ground Floor" },
    "room-131":         { coords: [1196, 2658], name: "Met Chairman (131)", floor: "Ground Floor" },
    "room-137":         { coords: [1124, 2459], name: "Room 137", floor: "Ground Floor" },
    "room-130":         { coords: [1084, 2669], name: "Met Chairman (130)", floor: "Ground Floor" },
    "room-136":         { coords: [906, 2450], name: "Room 136", floor: "Ground Floor" },
    
    // UPDATED NAME: 123-s -> 132
    "room-132":         { coords: [807, 2721],  name: "Room 132", floor: "Ground Floor" },
    
    "room-135":         { coords: [729, 2433], name: "Room 135", floor: "Ground Floor" }
};

// 2. GRAPH
const indoorGraph = {
    // --- ENTRANCE CONNECTIONS ---
    "ent-1-out": { neighbors: { "ent-1-in": 360 } },
    "ent-1-in":  { neighbors: { "ent-1-out": 360, "hall-110": 200 } }, 

    "ent-2-out": { neighbors: { "ent-2-in": 240 } },
    "ent-2-in":  { neighbors: { "ent-2-out": 240, "hall-135": 40 } }, 

    "ent-3-out": { neighbors: { "ent-3-in": 200 } },
    "ent-3-in":  { neighbors: { "ent-3-out": 200, "junc-south-1": 150, "junc-south-2": 100 } },

    // --- ADMIN SPINE ---
    "hall-110":      { neighbors: { "ent-1-in": 200, "hall-111": 220, "room-110": 110 } },
    "hall-111":      { neighbors: { "hall-110": 220, "junc-center-1": 310, "room-111": 110 } },

    // --- SPINE DOWN ---
    "hall-102":      { neighbors: { "ent-1-in": 550, "hall-103": 70, "room-102": 80, "room-104": 120 } },
    "hall-103":      { neighbors: { "hall-102": 70,  "hall-134": 20, "room-103": 70 } },
    "hall-134":      { neighbors: { "hall-103": 20,  "junc-spine-right": 85, "room-134": 60 } },
    
    // UPDATED CONNECTION: East Corridor Start now connects to Hall-135
    "junc-spine-right": { neighbors: { "hall-134": 85, "hall-133": 55, "hall-135": 150 } },
    
    "hall-133":      { neighbors: { "junc-spine-right": 55, "room-133": 120 } },

    // --- MAIN HALLWAY BACKBONE ---
    "junc-center-1": { neighbors: { "hall-111": 310, "hall-114": 115 } },
    "hall-114":      { neighbors: { "junc-center-1": 115, "junc-center-2": 60, "r114-door": 160 } },
    "junc-center-2": { neighbors: { "hall-114": 60, "junc-center-3": 100 } },
    "junc-center-3": { neighbors: { "junc-center-2": 100, "hall-115": 60 } },
    "hall-115":      { neighbors: { "junc-center-3": 60,  "hall-116": 110, "r115-door": 80 } },
    "hall-116":      { neighbors: { "hall-115": 110,      "hall-120": 320, "r116-door": 85 } },
    "hall-120":      { neighbors: { "hall-116": 320,      "hall-118": 475, "conn-119-120": 70, "r117-path": 50 } }, 
    "hall-118":      { neighbors: { "hall-120": 475,      "junc-center-4": 30, "room-118": 95 } },
    "junc-center-4": { neighbors: { "hall-118": 30,       "junc-center-5": 150 } },
    "junc-center-5": { neighbors: { "junc-center-4": 150, "hall-121": 80 } },

    // --- VERTICAL CORRIDOR (Right) ---
    "hall-121":      { neighbors: { "junc-center-5": 80,  "hall-106": 60, "r121-path": 70 } },
    "hall-106":      { neighbors: { "hall-121": 60,       "junc-center-6": 30, "room-106": 90 } },
    "junc-center-6": { neighbors: { "hall-106": 30,       "hall-122": 70 } },
    "hall-122":      { neighbors: { "junc-center-6": 70,  "hall-123": 330, "room-122": 135 } },
    "hall-123":      { neighbors: { "hall-122": 330,      "hall-124": 490, "room-123": 170 } },
    "hall-124":      { neighbors: { "hall-123": 490,      "hall-125": 120, "room-124": 105 } },
    "hall-125":      { neighbors: { "hall-124": 120,      "hall-126": 100, "room-125": 110 } },
    "hall-126":      { neighbors: { "hall-125": 100,      "junc-south-1": 260, "room-126": 160 } },

    // --- HORIZONTAL CORRIDOR (Bottom Chain) ---
    "junc-south-2":  { neighbors: { "ent-3-in": 100, "hall-139": 65 } },
    
    "hall-139":      { neighbors: { "junc-south-2": 65, "hall-128": 140, "room-139": 110 } },
    "hall-128":      { neighbors: { "hall-139": 140,    "hall-138": 80,  "room-128": 145 } },
    "hall-138":      { neighbors: { "hall-128": 80,     "hall-129": 170, "room-138": 105 } },
    "hall-129":      { neighbors: { "hall-138": 170,    "hall-131": 90,  "room-129": 145 } },
    "hall-131":      { neighbors: { "hall-129": 90,     "hall-137": 65,  "room-131": 90 } },
    "hall-137":      { neighbors: { "hall-131": 65,     "hall-130": 55,  "room-137": 110 } },
    "hall-130":      { neighbors: { "hall-137": 55,     "hall-136": 170, "room-130": 100 } },
    
    // UPDATED: hall-136 now connects to hall-132 (was 123-s)
    "hall-136":      { neighbors: { "hall-130": 170,    "hall-132": 120, "room-136": 120 } },
    
    // UPDATED: hall-132 (was 123-s)
    "hall-132":      { neighbors: { "hall-136": 120,    "hall-135": 65,  "room-132": 150 } },
    
    // UPDATED: hall-135 connects to East Corridor Start (junc-spine-right)
    "hall-135":      { neighbors: { "hall-132": 65,     "ent-2-in": 30,  "room-135": 110, "junc-spine-right": 150 } },
    
    // South Hub & 127
    "junc-south-1":  { neighbors: { "hall-126": 260, "ent-3-in": 150, "r127-path": 60 } },
    "r127-path":     { neighbors: { "junc-south-1": 60, "room-127": 120 } },

    // --- DINING/STAFF COMPLEX ---
    "room-102":         { neighbors: { "hall-102": 80 } },
    "room-104":         { neighbors: { "hall-102": 120, "r104-mid": 180, "room-108": 100 } },
    "room-108":         { neighbors: { "room-104": 100 } },
    "r104-mid":         { neighbors: { "room-104": 180, "room-105": 35, "room-106-dining": 60 } },
    "room-105":         { neighbors: { "r104-mid": 35 } },
    "room-106-dining":  { neighbors: { "r104-mid": 60, "room-106-end": 155 } },
    "room-106-end":     { neighbors: { "room-106-dining": 155 } },

    // --- ROOM 114 ---
    "r114-door": { neighbors: { "hall-114": 160, "room-114": 90 } },
    "room-114":  { neighbors: { "r114-door": 90 } },

    // --- STANDARD ROOMS ---
    "room-110": { neighbors: { "hall-110": 110 } },
    "room-111": { neighbors: { "hall-111": 110 } },

    "r117-path": { neighbors: { "hall-120": 50, "r117-door": 100 } },
    "r117-door": { neighbors: { "r117-path": 100, "room-117": 105 } },
    "room-117":  { neighbors: { "r117-door": 105 } },
    "r116-door": { neighbors: { "hall-116": 85, "room-116": 40 } },
    "room-116":  { neighbors: { "r116-door": 40 } },
    "r115-door": { neighbors: { "hall-115": 80, "room-115": 40 } },
    "room-115":  { neighbors: { "r115-door": 40 } },
    "room-118":  { neighbors: { "hall-118": 95 } },
    "room-106":  { neighbors: { "hall-106": 90 } },
    "room-122":  { neighbors: { "hall-122": 135 } },
    "room-123":  { neighbors: { "hall-123": 170 } },
    "room-124":  { neighbors: { "hall-124": 105 } },
    "room-125":  { neighbors: { "hall-125": 110 } },
    "room-126":  { neighbors: { "hall-126": 160 } },
    "room-127":  { neighbors: { "r127-path": 120 } },
    "room-128":  { neighbors: { "hall-128": 145 } },
    "room-129":  { neighbors: { "hall-129": 145 } },
    "room-131":  { neighbors: { "hall-131": 90 } },
    "room-130":  { neighbors: { "hall-130": 100 } },
    // UPDATED: 132
    "room-132":  { neighbors: { "hall-132": 150 } },
    "room-139":  { neighbors: { "hall-139": 110 } },
    "room-138":  { neighbors: { "hall-138": 105 } },
    "room-137":  { neighbors: { "hall-137": 110 } },
    "room-136":  { neighbors: { "hall-136": 120 } },
    "room-135":  { neighbors: { "hall-135": 110 } },
    "room-134":  { neighbors: { "hall-134": 60 } },
    "room-133":  { neighbors: { "hall-133": 120 } },
    "room-103":  { neighbors: { "hall-103": 70 } },

    "r121-path": { neighbors: { "hall-121": 70, "room-121": 100 } },
    "room-121":  { neighbors: { "r121-path": 100 } },

    // Room 119/120 Internal Logic
    "conn-119-120": { neighbors: { "hall-120": 70, "r120-left": 110, "r119-door": 150 } },
    "r120-left": { neighbors: { "conn-119-120": 110, "r120-mid": 40 } },
    "r120-mid": { neighbors: { "r120-left": 40, "room-120-center": 100 } },
    "room-120-center": { neighbors: { "r120-mid": 100 } },
    "r119-door": { neighbors: { "conn-119-120": 150, "room-119-inner": 50 } },
    "room-119-inner": { neighbors: { "r119-door": 50, "room-119": 120 } },
    "room-119": { neighbors: { "room-119-inner": 120 } }
};

window.indoorNodes = indoorNodes;
window.indoorGraph = indoorGraph;

