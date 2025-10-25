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

### October 12, 2025
*  Began planning for the next phase of the project: collecting Points of Interest (POIs).
  
*  Defined the structural requirements for handling indoor (floor-wise) navigation data.
  
*  Finalized that the primary POI objects in campusData will now include a floorPlans object to store interior map details.
  
*  The floorPlans structure was set up to include the imageUrl and pixel mapDimensions for each floor.
  
*  Confirmed that all internal room coordinates must be recorded relative to their respective floor plan images.
  
*  Began updating the data structure in js/map_data.js for the first target building
  
*  Identified the need to write a primary JavaScript function to dynamically switch the Leaflet map's layers and bounds to display the internal floor plans.

*  Began planning the necessary data structures for localized A* pathfinding within each floor (floorGraph).












