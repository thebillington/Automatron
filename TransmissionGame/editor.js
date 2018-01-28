// Store the canvas size
var canvasSize = 600;

// Store the number of grid squares
var gridSquares = 22;

// Store the individual grid dimensions
var gridSquareSize;

// Create a list of packages
var packages;

// List to hold the walls
var walls;

// List to hold the goals
var goals;

// List to hold all of the crate spawners
var spawners;

// Keys
var D_KEY = 68;
var G_KEY = 71;
var P_KEY = 80;
var S_KEY = 83;
var W_KEY = 87;

// Store the current object list
var currentObjectList;

// Store the current object
var currentObject;

// Store the creation tool selection
var creationSelection;

// Setup function run before game starts
function setup() {
	
	// Create a canvas
	createCanvas(canvasSize, canvasSize);
	
	// Set the background colour to white
	backgroundColour = color(255);
	
	// Set the grid size
	gridSquareSize = canvasSize / gridSquares;
	
	// Create an empty list to hold the packages
	packages = [];
	
	// Create an empty list to hold the goals
	goals = [];
	
	// Create an empty list to hold the walls
	walls = [];
	
	// Create an empty list of spawners
	spawners = [];
	
	// Add some boundary walls
	getBounds();
	
	// Initialise current objects
	currentObjectList = null;
	currentObject = -1;
	
	// By default select walls
	creationSelection = "WALL";
	
	// Set the frame rate
	frameRate(5);
		
}

