# Daily Project Log

### August 13, 2025
* Successfully created the smart-campus-navigation repository on GitHub.

* Initialized the local project with Git and connected it to the remote repository.

* Resolved the "unrelated histories" error by merging the remote and local branches.

* Successfully pushed the initial project files to GitHub.

### August 27, 2025
* Resolved a series of critical Git errors (unable to create lock files) by identifying the issue as likely caused by an antivirus program and a corrupted Git state.

* Successfully executed the git add, git commit, and git push commands.

* Updated the README.md file on GitHub to reflect the project's new scope, which includes classroom navigation.

* Confirmed that the entire project is now fully synchronized and backed up on GitHub.

*  Began planning for the next phase of the project: collecting Points of Interest (POIs).

### October 11, 2025
* Successfully acquired high-resolution, **floor-wise images** for main campus buildings.
  
* Confirmed that these images were obtained from **Gururaj Sir of the Civil Department**, ensuring data accuracy for internal layouts.
  
* The acquired floor plan imagery is a critical milestone for implementing the **internal (indoor) navigation** map layers.
  
* Began planning the necessary updates to the `campusData` structure to support the new floor layers and internal mapping feature.
  
* Confirmed that the external POI coordinate data already collected aligns correctly with the main campus map's path network.

### November 15, 2025
* Core Algorithm Implementation: Successfully implemented the A (A-Star) pathfinding algorithm* in JavaScript. The system can now calculate the shortest path between two nodes based on coordinate distance.

* Initial Indoor Graph Testing: Began manually plotting nodes for the Ground Floor of the Main Building. Successfully routed a test path from the "Entrance" to "Room 001."

* Dashboard Logic: Connected the dashboard.html dropdown menus to the map.html URL parameters. The map now correctly reads ?start= and ?end= from the URL to trigger navigation automatically.

* Debugging: Encountered issues with the map image overlay not scaling correctly on mobile devices; adjusted the Leaflet bounds and minZoom settings to fix the aspect ratio.

### December 12-20, 2025
* Achieved a fully functional "Production Ready" build of the Smart Campus Navigation System.

# Indoor Navigation Complete:

* Finalized the node graph and "Daisy Chain" connections for the Ground, 1st, 2nd, and 3rd floors of the Main Building.

* Implemented "Priority Logic" to prevent the map from resetting to the Ground Floor when routing on upper levels.

* Polished the UI to show clean green/red start-end markers and path lines without debug clutter.

# Outdoor Navigation Finalized:

* Fixed routing anomalies, including "V-shape" paths and isolated nodes near the Hostel/Gym area.

* Resolved unidirectional routing bugs (ensuring paths work both to and from locations like the Gym).

* Updated the search algorithm with a comprehensive Mapping Dictionary, ensuring users can find locations like "Juice Stall" or "Library" even if the graph ID differs from the common name.

# System Integration:

* Successfully linked the Dashboard UI to both indoor and outdoor engines, allowing seamless switching between campus-wide satellite views and detailed floor plans.

* Removed developer debug tools (blue network lines) from the public-facing view for a professional finish.









