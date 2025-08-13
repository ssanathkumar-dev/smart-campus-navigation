// This is the core logic for your map and navigation system.

// Set up a custom Coordinate Reference System for a pixel-based map.
const crs = L.CRS.Simple;

// Initialize the map, referencing the 'map' div in your HTML.
const map = L.map('map', {
    crs: crs,
    minZoom: -2,    // Allows zooming out
    maxZoom: 3,     // Allows zooming in
    zoomDelta: 0.25 // Smooths out the zoom steps
});

// --- VERY IMPORTANT: Update these values with your image's dimensions ---
const mapWidth = 4500;  // Replace with the actual width of your image in pixels
const mapHeight = 3000; // Replace with the actual height of your image in pixels

// Define the bounds of the image. The coordinates are [y, x].
const bounds = [[0, 0], [mapHeight, mapWidth]];

// Add your campus layout image to the map as an overlay.
const imageUrl = 'assets/campus_layout.png'; // Path to your image file
L.imageOverlay(imageUrl, bounds).addTo(map);

// Fit the map view to the entire image.
map.fitBounds(bounds);

// Optional: Add a simple marker to the center of the image for testing.
L.marker([mapHeight / 2, mapWidth / 2]).addTo(map)
    .bindPopup("Center of the Campus Layout").openPopup();