// Render function
function draw() {
	
	// Clear the canvas
	clear();

	// Call the function to draw the grid
	drawGrid();

	// Draw the walls
	drawWalls();

	// Draw the goals
	drawGoals();
	
	// Draw the spawners
	drawSpawners();

	// Draw the packages
	drawPackages();
	
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

// Function to draw the packages
function drawPackages() {
	
	// Look at each package
	for (var i =0; i < packages.length; i++) {
		
		// Get the colour
		var colour = packages[i].colour;
	
		// Check if we have a package selected
		if (currentObject == i && currentObjectList == packages) {
		
			// Set the colour to red
			colour = color(255, 0, 0);
		
		}
	
		// Draw the package
		drawGridSquare(packages[i].location.x, packages[i].location.y, colour);
	
	}
	
}

// Function to draw the goals
function drawGoals() {
	
	// For each goal
	for (var i = 0; i < goals.length; i++) {
		
		// Get the colour
		var colour = goals[i].colour;
	
		// Check if we have a goal selected
		if (currentObject == i && currentObjectList == goals) {
		
			// Set the colour to red
			colour = color(255, 0, 0);
		
		}
		
		// Draw the goal
		drawGoal(goals[i].location.x, goals[i].location.y, colour);
		
	}
	
}

// Function to draw the walls
function drawWalls() {
	
	// Look at each wall
	for (var i = 0; i < walls.length; i++) {
		
		// Get the colour
		var colour = color(0);
	
		// Check if we have a goal selected
		if (currentObject == i && currentObjectList == walls) {
		
			// Set the colour to red
			colour = color(255, 0, 0);
		
		}
		
		// Draw the wall
		drawGridSquare(walls[i].location.x, walls[i].location.y, colour);
		
	}
	
}

// Function to draw the spawners
function drawSpawners() {
	
	// For each spawner
	for (var i = 0; i < spawners.length; i++) {
		
		// Get the colour
		var colour = spawners[i].colour;
	
		// Check if we have a goal selected
		if (currentObject == i && currentObjectList == spawners) {
		
			// Set the colour to red
			colour = color(255, 0, 0);
		
		}
		
		// Draw the spawner
		drawSpawner(spawners[i].location.x, spawners[i].location.y, colour, spawners[i].direction.x, spawners[i].direction.y);
		
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
function mouseReleased() {
	
	// Check there is no dialogue open
	if (dialoguesClosed()) {
	
		// Check that the mouse click is in the grid
		if (!((mouseX >= 0 && mouseX <= canvasSize) && (mouseY >= 0 && mouseY <= canvasSize))) {
			
			// Return
			return;
			
		}
		
		// Get the x and y
		var x = Math.floor(mouseX / gridSquareSize);
		var y = Math.floor(mouseY / gridSquareSize);

		// Check the mouse button
		if (mouseButton === LEFT) {
			
			// If we haven't got an object selected
			if (currentObject == -1) {
			
				// Check whether we have clicked on an object
				if (!objectAtLocation(x, y)) {
						
					// Check what we are currently creating
					switch(creationSelection) {
						
						// Walls
						case "WALL":
						
							// Add a new wall
							walls.push(Wall(Point(x,y)));
							break;
							
						// Spawners
						case "SPAWNER":
						
							// Show the spawner dialogue
							showSpawnerDialogue(x, y);
							break;
							
						// Packages
						case "PACKAGE":
						
							// Open the package creation dialogue
							showPackageDialogue(x, y);
							break;
							
						// Goals
						case "GOAL":
						
							// Open the goal creation dialogue
							showGoalDialogue(x,y);
							break;
							
					}
				}
			}
			else {
				
				// Deselect the current object
				currentObject = -1;
				currentObjectList = null;
				
			}
		}
	}
}

// Function to show the spawner dialogue
function showSpawnerDialogue(x, y) {
	
	// Show the dialogue
	document.getElementById('spawnerX').value = ""+x;
	document.getElementById('spawnerY').value = ""+y;
	document.getElementById('spawnDialogue').style.visibility = "visible";
	
}

// Function to show the spawner dialogue
function showPackageDialogue(x, y) {
	
	// Show the dialogue
	document.getElementById('packageX').value = ""+x;
	document.getElementById('packageY').value = ""+y;
	document.getElementById('packageDialogue').style.visibility = "visible";
	
}

// Function to show the spawner dialogue
function showGoalDialogue(x, y) {
	
	// Show the dialogue
	document.getElementById('goalX').value = ""+x;
	document.getElementById('goalY').value = ""+y;
	document.getElementById('goalDialogue').style.visibility = "visible";
	
}

// Function to show the instructions
function showInstructions() {
	
	// Show the instructions
	document.getElementById('instructions').style.visibility = "visible";
	
}

// Function to close all dialogues
function closeDialogues() {
	
	// Close the dialogues
	document.getElementById('spawnDialogue').style.visibility = "hidden";
	document.getElementById('packageDialogue').style.visibility = "hidden";
	document.getElementById('goalDialogue').style.visibility = "hidden";
	document.getElementById('instructions').style.visibility = "hidden";
	
}

// Function to check if all dialogues are closed
function dialoguesClosed() {
	
	//Check the spawner
	if (document.getElementById('spawnDialogue').style.visibility != "hidden") {
		return false;
	}
	if (document.getElementById('packageDialogue').style.visibility != "hidden") {
		return false;
	}
	if (document.getElementById('goalDialogue').style.visibility != "hidden") {
		return false;
	}
	return true;
	
}

// Function to create a spawner
function createSpawner() {
	
	// Get all of the attributes
	var x = parseInt(document.getElementById('spawnerX').value);
	var y = parseInt(document.getElementById('spawnerY').value);
	var r = parseInt(document.getElementById('spawnerR').value);
	var g = parseInt(document.getElementById('spawnerG').value);
	var b = parseInt(document.getElementById('spawnerB').value);
	var f = parseInt(document.getElementById('freq').value);
	var i = parseInt(document.getElementById('items').value);
	var direction = document.getElementById('direction').value.split(' ');
	var dx = parseInt(direction[0]);
	var dy = parseInt(direction[1]);
	var id = parseInt(document.getElementById('spawnerID').value);
	
	// Create the spawner
	spawners.push(Spawner(Point(x,y), i, f, Point(dx,dy), color(r,g,b), id)); 
	
	// Close dialogues
	closeDialogues();
	
}

// Function to create a package
function createPackage() {
	
	// Get all of the attributes
	var x = parseInt(document.getElementById('packageX').value);
	var y = parseInt(document.getElementById('packageY').value);
	var r = parseInt(document.getElementById('packageR').value);
	var g = parseInt(document.getElementById('packageG').value);
	var b = parseInt(document.getElementById('packageB').value);
	var id = parseInt(document.getElementById('packageID').value);
	
	// Create the spawner
	packages.push(Package(Point(x,y), color(r,g,b), id));
	
	// Close dialogues
	closeDialogues();
	
}

// Function to create a package
function createGoal() {
	
	// Get all of the attributes
	var x = parseInt(document.getElementById('goalX').value);
	var y = parseInt(document.getElementById('goalY').value);
	var r = parseInt(document.getElementById('goalR').value);
	var g = parseInt(document.getElementById('goalG').value);
	var b = parseInt(document.getElementById('goalB').value);
	var id = parseInt(document.getElementById('goalID').value);
	
	// Create the spawner
	goals.push(Goal(Point(x,y), color(r,g,b), id));
	
	// Close dialogues
	closeDialogues();
	
}

// Function to check whether we have collided with an object
function objectAtLocation(x,y) {
	
	// Check if have collided with any package
	for (var i = 0; i < packages.length; i++) {
		
		// Check whether we have clicked a package
		if (overlap(packages[i].location, Point(x, y))) {
			
			// Select the package
			currentObject = i;
			currentObjectList = packages;
			return true;
			
		}
	}
	// Check if have collided with any spawner
	for (var i = 0; i < spawners.length; i++) {
		
		// Check whether we have clicked a spawner
		if (overlap(spawners[i].location, Point(x, y))) {
			
			// Select the spawner
			currentObject = i;
			currentObjectList = spawners;
			return true;
			
		}
	}
	// Check if have collided with any wall
	for (var i = 0; i < walls.length; i++) {
		
		// Check whether we have clicked a wall
		if (overlap(walls[i].location, Point(x, y))) {
			
			// Select the wall
			currentObject = i;
			currentObjectList = walls;
			return true;
			
		}
	}
	// Check if have collided with any goal
	for (var i = 0; i < goals.length; i++) {
		
		// Check whether we have clicked a goal
		if (overlap(goals[i].location, Point(x, y))) {
			
			// Select the goal
			currentObject = i;
			currentObjectList = goals;
			return true;
			
		}
	}
	// Return false
	return false;
	
}

// Function to deal with key presses
function keyPressed() {
	
	// Check there is no dialogue open
	if (dialoguesClosed()) {
	
		// Check if it was the D keyPressed
		if (keyCode == D_KEY) {
			
			// Check if we have an object selected
			if (currentObject !== -1) {
				
				// Delete the object
				currentObjectList.splice(currentObject, 1);
				currentObject = -1;
				
			}
		}

		// Check is the w key was pressed
		if (keyCode == W_KEY) {
			
			// Select the wall tool
			creationSelection = "WALL";
			
		}

		// Check is the s key was pressed
		if (keyCode == S_KEY) {
			
			// Select the spawn tool
			creationSelection = "SPAWNER";
			
		}

		// Check is the p key was pressed
		if (keyCode == P_KEY) {
			
			// Select the package tool
			creationSelection = "PACKAGE";
			
		}

		// Check is the g key was pressed
		if (keyCode == G_KEY) {
			
			// Select the goal tool
			creationSelection = "GOAL";
			
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

// Function to check if two points overlap
function overlap(pointOne, pointTwo) {
	
	// Return whether they overlap
	return pointOne.x === pointTwo.x && pointOne.y === pointTwo.y;
	
}

// Function to test the level
function testLevel() {
	
	// Get the levels text
	document.getElementById('testLevelData').value = getLevelData();
	
}

// Function to get the level data
function getLevelData() {
	
	// Create an empty string to store the level data
	var levelData = "";
	
	// Get the attribute numbers
	levelData += packages.length + "\n" + goals.length + "\n" + (walls.length - 88) + "\n" + spawners.length;
	
	// Look at each package
	for (var i = 0; i < packages.length; i++) {
		
		// Add the package data
		levelData += "\n" + packages[i].location.x + " " + packages[i].location.y + " " + packages[i].colour.levels[0] + " " + packages[i].colour.levels[1] + " " + packages[i].colour.levels[2] + " " + packages[i].id;
		
	}
		
	// Look at each goal
	for (var i = 0; i < goals.length; i++) {
		
		// Add the package data
		levelData += "\n" + goals[i].location.x + " " + goals[i].location.y + " " + goals[i].colour.levels[0] + " " + goals[i].colour.levels[1] + " " + goals[i].colour.levels[2] + " " + goals[i].id;
		
	}
		
	// Look at each wall
	for (var i = 88; i < walls.length; i++) {
		
		// Add the package data
		levelData += "\n" + walls[i].location.x + " " + walls[i].location.y;
		
	}
		
	// Look at each spawner
	for (var i = 0; i < spawners.length; i++) {
		
		// Add the package data
		console.log(spawners[i].colour);
		console.log(spawners[i].colour.levels);
		levelData += "\n" + spawners[i].location.x + " " + spawners[i].location.y + " " + spawners[i].items + " " + spawners[i].frequency + " " + spawners[i].direction.x + " " + spawners[i].direction.y + " " + spawners[i].colour.levels[0] + " " + spawners[i].colour.levels[1] + " " + spawners[i].colour.levels[2] + " " + spawners[i].id;
		
	}
	
	// Set the level data as the form data to send to the testLevel script
	document.getElementById('testLevelData').value = levelData;
	
	// Send the form
	document.getElementById('submitTestLevel').submit();
	
}