// Store the canvas size
var canvasSize = 600;

// Store the number of grid squares
var gridSquares = 22;

// Store the individual grid dimensions
var gridSquareSize;

// List to hold the workers
var workers;

// Create a list of packages
var packages;

// List to hold the walls
var walls;

// List to hold the goals
var goals;

// List to hold all of the crate spawners
var spawners;

// Variable to hold the current worker
var currentWorker;

// Store whether the game is currently running
var running;

// Store whether the game has crashed
var crashed;

// Keys
var SPACE = 32;
var C_KEY = 67;
var D_KEY = 68;
var L_KEY = 76;
var R_KEY = 82;

// Store the background colour
var backgroundColour;

// Set the level file
var levelFile;

// Setup function run before game starts
function setup() {
	
	// Load the level
	loadLevel();
	
	// Create a canvas
	createCanvas(canvasSize, canvasSize);
	
	// Set the background colour to white
	backgroundColour = color(255);
	
	// Set the grid size
	gridSquareSize = canvasSize / gridSquares;
	
	// Create an empty list to hold the workers
	workers = [];
	
	// Clear any workers
	currentWorker = -1;
	
	// Set running to false
	running = false;
	
	// Set crashed flag to false
	crashed = false;
	
	// Set the frame rate
	frameRate(5);
		
}

// Render function
function draw() {

	// Check whether we are running
	if (running) {
		
		// Update the spawners
		updateSpawners();
		
		// Update the workers
		updateWorkers();
		
	}
	
	// Clear the canvas
	clear();

	// Call the function to draw the grid
	drawGrid();

	// Draw the walls
	drawWalls();

	// Call the function to draw the points
	drawWorkers();

	// Draw the worker path
	drawWorkerPath();

	// Draw the goals
	drawGoals();
	
	// Draw the spawners
	drawSpawners();

	// Draw the packages
	drawPackages();

	// Update the packages
	updatePackages();
	
}

// Function to generate the bounding box
function getBounds() {
	
	// Go round the border
	for (var i = 0; i < gridSquares; i++) {
		
		// Add the walls
		walls.push(Wall(Point(i,0)));
		walls.push(Wall(Point(0,i)));
		walls.push(Wall(Point(gridSquares-1,i)));
		walls.push(Wall(Point(i,gridSquares-1)));
		
	}
	
}

// Function to draw a grid
function drawGrid() {
	
	// For each row
	for (var i = 0; i < gridSquares; i++) {
		
		// For each column
		for (var j = 0; j < gridSquares; j++) {
			
			// Calculate the x and y
			var x = i;
			var y = j;
			
			// Draw the grid square
			drawGridSquare(x, y, backgroundColour);
		}
		
	}
	
}

// Function to draw a grid square
function drawGridSquare(x, y, colour) {
	
	// Calculate exact location on screen
	x = x * gridSquareSize;
	y = y * gridSquareSize;
	
	// Set the colour
	fill(colour);
			
	// Draw the quad
	quad(x,y, x+gridSquareSize,y, x+gridSquareSize,y+gridSquareSize, x,y+gridSquareSize);
	
}

// Function to draw a goal
function drawGoal(x, y, colour) {
	
	// Draw the grid square
	drawGridSquare(x, y, colour);
	
	// Calculate exact location on screen
	x = x * gridSquareSize;
	y = y * gridSquareSize;
	
	// Set the hole percentage
	var goalPercent = 5;
	
	// Draw the hole
	line(x,y, x+gridSquareSize/2-gridSquareSize/goalPercent,y+gridSquareSize/2-gridSquareSize/goalPercent);
	line(x+gridSquareSize,y, x+gridSquareSize/2+gridSquareSize/goalPercent,y+gridSquareSize/2-gridSquareSize/goalPercent);
	line(x+gridSquareSize,y+gridSquareSize, x+gridSquareSize/2+gridSquareSize/goalPercent,y+gridSquareSize/2+gridSquareSize/goalPercent);
	line(x,y+gridSquareSize, x+gridSquareSize/2-gridSquareSize/goalPercent,y+gridSquareSize/2+gridSquareSize/goalPercent);
	quad(x+gridSquareSize/2-gridSquareSize/goalPercent,y+gridSquareSize/2-gridSquareSize/goalPercent, x+gridSquareSize/2+gridSquareSize/goalPercent,y+gridSquareSize/2-gridSquareSize/goalPercent, x+gridSquareSize/2+gridSquareSize/goalPercent,y+gridSquareSize/2+gridSquareSize/goalPercent, x+gridSquareSize/2-gridSquareSize/goalPercent,y+gridSquareSize/2+gridSquareSize/goalPercent);
}

