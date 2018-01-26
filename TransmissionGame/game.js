// Store the canvas size
var canvasSize = 600;

// Store the number of grid squares
var gridSquares = 20;

// Store the individual grid dimensions
var gridSquareSize;

// Setup function run before game starts
function setup() {
		
	// Create a canvas
	createCanvas(canvasSize, canvasSize);
	
	// Set the grid size
	gridSquareSize = canvasSize / gridSquares;
		
}

// Render function
function draw() {
	
	// Call the function to draw the grid
	drawGrid();
	
}

// Function to draw a grid
function drawGrid() {
	
	// For each row
	for (var i = 0; i < gridSquares; i++) {
		
		// For each column
		for (var j = 0; j < gridSquares; j++) {
			
			// Calculate the x and y
			var x = i * gridSquareSize;
			var y = j * gridSquareSize;
			
			// Draw the quad
			quad(x,y, x+gridSquareSize,y, x+gridSquareSize,y+gridSquareSize, x,y+gridSquareSize);
			
		}
		
	}
	
}