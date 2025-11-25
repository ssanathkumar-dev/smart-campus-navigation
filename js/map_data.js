const campusData = [
    {
        name: "Girls Hostel",
        description: "On-campus residential facility for female students.",
        coordinates: [2286, 2938]
    },
    {
        name: "GYM",
        description: "Facilities for various sports and physical activities.",
        coordinates: [2536, 2712] 
    },
    {
        name: "MITM School Area",
        description: "The main block for the campus school, housing administrative offices and classrooms.",
        coordinates: [2202, 2700]
    },
    {
        name: "MITM School Play Area",
        description: "Dedicated outdoor play and recreation space for school students.",
        coordinates: [2166, 2622]
    },
    {
        name: "Ayurveda Building",
        description: "Dedicated block for the study and practice of Ayurvedic medicine.",
        coordinates: [2010, 2246]
    },
    {
        name: "BCA BBA Block",
        description: "Academic block for the Bachelor of Computer Applications and Bachelor of Business Administration programs.",
        coordinates: [1498, 2432]
    },
    {
        name: "Auditorium",
        description: "The hall for college events and ceremonies.",
        coordinates: [1603, 2097] 
    },
    {
        name: "MBA, MCA Block",
        description: "Academic and administrative block for the Masters of Business Administration and Masters of Computer Applications programs.",
        coordinates: [1910, 1956]
    },
    {
        name: "Boys Hostel Block",
        description: "On-campus residential facility for male students.",
        coordinates: [1554, 1858] 
    },
    {
        name: "Parking Lot A",
        description: "Main parking area for staff.",
        coordinates: [2118, 1754] 
    },
    {
        name: "Basketball Ground",
        description: "Outdoor court for basketball practice and matches.",
        coordinates: [2423, 1620]
    },
    {
        name: "College Library",
        description: "The main library building, open 24/7.",
        coordinates: [1942, 1401] 
    },
    {
        name: "Maths Department",
        description: "Departmental offices and faculty rooms for Mathematics.",
        coordinates: [1832, 1138]
    },
    {
        name: "MITM Juice Stall",
        description: "Stall offering fresh juices and cold beverages.",
        coordinates: [1690, 1534]
    },
    {
        name: "MITM Store",
        description: "A general store on campus for stationary, snacks, and basic necessities.",
        coordinates: [1694, 1579]
    },
    {
        name: "MITM Bakery",
        description: "Stall selling baked goods, pastries, and quick snacks.",
        coordinates: [1693, 1622]
    },
    {
        name: "MITM Chats",
        description: "Stall serving popular Indian street food and savoury snacks.",
        coordinates: [1695, 1654]
    },
    {
        name: "MITM Ice Cream",
        description: "Stall selling various ice-cream flavours and frozen desserts.",
        coordinates: [1696, 1679]
    },
    {
        name: "Main Auditorium",
        description: "The main hall for college events and ceremonies.",
        coordinates: [1643, 1683] 
    },
    {
        name: "MITM Rolls",
        description: "Stall specializing in various wraps and rolls, a popular lunch/snack option.",
        coordinates: [1584, 1643]
    },
    {
        name: "MITM Fruits",
        description: "Stall offering fresh fruit cuts and fruit juices.",
        coordinates: [1575, 1616]
    },
    {
        name: "MITM Corns",
        description: "Stall selling corn-based snacks, like boiled or roasted corn on the cob.",
        coordinates: [1565, 1574]
    },
    {
        name: "canteen",
        description: "The main dining area serving meals throughout the day.",
        coordinates: [1483, 1519]
    }
];

