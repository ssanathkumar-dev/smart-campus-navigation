// INDOOR MAP DATA (Ground Floor & 1st Floor - Final Production)

// ==========================================
// 1. DEFINE NODES
// ==========================================
const indoorNodes = {
    // --------------------------------------
    // GROUND FLOOR NODES
    // --------------------------------------

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
    "room-132":         { coords: [807, 2721],  name: "Room 132", floor: "Ground Floor" },
    "room-135":         { coords: [729, 2433], name: "Room 135", floor: "Ground Floor" },

    // --------------------------------------
    // 1ST FLOOR NODES (COMPLETE)
    // --------------------------------------

    // --- CORRIDOR: Top Chain ---
    "f1-hall-start": { coords: [602, 1101], name: "1st Floor West Wing", floor: "1st Floor", type: "junction" },
    "f1-hall-1":     { coords: [712, 923],  name: "1st Floor Hall 1", floor: "1st Floor", type: "junction" },
    "f1-hall-2":     { coords: [886, 870],  name: "1st Floor Hall 2", floor: "1st Floor", type: "junction" },
    "f1-hall-3":     { coords: [1809, 872], name: "1st Floor Hall 3", floor: "1st Floor", type: "junction" },
    "f1-hall-4":     { coords: [1875, 925], name: "1st Floor Hall 4", floor: "1st Floor", type: "junction" },
    "f1-hall-5":     { coords: [1935, 1012], name: "1st Floor East Wing Top", floor: "1st Floor", type: "junction" },

    // --- CORRIDOR: Bottom Chain ---
    "f1-hall-7":     { coords: [1935, 2432], name: "1st Floor South Hall 1", floor: "1st Floor", type: "junction" },
    "f1-hall-8":     { coords: [1746, 2596], name: "1st Floor South Hall 2", floor: "1st Floor", type: "junction" },
    "f1-hall-9":     { coords: [740, 2586],  name: "1st Floor South Hall 3", floor: "1st Floor", type: "junction" },
    "f1-hall-end":   { coords: [604, 2429],  name: "1st Floor South West Corner", floor: "1st Floor", type: "junction" },

    // --- ROOMS: West Wing (Left Vertical) ---
    
    "room-207":       { coords: [471, 1097], name: "Room 207", floor: "1st Floor" },

    "room-206":       { coords: [462, 1197], name: "Room 206", floor: "1st Floor" },
    "r206-door":      { coords: [602, 1199], name: "Room 206 Door", floor: "1st Floor", type: "junction" },

    // The 203/204/205 Cluster
    "r204-corr":      { coords: [602, 1520], name: "Passage to 203/204", floor: "1st Floor", type: "junction" },
    "r204-pass-1":    { coords: [534, 1517], name: "Passage 1 (205)", floor: "1st Floor", type: "junction" },
    "r204-pass-2":    { coords: [477, 1518], name: "Passage 2 (203)", floor: "1st Floor", type: "junction" },
    "r204-pass-3":    { coords: [425, 1520], name: "Passage 3 (204)", floor: "1st Floor", type: "junction" },
    
    "room-205":       { coords: [539, 1380], name: "Room 205", floor: "1st Floor" },
    "room-203":       { coords: [485, 1594], name: "Room 203", floor: "1st Floor" },
    "room-204":       { coords: [422, 1599], name: "Room 204", floor: "1st Floor" },

    "room-202":       { coords: [470, 2046], name: "Room 202", floor: "1st Floor" },
    "r202-door":      { coords: [602, 2048], name: "Room 202 Door", floor: "1st Floor", type: "junction" },

    "room-201":       { coords: [473, 2352], name: "Room 201", floor: "1st Floor" },
    "r201-door":      { coords: [605, 2350], name: "Room 201 Door", floor: "1st Floor", type: "junction" },

    // --- ROOMS: Top Row ---
    "room-208":       { coords: [608, 871],  name: "Room 208", floor: "1st Floor" },
    "r208-path":      { coords: [714, 810],  name: "Room 208 Path", floor: "1st Floor", type: "junction" }, 

    "room-209":       { coords: [852, 763],  name: "Room 209", floor: "1st Floor" },
    "r209-door":      { coords: [847, 881],  name: "Room 209 Door", floor: "1st Floor", type: "junction" },

    "room-210":       { coords: [962, 773],  name: "Room 210", floor: "1st Floor" },
    "r210-door":      { coords: [962, 872],  name: "Room 210 Door", floor: "1st Floor", type: "junction" },

    "room-214":       { coords: [1050, 976], name: "Room 214", floor: "1st Floor" },
    "r214-p1":        { coords: [1167, 980], name: "Room 214 Path 1", floor: "1st Floor", type: "junction" },
    "r214-p2":        { coords: [1166, 928], name: "Room 214 Path 2", floor: "1st Floor", type: "junction" },
    "r214-p3":        { coords: [1234, 927], name: "Room 214 Path 3", floor: "1st Floor", type: "junction" },
    "r214-door":      { coords: [1232, 872], name: "Room 214 Door", floor: "1st Floor", type: "junction" },

    "room-213":       { coords: [1534, 977], name: "Room 213", floor: "1st Floor" },
    "r213-p1":        { coords: [1367, 977], name: "Room 213 Path 1", floor: "1st Floor", type: "junction" },
    "r213-p2":        { coords: [1367, 933], name: "Room 213 Path 2", floor: "1st Floor", type: "junction" },
    "r213-p3":        { coords: [1302, 930], name: "Room 213 Path 3", floor: "1st Floor", type: "junction" },
    "r213-door":      { coords: [1302, 875], name: "Room 213 Door", floor: "1st Floor", type: "junction" },

    "room-211":       { coords: [1361, 715], name: "Room 211", floor: "1st Floor" },
    "r211-door":      { coords: [1360, 875], name: "Room 211 Door", floor: "1st Floor", type: "junction" },

    "room-212":       { coords: [1771, 740], name: "Room 212", floor: "1st Floor" },
    "r212-door":      { coords: [1766, 876], name: "Room 212 Door", floor: "1st Floor", type: "junction" },

    // --- ROOMS: East Wing (Right Vertical) ---
    "room-216":       { coords: [1945, 877], name: "Room 216", floor: "1st Floor" },
    "r216-door":      { coords: [1993, 974], name: "Room 216 Door", floor: "1st Floor", type: "junction" },

    "room-218":       { coords: [2118, 1122], name: "Room 218", floor: "1st Floor" },
    "r218-door":      { coords: [1934, 1117], name: "Room 218 Door", floor: "1st Floor", type: "junction" },

    "room-219":       { coords: [2093, 1344], name: "Room 219", floor: "1st Floor" },
    "r219-door":      { coords: [1936, 1345], name: "Room 219 Door", floor: "1st Floor", type: "junction" },

    "room-220":       { coords: [2109, 1686], name: "Room 220", floor: "1st Floor" },
    "r220-door":      { coords: [1934, 1686], name: "Room 220 Door", floor: "1st Floor", type: "junction" },

    "room-220a":      { coords: [2118, 1968], name: "Room 220-A", floor: "1st Floor" },
    "r220a-door":     { coords: [1938, 1975], name: "Room 220-A Door", floor: "1st Floor", type: "junction" },

    "room-221":       { coords: [2112, 2079], name: "Room 221", floor: "1st Floor" },
    "r221-door":      { coords: [1937, 2081], name: "Room 221 Door", floor: "1st Floor", type: "junction" },

    "room-222":       { coords: [2111, 2195], name: "Room 222", floor: "1st Floor" },
    "r222-door":      { coords: [1939, 2191], name: "Room 222 Door", floor: "1st Floor", type: "junction" },

    "room-223":       { coords: [2103, 2345], name: "Room 223", floor: "1st Floor" },
    "r223-door":      { coords: [1931, 2342], name: "Room 223 Door", floor: "1st Floor", type: "junction" },

    // --- ROOMS: South Hall (Bottom) ---
    "room-224":       { coords: [1955, 2597], name: "Room 224", floor: "1st Floor" },
    "r224-door":      { coords: [1990, 2482], name: "Room 224 Door", floor: "1st Floor", type: "junction" },

    "room-225":       { coords: [1770, 2749], name: "Room 225", floor: "1st Floor" },
    "r225-door":      { coords: [1774, 2573], name: "Room 225 Door", floor: "1st Floor", type: "junction" },

    "room-226":       { coords: [1550, 2749], name: "Room 226", floor: "1st Floor" },
    "r226-door":      { coords: [1551, 2595], name: "Room 226 Door", floor: "1st Floor", type: "junction" },

    "room-227":       { coords: [1177, 2745], name: "Room 227", floor: "1st Floor" },
    "r227-door":      { coords: [1177, 2591], name: "Room 227 Door", floor: "1st Floor", type: "junction" },

    "room-228":       { coords: [1072, 2738], name: "Room 228", floor: "1st Floor" },
    "r228-door":      { coords: [1064, 2591], name: "Room 228 Door", floor: "1st Floor", type: "junction" },

    "room-229":       { coords: [957, 2748], name: "Room 229", floor: "1st Floor" },
    "r229-door":      { coords: [947, 2588], name: "Room 229 Door", floor: "1st Floor", type: "junction" },

    "room-230":       { coords: [611, 2599], name: "Room 230", floor: "1st Floor" },
    "r230-door":      { coords: [714, 2651], name: "Room 230 Door", floor: "1st Floor", type: "junction" },
};

