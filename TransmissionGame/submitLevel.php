<!DOCTYPE html>

<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	
	if(isset($_POST['levelData']) && isset($_POST['levelName'])) {
		
		$levelName = str_replace(" ", "", $_POST['levelName']);
		
		$path = getcwd()."/levels/tutorial";
		
		$files = array_diff(scandir($path), array(".", ".."));
		
		$exists = False;

		foreach ($files as $f) {
			
			if (str_replace(".txt","",$f) == $levelName) {
				$exists = True;
			}
			
		}
		
		$path = getcwd()."/levels/campaign";

		$files = array_diff(scandir($path), array(".", ".."));

		foreach ($files as $f) {
			
			if (str_replace(".txt","",$f) == $levelName) {
				$exists = True;
			}
			
		}
		
		$path = getcwd()."/levels/community";

		$files = array_diff(scandir($path), array(".", ".."));

		foreach ($files as $f) {
			
			if (str_replace(".txt","",$f) == $levelName) {
				$exists = True;
			}
			
		}
		
		if (!$exists) {
			
			$levelFile = fopen(getcwd()."/levels/community/".$levelName.".txt", "w") or die("Failed to create level. Try again later...");
			fwrite($levelFile, $_POST['levelData']);
			fclose($levelFile);
			
			echo "<p>LEVEL CREATED SUCCESSFULLY<br/><a href='browser.php?=community'>Levels</a></p>";
			
		}
		else {
			
			echo "<p>Sorry a level with that name already exists. Go <a href='browser.php'>here</a> to search for a name that isn't taken!</p>";
			
		}
		
	}
	else {
		die('You must have got here by mistake!');
	}
	
}
else {
	die('You must have got here by mistake!');
}

?>

<html style="height: 100%;">

<head>
	
	<title>Automatron</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.6.0/p5.js"></script>
    <script src="testGame.js"></script>

</head>

<div style="position: absolute; top: 1%; text-align: center;">
	<h1 style="margin: 5px;">Test Level</h1>
</div>

<body style="height: 100%; margin: 0; display: flex; justify-content: center; align-items: center;">

</body>

</html>