// Function to draw the points
function drawWorkers() {
	
	// For each point
	for(var i = 0; i < workers.length; i++) {
		
		// Get the x and y
		var x = workers[i].location.x;
		var y = workers[i].location.y;
		
		// Set the worker colour
		var c = color(255, 0, 200);
		
		// Check if the worker is a loop worker
		if (workers[i].loop) {
			
			// Set the worker colour to green
			c = color(0, 51, 102);
			
		}
		
		// Check if this is the current worker
		if (i == currentWorker) {
			
			// Set the colour
			c = color(255, 0, 0);
			
		}
		
		// Draw the gridsquare
		drawGridSquare(x, y, c);
		
	}
	
}

// Function to draw the packages
function drawPackages() {
	
	// Look at each package
	for (var i =0; i < packages.length; i++) {
	
		// Draw the package
		drawGridSquare(packages[i].location.x, packages[i].location.y, packages[i].colour);
	
	}
	
}

// Function to draw the goals
function drawGoals() {
	
	// For each goal
	for (var i = 0; i < goals.length; i++) {
		
		// Draw the goal
		drawGoal(goals[i].location.x, goals[i].location.y, goals[i].colour);
		
	}
	
}

// Function to draw the walls
function drawWalls() {
	
	// Look at each wall
	for (var i = 0; i < walls.length; i++) {
		
		// Draw the wall
		drawGridSquare(walls[i].location.x, walls[i].location.y, color(0));
		
	}
	
}

// Draw a worker path
function drawWorkerPath() {
	
	// Check if there is a worker selected
	if (currentWorker !== -1) {
		
		// Draw the workers path
		for (var i = 1; i < workers[currentWorker].path.length; i++) {
			
			// Check that the path isn't over the worker
			if (!(workers[currentWorker].location.x === workers[currentWorker].path[i].x && workers[currentWorker].location.y === workers[currentWorker].path[i].y)) {
			
				// Draw at the location
				drawGridSquare(workers[currentWorker].path[i].x, workers[currentWorker].path[i].y, color(0, 200, 255));
			
			}
		}
	}
}

// Function to draw the spawners
function drawSpawners() {
	
	// For each goal
	for (var i = 0; i < spawners.length; i++) {
		
		// Draw the goal
		drawSpawner(spawners[i].location.x, spawners[i].location.y, spawners[i].colour, spawners[i].direction.x, spawners[i].direction.y);
		
	}
}

// Function to draw a spawner
function drawSpawner(x, y, colour, dx, dy) {
	
	// Draw the grid square
	drawGridSquare(x, y, colour);
	
	// Calculate exact location on screen
	x = x * gridSquareSize;
	y = y * gridSquareSize;
	
	// Fill in black
	fill(0);
	
	// Set the hole percentage
	ellipse(x+gridSquareSize/2+(dx*gridSquareSize/5), y+gridSquareSize/2+(dy*gridSquareSize/5), gridSquareSize/10, gridSquareSize/10);
	
}