// ==========================================
// 2. DEFINE CONNECTIONS
// ==========================================
const indoorGraph = {
    // --------------------------------------
    // GROUND FLOOR CONNECTIONS
    // --------------------------------------
    "ent-1-out": { neighbors: { "ent-1-in": 360 } },
    "ent-1-in":  { neighbors: { "ent-1-out": 360, "hall-110": 200 } }, 
    "ent-2-out": { neighbors: { "ent-2-in": 240 } },
    "ent-2-in":  { neighbors: { "ent-2-out": 240, "hall-135": 40 } }, 
    "ent-3-out": { neighbors: { "ent-3-in": 200 } },
    "ent-3-in":  { neighbors: { "ent-3-out": 200, "junc-south-1": 150, "junc-south-2": 100 } },
    "hall-110":      { neighbors: { "ent-1-in": 200, "hall-111": 220, "room-110": 110 } },
    "hall-111":      { neighbors: { "hall-110": 220, "junc-center-1": 310, "room-111": 110 } },
    "hall-102":      { neighbors: { "ent-1-in": 550, "hall-103": 70, "room-102": 80, "room-104": 120 } },
    "hall-103":      { neighbors: { "hall-102": 70,  "hall-134": 20, "room-103": 70 } },
    "hall-134":      { neighbors: { "hall-103": 20,  "junc-spine-right": 85, "room-134": 60 } },
    "junc-spine-right": { neighbors: { "hall-134": 85, "hall-133": 55, "hall-135": 150 } },
    "hall-133":      { neighbors: { "junc-spine-right": 55, "room-133": 120 } },
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
    "hall-121":      { neighbors: { "junc-center-5": 80,  "hall-106": 60, "r121-path": 70 } },
    "hall-106":      { neighbors: { "hall-121": 60,       "junc-center-6": 30, "room-106": 90 } },
    "junc-center-6": { neighbors: { "hall-106": 30,       "hall-122": 70 } },
    "hall-122":      { neighbors: { "junc-center-6": 70,  "hall-123": 330, "room-122": 135 } },
    "hall-123":      { neighbors: { "hall-122": 330,      "hall-124": 490, "room-123": 170 } },
    "hall-124":      { neighbors: { "hall-123": 490,      "hall-125": 120, "room-124": 105 } },
    "hall-125":      { neighbors: { "hall-124": 120,      "hall-126": 100, "room-125": 110 } },
    "hall-126":      { neighbors: { "hall-125": 100,      "junc-south-1": 260, "room-126": 160 } },
    "junc-south-2":  { neighbors: { "ent-3-in": 100, "hall-139": 65 } },
    "hall-139":      { neighbors: { "junc-south-2": 65, "hall-128": 140, "room-139": 110 } },
    "hall-128":      { neighbors: { "hall-139": 140,    "hall-138": 80,  "room-128": 145 } },
    "hall-138":      { neighbors: { "hall-128": 80,     "hall-129": 170, "room-138": 105 } },
    "hall-129":      { neighbors: { "hall-138": 170,    "hall-131": 90,  "room-129": 145 } },
    "hall-131":      { neighbors: { "hall-129": 90,     "hall-137": 65,  "room-131": 90 } },
    "hall-137":      { neighbors: { "hall-131": 65,     "hall-130": 55,  "room-137": 110 } },
    "hall-130":      { neighbors: { "hall-137": 55,     "hall-136": 170, "room-130": 100 } },
    "hall-136":      { neighbors: { "hall-130": 170,    "hall-132": 120, "room-136": 120 } },
    "hall-132":      { neighbors: { "hall-136": 120,    "hall-135": 65,  "room-132": 150 } },
    "hall-135":      { neighbors: { "hall-132": 65,     "ent-2-in": 30,  "room-135": 110, "junc-spine-right": 150 } },
    "junc-south-1":  { neighbors: { "hall-126": 260, "ent-3-in": 150, "r127-path": 60 } },
    "r127-path":     { neighbors: { "junc-south-1": 60, "room-127": 120 } },
    "room-102":         { neighbors: { "hall-102": 80 } },
    "room-104":         { neighbors: { "hall-102": 120, "r104-mid": 180, "room-108": 100 } },
    "room-108":         { neighbors: { "room-104": 100 } },
    "r104-mid":         { neighbors: { "room-104": 180, "room-105": 35, "room-106-dining": 60 } },
    "room-105":         { neighbors: { "r104-mid": 35 } },
    "room-106-dining":  { neighbors: { "r104-mid": 60, "room-106-end": 155 } },
    "room-106-end":     { neighbors: { "room-106-dining": 155 } },
    "r114-door": { neighbors: { "hall-114": 160, "room-114": 90 } },
    "room-114":  { neighbors: { "r114-door": 90 } },
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
    "conn-119-120": { neighbors: { "hall-120": 70, "r120-left": 110, "r119-door": 150 } },
    "r120-left": { neighbors: { "conn-119-120": 110, "r120-mid": 40 } },
    "r120-mid": { neighbors: { "r120-left": 40, "room-120-center": 100 } },
    "room-120-center": { neighbors: { "r120-mid": 100 } },
    "r119-door": { neighbors: { "conn-119-120": 150, "room-119-inner": 50 } },
    "room-119-inner": { neighbors: { "r119-door": 50, "room-119": 120 } },
    "room-119": { neighbors: { "room-119-inner": 120 } },

    // --------------------------------------
    // 1ST FLOOR CONNECTIONS
    // --------------------------------------

    // Left Vertical Chain (West Wing) - Top to Bottom
    "f1-hall-start": { neighbors: { "room-207": 120, "r206-door": 98 } },
    "room-207":      { neighbors: { "f1-hall-start": 120 } },

    "r206-door":     { neighbors: { "f1-hall-start": 98, "room-206": 140, "r204-corr": 320 } },
    "room-206":      { neighbors: { "r206-door": 140 } },

    // The Complex Branch (203/204/205)
    "r204-corr":     { neighbors: { "r206-door": 320, "r204-pass-1": 68, "r202-door": 528 } },
    
    "r204-pass-1":   { neighbors: { "r204-corr": 68, "room-205": 137, "r204-pass-2": 57 } },
    "room-205":      { neighbors: { "r204-pass-1": 137 } },

    "r204-pass-2":   { neighbors: { "r204-pass-1": 57, "room-203": 76, "r204-pass-3": 52 } },
    "room-203":      { neighbors: { "r204-pass-2": 76 } },

    "r204-pass-3":   { neighbors: { "r204-pass-2": 52, "room-204": 79 } },
    "room-204":      { neighbors: { "r204-pass-3": 79 } },

    "r202-door":     { neighbors: { "r204-corr": 528, "room-202": 132, "r201-door": 302 } },
    "room-202":      { neighbors: { "r202-door": 132 } },

    "r201-door":     { neighbors: { "r202-door": 302, "room-201": 132, "f1-hall-end": 79 } },
    "room-201":      { neighbors: { "r201-door": 132 } },

    // Top Chain Sequence
    "f1-hall-start": { neighbors: { "f1-hall-1": 209, "f1-hall-end": 1333, "room-207": 120 } }, // Merged Left Chain connection
    
    "f1-hall-1":     { neighbors: { "f1-hall-start": 209, "r209-door": 135, "r208-path": 113 } },
    
    // Room 208
    "r208-path":     { neighbors: { "f1-hall-1": 113, "room-208": 106 } },
    "room-208":      { neighbors: { "r208-path": 106 } },

    "r209-door":     { neighbors: { "f1-hall-1": 135, "room-209": 120, "f1-hall-2": 40 } },
    "room-209":      { neighbors: { "r209-door": 120 } },

    "f1-hall-2":     { neighbors: { "r209-door": 40,  "r210-door": 75 } },

    "r210-door":     { neighbors: { "f1-hall-2": 75,  "room-210": 100, "r214-door": 270 } },
    "room-210":      { neighbors: { "r210-door": 100 } },

    "r214-door":     { neighbors: { "r210-door": 270, "r214-p3": 55,   "r213-door": 70 } },
    "r214-p3":       { neighbors: { "r214-door": 55, "r214-p2": 68 } },
    "r214-p2":       { neighbors: { "r214-p3": 68, "r214-p1": 52 } },
    "r214-p1":       { neighbors: { "r214-p2": 52, "room-214": 117 } },
    "room-214":      { neighbors: { "r214-p1": 117 } },

    "r213-door":     { neighbors: { "r214-door": 70,  "r213-p3": 55,   "r211-door": 60 } },
    "r213-p3":       { neighbors: { "r213-door": 55, "r213-p2": 65 } },
    "r213-p2":       { neighbors: { "r213-p3": 65, "r213-p1": 44 } },
    "r213-p1":       { neighbors: { "r213-p2": 44, "room-213": 167 } },
    "room-213":      { neighbors: { "r213-p1": 167 } },

    "r211-door":     { neighbors: { "r213-door": 60,  "room-211": 160, "r212-door": 400 } },
    "room-211":      { neighbors: { "r211-door": 160 } },

    "r212-door":     { neighbors: { "r211-door": 400, "room-212": 135, "f1-hall-3": 45 } },
    "room-212":      { neighbors: { "r212-door": 135 } },

    "f1-hall-3":     { neighbors: { "r212-door": 45,  "f1-hall-4": 85 } },
    "f1-hall-4":     { neighbors: { "f1-hall-3": 85,  "f1-hall-5": 105 } },

    // Right Vertical Chain (East Wing)
    "r216-door":     { neighbors: { "room-216": 120, "f1-hall-5": 60 } },
    "room-216":      { neighbors: { "r216-door": 120 } },

    "f1-hall-5":     { neighbors: { "f1-hall-4": 105, "r216-door": 60, "r218-door": 105 } },

    "r218-door":     { neighbors: { "f1-hall-5": 105, "room-218": 185, "r219-door": 230 } },
    "room-218":      { neighbors: { "r218-door": 185 } },

    "r219-door":     { neighbors: { "r218-door": 230, "room-219": 160, "r220-door": 340 } },
    "room-219":      { neighbors: { "r219-door": 160 } },

    "r220-door":     { neighbors: { "r219-door": 340, "room-220": 175, "r220a-door": 290 } },
    "room-220":      { neighbors: { "r220-door": 175 } },

    "r220a-door":    { neighbors: { "r220-door": 290, "room-220a": 180, "r221-door": 105 } },
    "room-220a":     { neighbors: { "r220a-door": 180 } },

    "r221-door":     { neighbors: { "r220a-door": 105, "room-221": 175, "r222-door": 110 } },
    "room-221":      { neighbors: { "r221-door": 175 } },

    "r222-door":     { neighbors: { "r221-door": 110, "room-222": 175, "r223-door": 150 } },
    "room-222":      { neighbors: { "r222-door": 175 } },

    "r223-door":     { neighbors: { "r222-door": 150, "room-223": 175, "f1-hall-7": 100 } },
    "room-223":      { neighbors: { "r223-door": 175 } },

    // Bottom Chain
    "f1-hall-7":     { neighbors: { "r223-door": 100, "r224-door": 55, "r225-door": 216 } },

    "r224-door":     { neighbors: { "f1-hall-7": 55, "room-224": 115 } },
    "room-224":      { neighbors: { "r224-door": 115 } },

    "r225-door":     { neighbors: { "f1-hall-7": 216, "room-225": 175, "f1-hall-8": 50 } },
    "room-225":      { neighbors: { "r225-door": 175 } },

    "f1-hall-8":     { neighbors: { "r225-door": 50,  "r226-door": 200 } },

    "r226-door":     { neighbors: { "f1-hall-8": 200, "room-226": 155, "r227-door": 370 } },
    "room-226":      { neighbors: { "r226-door": 155 } },

    "r227-door":     { neighbors: { "r226-door": 370, "room-227": 155, "r228-door": 115 } },
    "room-227":      { neighbors: { "r227-door": 155 } },

    "r228-door":     { neighbors: { "r227-door": 115, "room-228": 150, "r229-door": 115 } },
    "room-228":      { neighbors: { "r228-door": 150 } },

    "r229-door":     { neighbors: { "r228-door": 115, "room-229": 160, "f1-hall-9": 200 } },
    "room-229":      { neighbors: { "r229-door": 160 } },

    "f1-hall-9":     { neighbors: { "r229-door": 200, "r230-door": 65, "f1-hall-end": 220 } },

    "r230-door":     { neighbors: { "f1-hall-9": 65,  "room-230": 115 } }, 
    "room-230":      { neighbors: { "r230-door": 115 } },

    "f1-hall-end":   { neighbors: { "f1-hall-9": 220, "r201-door": 79 } } // CONNECTS BACK TO LEFT SPINE!
};

window.indoorNodes = indoorNodes;
window.indoorGraph = indoorGraph;