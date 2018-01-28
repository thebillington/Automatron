<!DOCTYPE html>

<?php

if(isset($_GET['lvl'])) {
	echo "<p style='visibility: hidden;width: 0;' id='levelFile'>/levels/".$_GET['lvl']."</p>";
}
else {
	die("No level selected!");
}

?>

<html style="height: 100%;">

<head>
	
	<title>Automatron</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/p5.js"></script>
    <script src="game.js"></script>

</head>

<body style="height: 100%; margin: 0; display: flex; justify-content: center; align-items: center;">

<div style="position: absolute; top: 1%; text-align: center;">
	<h1 style="margin: 5px;">Play</h1>
	<button onclick="showInstructions()">Instructions</button>
	<a href="/browser.php"><button>Levels</button></a>
</div>
	
<div id="instructions" style="position: absolute; text-align: center; padding: 100px; border: 10px solid black; background-color:white; width: 40%; height: 40%; top: 10%; overflow-y: scroll; visibility: hidden;">

	<h1>Instructions</h1>
	
	<button onclick="closeDialogues()">Close</button>
		
	<h3>Creating automatrons (workers)</h3>
	
	<p>To create an automatron, simply click in the grid square that you would like to place the worker</p>
	
	<img src="http://automatron.co.uk/res/gifs/createWorker.gif" style="display: block; margin: 50px; max-width: 600px; width: 60%; height: auto; margin-left: auto; margin-right: auto;">

	<h3>Selecting a worker</h3>
	
	<p>To select a worker, click on the worker and they will highlight in red</p>
	
	<img src="http://automatron.co.uk/res/gifs/selectWorker.gif" style="display: block; margin: 50px; max-width: 600px; width: 60%; height: auto; margin-left: auto; margin-right: auto;">
	
	<h3>Deselecting a worker</h3>
	
	<p>To select a worker, click on the worker and they will return to their normal colour</p>
	
	<img src="http://automatron.co.uk/res/gifs/deselectWorker.gif" style="display: block; margin: 50px; max-width: 600px; width: 60%; height: auto; margin-left: auto; margin-right: auto;">

	<h3>Drawing a path</h3>
	
	<p>With a worker selected, click on the worker or adjacent to the worker to add to their path</p>
	
	<img src="http://automatron.co.uk/res/gifs/drawPath.gif" style="display: block; margin: 50px; max-width: 600px; width: 60%; height: auto; margin-left: auto; margin-right: auto;">
	
	<p>Note: You must always click on or adjacent to the last grid square added to the path, otherwise you will deselect your worker</p>
	
	<h3>Running the game</h3>
	
	<p>Press the space bar to start the game running. To stop the game running, click anywhere</p>
	
	<img src="http://automatron.co.uk/res/gifs/running.gif" style="display: block; margin: 50px; max-width: 600px; width: 60%; height: auto; margin-left: auto; margin-right: auto;">
	
	<h3>Clearing the path</h3>
	
	<p>With a worker selected, press the c key to clear the path</p>
	
	<img src="http://automatron.co.uk/res/gifs/clear.gif" style="display: block; margin: 50px; max-width: 600px; width: 60%; height: auto; margin-left: auto; margin-right: auto;">
	
	<h3>Deleting a worker</h3>
	
	<p>With a worker selected, press the d key to delete the worker</p>
	
	<img src="http://automatron.co.uk/res/gifs/clear.gif" style="display: block; margin: 50px; max-width: 600px; width: 60%; height: auto; margin-left: auto; margin-right: auto;">
	
	<h1>Types of Worker</h1>
	
	<p>There are two main types of worker:
		<ul>
			<li><a>REVERSED</a></li>
			<li><a>LOOPED</a></li>
		</ul>
	</p>
	
	<h3>Reversed Workers</h3>
	
	<p>A reversed worker will go along its path and when it reaches the end, it will go back in the reverse direction</p>
	
	<img src="http://automatron.co.uk/res/gifs/reversed.gif" style="display: block; margin: 50px; max-width: 600px; width: 60%; height: auto; margin-left: auto; margin-right: auto;">
	
	<p>Note: All workers are reversed by default. To turn a worker into a reversed worker, select it and press the r key</p>
	
	<h3>Looped Workers</h3>
	
	<p>A looped worker will go along its path and when it reaches the end, it will go back along the path again starting from its original location</p>
	
	<img src="http://automatron.co.uk/res/gifs/looped.gif" style="display: block; margin: 50px; max-width: 600px; width: 60%; height: auto; margin-left: auto; margin-right: auto;">
	
	<h3>Creating a looped worker</h3>
	
	<p>To create a looped worker, draw a path that finished on or adjacent to the starting position of the worker, and press the l key</p>
	
	<img src="http://automatron.co.uk/res/gifs/createLooper.gif" style="display: block; margin: 50px; max-width: 600px; width: 60%; height: auto; margin-left: auto; margin-right: auto;">
	
	<p>Note: When a worker is turned into a looper, the colour changes into navy blue</p>
	
	<p>Note: If you keep drawing a path for the worker, if the end of the path is no longer on or adjacent to the start position then the worker will default to reversed</p>
	
	<h1>Moving packages</h1>
	
	<h3>Packets (packages)</h3>
	
	<p>The aim of the game is to transmit (move) packets from their start position to their receiver (goal)</p>
	
	<img src="http://automatron.co.uk/res/gifs/movingPackage.gif" style="display: block; margin: 50px; max-width: 600px; width: 60%; height: auto; margin-left: auto; margin-right: auto;">
	
	<h3>Moving multiple Packets (packages)</h3>
	
	<p>It is possible to move more that one packet at once</p>
	
	<img src="http://automatron.co.uk/res/gifs/movingMultiPackage.gif" style="display: block; margin: 50px; max-width: 600px; width: 60%; height: auto; margin-left: auto; margin-right: auto;">
	
	<h3>Getting packets to their receiver</h3>
	
	<p>If you get a packet to the corresponding receiver, it will be removed from the game</p>
	
	<img src="http://automatron.co.uk/res/gifs/packageToGoal.gif" style="display: block; margin: 50px; max-width: 600px; width: 60%; height: auto; margin-left: auto; margin-right: auto;">
	
	<h1>Spawners</h1>
	
	<h3>Package Spawning</h3>
	
	<p>A spawner will spawn a certain number of packages. You can tell where the package will spawn based on the position of the dot on the spawner itself</p>
	
	<img src="http://automatron.co.uk/res/gifs/spawner.gif" style="display: block; margin: 50px; max-width: 600px; width: 60%; height: auto; margin-left: auto; margin-right: auto;">
	
	<p>Note: This spawner spawned 5 boxes facing down</p>
	
	<h3>Package frequency</h3>
	
	<p>Every spawner will have a frequency for how often it spawns. This is based on how often your character moves</p>
	
	<img src="http://automatron.co.uk/res/gifs/spawnFreq.gif" style="display: block; margin: 50px; max-width: 600px; width: 60%; height: auto; margin-left: auto; margin-right: auto;">
	
	<p>Note: The above spawner has a frequency of 3, meaning it spawns every 3 moves of your automatrons</p>
	
	<h1>Crashes</h1>
	
	<p>The game will crash if one of two things happens:</>
	
	<p><ol><li>You push a package into a wall</li><li>Two automatrons crash</li></ol></p>
	
	<h3>Packages hitting a wall</h3>
	
	<p>If a package collides with a wall the game will immediately crash</p>
	
	<img src="http://automatron.co.uk/res/gifs/crashWall.gif" style="display: block; margin: 50px; max-width: 600px; width: 60%; height: auto; margin-left: auto; margin-right: auto;">
	
	<h3>Automatrons crashing</h3>
	
	<p>The game will also crash if two automatrons occupy the same grid square on the same tick</p>
	
	<img src="http://automatron.co.uk/res/gifs/crashAutomatrons.gif" style="display: block; margin: 50px; max-width: 600px; width: 60%; height: auto; margin-left: auto; margin-right: auto;">
	
	<h3>Fixing a crash</h3>
	
	<p>If the game crashes the background will turn red and the game will pause. To reset, press the space key</p>
	
	<img src="http://automatron.co.uk/res/gifs/reset.gif" style="display: block; margin: 50px; max-width: 600px; width: 60%; height: auto; margin-left: auto; margin-right: auto;">
	
	
	<button onclick="closeDialogues()">Close</button>
	
</div>


	
<div id="winDialogue" style="position: absolute; text-align: center; padding: 100px; border: 10px solid black; background-color:white; width: 40%; height: 40%; top: 10%; overflow-y: scroll; visibility: hidden;">

	<h1>Congratulations!</h1>
	
	<p>You finished the level</p>
	
	<p><a href="browser.php">Level List</a></p>
	
</div>

</body>

</html>