// Function to deal with mouse clicks
function mouseClicked() {
	
	// Check if the game is running
	if (running) {
	
		// Reset
		reset();
		
	}
	else {
	
		// Check that the mouse click is in the grid
		if (crashed || !((mouseX >= 0 && mouseX <= canvasSize) && (mouseY >= 0 && mouseY <= canvasSize))) {
			
			// Deselect workers
			currentWorker = -1; 
			
			// Return
			return;
			
		}
			
		// Get the x and y
		var x = Math.floor(mouseX / gridSquareSize);
		var y = Math.floor(mouseY / gridSquareSize);
		
		// Look at each wall
		for (var i = 0; i < walls.length; i++) {
			
			// If the user clicked on a wall
			if (walls[i].location.x == x && walls[i].location.y == y) {
				
				// Return
				return;
				
			}
			
		}
		
		// Check the mouse button
		if (mouseButton === LEFT) {
			
			// Store whether we already have a worker at this location
			var workerExists = false;
			
			// Check whether there is already a worker at the location
			for (var i = 0; i < workers.length; i++) {
				
				// Check whether the worker is at (x,y) of mouse
				if (workers[i].location.x == x && workers[i].location.y == y) {
					
					// Check if there is a worker selected
					if (currentWorker == -1) {
					
						// Select the worker
						currentWorker = i;
						
						// Set worker exists to true
						workerExists = true;
					}
					
					// Break
					break;
					
				}
				
			}
			
			// If there isn't already a worker and we haven't got a worker selected
			if (!workerExists && currentWorker == -1) {
				
				// Set package location to false
				packageLocation = false;
				
				// Look at each package
				for (var i = 0; i < packages.length; i++) {
					
					// If the location has a package on it
					if (packages[i].location.x == x && packages[i].location.y == y) {
						
						// Set package location to true
						packageLocation = true;
						
						// Break
						break;
						
					}
					
				}
				
				// Check that there is no package on the new worker location
				if (!packageLocation) {
				
					// Create a new worker at the location
					workers.push(Worker(Point(x,y), [Point(x,y)]));
				
				}
				
			}
			else if(!workerExists) {
				
				// Otherwise check if the (x,y) we have selected is adjacent to the (x,y) of the LAST path location of the current worker
				if (equalOrAdjacent(Point(x,y), workers[currentWorker].path[workers[currentWorker].path.length - 1])) {
					
					// Add to the path
					workers[currentWorker].path.push(Point(x,y));
					
					// If the worker is a loop worker
					if (workers[currentWorker].loop) {
						
						// Check whether this path still allows them to loop
						if (!equalOrAdjacent(workers[currentWorker].path[0], workers[currentWorker].path[workers[currentWorker].path.length - 1])) {
							
							// Set the worker as a non-loop worker
							workers[currentWorker].loop = false;
							
						}
						
					}
					
				}
				else {
					
					// If not valid, deselect worker
					currentWorker = -1;
					
				}
				
			}
			
		}
	}	
}

// Function to deal with key presses
function keyPressed() {
	
	// Check if it was the space keyPressed
	if (keyCode == SPACE) {
		
		// If the game hasn't crashed
		if (!crashed) {
		
			// Set running to true
			running = true;
			
			// Deselect all workers
			currentWorker = -1;
			
			// Set the background colour to running
			backgroundColour = color(144,238,144);
		
		}
		else {
			
			// Reset the game
			reset();
			
		}
		
	}
	
	// Check if it was the C key
	if (keyCode == C_KEY) {
		
		// Check if there is a worker selected
		if (currentWorker != -1) {
			
			// Clear the worker path
			workers[currentWorker].path = [workers[currentWorker].path[0]];
			
		}
	}
	
	// Check if it was the spacespace key
	if (keyCode == D_KEY) {
		
		// Check if there is a worker selected
		if (currentWorker != -1) {
			
			// Delete the worker
			workers.splice(currentWorker, 1);
			currentWorker = -1;
			
		}
	}
	
	// Check if it was the l key
	if (keyCode == L_KEY) {
		
		// Check if there is currently a worker
		if (currentWorker !== -1) {
			
			// Check whether the workers last path location is adjacent to the first
			if (equalOrAdjacent(workers[currentWorker].path[0], workers[currentWorker].path[workers[currentWorker].path.length - 1])) {
				
				// Set the worker as a loop worker
				workers[currentWorker].loop = true;
				
			}
			
		}
	}
	
	// Check if it was the r key
	if (keyCode == R_KEY) {
		
		// Check if there is currently a worker
		if (currentWorker !== -1) {
			
			// Set the current worker to be a repeater
			workers[currentWorker].loop = false;
			
		}
	}
}