const campusGraph = {
    // ------------------------------------------
    // 1. POI Entrances (FIXED: Auditoriums separated)
    // ------------------------------------------
    "hostel-g-entrance": { coords: [2286, 2938], neighbors: { "node-01": 189 } },
    "gym-entrance": { coords: [2536, 2712], neighbors: { "node-01": 239 } },
    "school-area-entrance": { coords: [2202, 2700], neighbors: { "node-01": 110 } },
    "school-play-entrance": { coords: [2166, 2622], neighbors: { "node-01": 185 } },
    "ayurveda-entrance": { coords: [2010, 2246], neighbors: { "node-02": 581 } },
    "bca-bba-entrance": { coords: [1498, 2432], neighbors: { "node-03": 863 } },
    
    // FIX 1: Auditorium only connects to Node 03 (Dead end)
    "auditorium-entrance": { coords: [1603, 2097], neighbors: { "node-03": 559 } }, 
    
    "mba-mca-entrance": { coords: [1910, 1956], neighbors: { "node-03": 885 } },
    "hostel-b-entrance": { coords: [1554, 1858], neighbors: { "node-04": 1163 } },
    "parking-a-entrance": { coords: [2118, 1754], neighbors: { "node-04": 1012 } },
    "basketball-entrance": { coords: [2423, 1620], neighbors: { "node-05": 555 } },
    "library-entrance": { coords: [1942, 1401], neighbors: { "node-05": 86 } },
    "maths-dept-entrance": { coords: [1832, 1138], neighbors: { "node-05": 342 } },
    "juice-stall": { coords: [1690, 1534], neighbors: { "node-06": 64 } },
    "mitm-store": { coords: [1694, 1579], neighbors: { "node-06": 89 } },
    "mitm-bakery": { coords: [1693, 1622], neighbors: { "node-06": 122 } },
    "mitm-chats": { coords: [1695, 1654], neighbors: { "node-06": 149 } },
    "mitm-icecream": { coords: [1696, 1679], neighbors: { "node-06": 175 } },
    
    // FIX 2: Main Auditorium connects to Node 06 (Food Court)
    "auditorium-main": { coords: [1643, 1683], neighbors: { "node-06": 166 } },
    
    "mitm-rolls": { coords: [1584, 1643], neighbors: { "node-06": 132 } },
    "mitm-fruits": { coords: [1575, 1616], neighbors: { "node-06": 111 } },
    "mitm-corns": { coords: [1565, 1574], neighbors: { "node-06": 82 } },
    "canteen-entrance": { coords: [1483, 1519], neighbors: { "node-07": 58 } },

   // ------------------------------------------
    // 2. Path Intersections (REPAIRED & VERIFIED)
    // ------------------------------------------
    
    "node-01": { 
        coords: [2325, 2716], 
        neighbors: { 
            "hostel-g-entrance": 189, "gym-entrance": 239, "school-area-entrance": 110,
            "school-play-entrance": 185, 
            "node-13": 172 // Connects to intermediate node 13
        } 
    },
    
    // New Intermediate Node (Near School/Hostel Curve)
    "node-13": { 
        coords: [2280, 2550], 
        neighbors: {
            "node-01": 172, // Back to Node 01
            "node-08": 102  // Forward to Node 08
        }
    },

    "node-08": {
        coords: [2247, 2478], 
        neighbors: {
            "node-13": 102, // Back to Node 13
            "node-02": 3    // Forward to Node 02
        }
    },

    "node-02": { 
        coords: [2250, 2476], 
        neighbors: { 
            "node-08": 3, "ayurveda-entrance": 581, 
            "node-09": 446 
        } 
    },

    "node-09": {
        coords: [1821, 2609], 
        neighbors: {
            "node-02": 446, 
            "node-03": 4
        }
    },

    "node-03": { 
        coords: [1824, 2606], 
        neighbors: { 
            "node-09": 4, "bca-bba-entrance": 863, 
            "auditorium-entrance": 559, 
            "mba-mca-entrance": 885, 
            "node-14": 657 // Connects to intermediate node 14
        } 
    },

    // New Intermediate Node (Near Parking Lot Curve)
    "node-14": {
        coords: [1800, 1950], 
        neighbors: { 
            "node-03": 657, // Back to Node 03
            "node-04": 267  // Forward to Node 04
        }
    },

    "node-04": { 
        coords: [2066, 1976], 
        neighbors: { 
            "node-14": 267, // Back to Node 14
            "hostel-b-entrance": 1163, "basketball-entrance": 1137,
            "parking-a-entrance": 1012, "node-05": 532
        } 
    },

    "node-05": { 
        coords: [1887, 1476], 
        neighbors: { 
            "node-04": 532, "library-entrance": 86, 
            "maths-dept-entrance": 342, "node-06": 263
        } 
    },

    "node-06": { 
        coords: [1628, 1517], 
        neighbors: { 
            "node-05": 263, "juice-stall": 64, "mitm-store": 89, "mitm-bakery": 122, 
            "mitm-chats": 149, "mitm-icecream": 175, "mitm-rolls": 132, 
            "mitm-fruits": 111, "mitm-corns": 82, 
            "node-07": 87,
            "auditorium-main": 166
        } 
    },

    "node-07": { 
        coords: [1541, 1522], 
        neighbors: { 
            "node-06": 87, "canteen-entrance": 58
        } 
    }

}