// Function to return whether two points are at the same location
function equalOrAdjacent(pointOne, pointTwo) {
	
	// Check whether they are adjacent
	if (pointOne.x + 1 == pointTwo.x && pointOne.y == pointTwo.y) {
		return true;
	}
	if (pointOne.x - 1 == pointTwo.x && pointOne.y == pointTwo.y) {
		return true;
	}
	if (pointOne.x == pointTwo.x && pointOne.y + 1 == pointTwo.y) {
		return true;
	}
	if (pointOne.x == pointTwo.x && pointOne.y - 1 == pointTwo.y) {
		return true;
	}
	
	// Return whether they are equivalent
	return pointOne.x == pointTwo.x && pointOne.y == pointTwo.y;
	
}

// Function to return a point
function Point(_x, _y) {
	
	// Return a new point
	return {x: _x, y: _y};
	
}

// Create a function to create a spawner
function Spawner(_location, _items, _frequency, _direction, _colour, _id) {
	
	// Return a spawner object
	return {location: _location, direction: _direction, items: _items, frequency: _frequency, spawn: 0, id: _id, colour: _colour};
	
}

// Create a function to return a worker
function Worker(_location, _path) {
	
	// Return a new worker object
	return {location: _location, direction: 1, currentPathLocation: 0, path: _path, loop: false};
	
}

// Function to create a package
function Package(_location, _colour, _id) {
	
	// Return a package object
	return {location: _location, originalLocation: _location, colour: _colour, id: _id};
	
}

// Function to create a wall
function Wall(_location) {
	
	// Return the wall object
	return {location: _location};
	
}

// Function to create a goal
function Goal(_location, _colour, _id) {
	
	// Return the goal object
	return {location: _location, colour: _colour, id: _id};
	
}

// Function to update the workers location
function updateWorkers() {
	
	// For each worker
	for (var i = 0; i < workers.length; i++) {
		
		// Update the position of this worker
		workers[i].location = workers[i].path[workers[i].currentPathLocation];
		
		// Check if there is a path
		if (workers[i].path.length > 1) {
			
			// Check if the package has been moved
			pushPackages(i);
			
			// Move the worker to the next location
			workers[i].currentPathLocation += workers[i].direction;
			
			// Check if the workers is a loop worker
			if (!workers[i].loop) {
			
				// Check whether this is the first or last location on the path
				if (workers[i].currentPathLocation == 0 || workers[i].currentPathLocation == workers[i].path.length - 1) {
					
					// Reverse the location 
					workers[i].direction = -workers[i].direction;
					
				}
			
			}
			else {
				
				// I the worker is a looper, check if we are at the last location
				if (workers[i].currentPathLocation == workers[i].path.length) {
					
					// Set the location back to 0
					workers[i].currentPathLocation = 0;
					
				}
				
				
			}
		
		}
		
		// Look at every other worker
		for (var j = i + 1; j < workers.length; j++) {
			
			// Check if the workers have collided
			if (overlap(workers[i].location,workers[j].location)) {
				
				// Crash the game
				crash();
				
			}
			
		}
		
	}
	
}

// Function to update spawners
function updateSpawners() {
	
	// Look at each spawner
	for (var i = 0; i < spawners.length; i++) {
		
		// Check if the spawner is ready to spawn
		if (spawners[i].spawn === 0 && spawners[i].items > 0) {
			
			// Spawn a new package
			packages.push(Package(Point(spawners[i].location.x + spawners[i].direction.x, spawners[i].location.y + spawners[i].direction.y), spawners[i].colour, spawners[i].id));
			
			// Check if we have pushed any packages
			packagePushPackage(packages.length - 1, spawners[i].direction.x, spawners[i].direction.y);
			
			// Reset the spawn frequency
			spawners[i].spawn = spawners[i].frequency;
			
			// Remove one the number of items left
			spawners[i].items--;
			
		}
		else {
			
			// Tick
			spawners[i].spawn--;
			
		}
		
	}
	
}

// Function to reset() {
function reset() {
	
	// Set the background to white
	backgroundColour = color(255);
	
	// Reset everything to none running state
	running = false;
	resetWorkers();
	resetPackages();
	crashed = false;
	
	// Reload the level
	loadLevel();
	
}

// Function to reset all workers
function resetWorkers() {
	
	// Look at each worker
	for (var i = 0; i < workers.length; i++) {
		
		// Reset location and path location
		workers[i].location = workers[i].path[0];
		workers[i].currentPathLocation = 0;
		workers[i].direction = 1;
		
	}
	
}

// Function to reset the packages
function resetPackages() {
	
	// Look at each package
	for (var i = 0; i < packages.length; i++) {
		
		// Reset the location
		packages[i].location = packages[i].originalLocation;
		
	}
	
}

// Function to update packages
function updatePackages() {
	
	// Look at each package
	for (var i = packages.length - 1; i >= 0; i--) {
		
		// Look at each goal
		for (var j = goals.length - 1; j >= 0; j--) {
			
			// Check that the package exists
			if (packages[i] !== undefined) {
				
				// If the package is on the goal and colours match
				if (overlap(packages[i].location, goals[j].location) && packages[i].id == goals[j].id) {
					
					// Delete the package
					packages.splice(i, 1);
					
				}
			}
		}
	}
}

// Function to check if two points overlap
function overlap(pointOne, pointTwo) {
	
	// Return whether they overlap
	return pointOne.x === pointTwo.x && pointOne.y === pointTwo.y;
	
}

// Create a function to push the packages
function pushPackages(worker) {
	
	// Look at each package
	for (var i = 0; i < packages.length; i++) {
		
		// Check if the current worker has pushed the package
		if (workers[worker].location.x == packages[i].location.x && workers[worker].location.y == packages[i].location.y) {
			
			// Get the current and previous package location
			var currentLocation = workers[worker].path[workers[worker].currentPathLocation];
			var prevLocation = workers[worker].path[workers[worker].currentPathLocation - 1];
			
			// Check whether the direction is negative
			if (workers[worker].currentPathLocation == 0 || (workers[worker].direction < 0 && workers[worker].currentPathLocation < workers[worker].path.length - 1)) {
				prevLocation = workers[worker].path[workers[worker].currentPathLocation + 1];
			}
			
			// Get the x and y direction to move
			var dx = (currentLocation.x - prevLocation.x);
			var dy = (currentLocation.y - prevLocation.y);
			
			// Move the package
			packages[i].location = Point(packages[i].location.x + dx, packages[i].location.y + dy);
			
			// Check if this package has pushed another
			packagePushPackage(i, dx, dy);
			
			// Check if the package has crashed
			packageCrashed(i);

		}
	
	}
	
}

// Function to check if a package has pushed another package
function packagePushPackage(i, dx, dy) {
			
	// Check whether this package has pushed another package
	for (var j = 0; j < packages.length; j++) {
		
		// If we aren't looking at the current package
		if (i !== j) {
			
			// Check if the packages are on the same grid square
			if (packages[i].location.x == packages[j].location.x && packages[i].location.y == packages[j].location.y) {
				
				// Push the package
				packages[j].location = Point(packages[j].location.x + dx, packages[j].location.y + dy);
				
				// Check whether this package has pushed another package
				packagePushPackage(j, dx, dy);
				
				// Check if the package has crashed
				packageCrashed(j);
			}
		}
	}
}

// Function to check whether a package has crashed into a wall
function packageCrashed(p) {
	
	// Look at each wall
	for (var i = 0; i < walls.length; i++) {
		
		// If the package has crashed into a wall
		if (overlap(packages[p].location, walls[i].location)) {
			
			// Crash the game
			crash();
			
		}
		
	}
	
}

// Function to crash the game
function crash() {
			
	// Crash the game
	crashed = true;
	running = false;
	
	// Set the background colour
	backgroundColour = color(255,51,51);
	
	// Re-draw
	draw();
	
}

//Create a function to load in from file
function loadLevel() {
    
    //First create a http request and fetch the file
    openLevel(document.getElementById('levelData').innerHTML);
}

// Function to load level data from a text file
function openLevel(levelText) {
	
	// Create an empty list to hold the packages
	packages = [];
	
	// Create an empty list to hold the goals
	goals = [];
	
	// Create an empty list to hold the walls
	walls = [];
	getBounds();
	
	// Create an empty list of spawners
	spawners = [];
	
	// Load the level data
	var levelData = levelText.split("\n");
	
	// Check the number of packages, goals, spawners and walls
	var noPackages = parseInt(levelData[0]);
	var noGoals = parseInt(levelData[1]);
	var noWalls = parseInt(levelData[2]);
	var noSpawners = parseInt(levelData[3]);
	
	// Get the packages
	for (var i = 4; i < 4 + noPackages; i++) {
		
		// Get the package data
		var packageData = levelData[i].split(" ");
		var x = parseInt(packageData[0]);
		var y = parseInt(packageData[1]);
		var r = parseInt(packageData[2]);
		var g = parseInt(packageData[3]);
		var b = parseInt(packageData[4]);
		var id = parseInt(packageData[5]);
		
		// Create a new package
		packages.push(Package(Point(x,y), color(r,g,b), id));
		
	}
	
	// Get the goals
	for (var i = 4 + noPackages; i < 4 + noPackages + noGoals; i++) {
		
		// Get the goal data
		var goalData = levelData[i].split(" ");
		var x = parseInt(goalData[0]);
		var y = parseInt(goalData[1]);
		var r = parseInt(goalData[2]);
		var g = parseInt(goalData[3]);
		var b = parseInt(goalData[4]);
		var id = parseInt(goalData[5]);
		
		// Create a new package
		goals.push(Goal(Point(x,y), color(r,g,b), id));
		
	}
	
	// Get the walls
	for (var i = 4 + noPackages + noGoals; i < 4 + noPackages + noGoals + noWalls; i++) {
		
		// Get the goal data
		var goalData = levelData[i].split(" ");
		var x = parseInt(goalData[0]);
		var y = parseInt(goalData[1]);
		
		// Create a new package
		walls.push(Wall(Point(x,y)));	
	}
	
	// Get the spawners
	for (var i = 4 + noPackages + noGoals + noWalls; i < 4 + noPackages + noGoals + noWalls + noSpawners; i++) {
		
		// Get the goal data
		var goalData = levelData[i].split(" ");
		var x = parseInt(goalData[0]);
		var y = parseInt(goalData[1]);
		var it = parseInt(goalData[2]);
		var f = parseInt(goalData[3]);
		var dx = parseInt(goalData[4]);
		var dy = parseInt(goalData[5]);
		var r = parseInt(goalData[6]);
		var g = parseInt(goalData[7]);
		var b = parseInt(goalData[8]);
		var id = parseInt(goalData[9]);
		
		// Create a new package
		spawners.push(Spawner(Point(x,y), it, f, Point(dx,dy), color(r,g,b), id));
	}
}