<!DOCTYPE html>

<html style="background-color: #B5D3E7">

<head>
	<title>Automatron</title>
    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Old+Standard+TT">
	<link rel="stylesheet "type="text/css" href="style/lists.css">

	<script>
	function search() {
		
		window.location.replace("browser.php?s=" + document.getElementById('searchBar').value);
		
	}
	</script>
</head>

<body style="position: absolute; font-family: 'Old Standard TT'; font-decoration: bold; overflow-x: hidden; width: 80%; margin: 0; margin-top: 5%; height: 100%; left: 10%;">

	<div style="position: absolute; top:0; right: 0; padding: 5px; z-index: 1;">
	
		<p>Search: <input id="searchBar" placeholder="Search..."> <button onclick="search()">Search</button></p>
	
	</div>

	<div style="position: absolute; margin-bottom: 100px; font-weight: bold; width: 70%; padding: 15%; padding-top: 5%; text-align: justify; justify-content: center; border: 5px solid black; background-color: white;">

		<a href="/automatron"><img src="/automatron/res/automatron.png" style="display: block; max-width: 800px; width: 70%; height: auto; margin-left: auto; margin-right: auto;"></a>
	
<?php

if(isset($_GET['t'])) {
	
	if(isset($_GET['s'])) {
	
		$path = getcwd()."/levels/".$_GET['t'];
		
		$files = array_diff(scandir($path), array(".", ".."));

		echo "<h1>".ucwords($_GET['t'])." Levels</h1>";
		
		echo "<ul>";

		foreach ($files as $f) {
			
			if(strpos(strtoupper($f), strtoupper($_GET['s'])) !== false) {
			
				echo "<li><a href='/automatron/play.php?lvl=".$_GET['t']."/".str_replace(".txt","",$f)."'>".$f."</a></li>";
			
			}
			
		}
	
	}
	
	else {
		
		$path = getcwd()."/levels/".$_GET['t'];
		
		$files = array_diff(scandir($path), array(".", ".."));

		echo "<h1>".ucwords($_GET['t'])." Levels</h1>";
		
		echo "<ul>";

		foreach ($files as $f) {
		
			echo "<li><a href='/automatron/play.php?lvl=".$_GET['t']."/".$f."'>".str_replace(".txt","",$f)."</a></li>";
			
		}
	}
}
else {
	
	if(isset($_GET['s'])) {
	
		$path = getcwd()."/levels/tutorial";

		$files = array_diff(scandir($path), array(".", ".."));

		echo "<h1>All Levels</h1>";
		
		echo "<ul>";

		foreach ($files as $f) {
			
			if(strpos(strtoupper($f), strtoupper($_GET['s'])) !== false) {
			
				echo "<li><a href='/automatron/play.php?lvl=tutorials/".$f."'>".str_replace(".txt","",$f)."</a></li>";
			
			}
			
		}
		
		$path = getcwd()."/levels/campaign";

		$files = array_diff(scandir($path), array(".", ".."));

		foreach ($files as $f) {
			
			if(strpos(strtoupper($f), strtoupper($_GET['s'])) !== false) {
			
				echo "<li><a href='/automatron/play.php?lvl=campaign/".$f."'>".str_replace(".txt","",$f)."</a></li>";
			
			}
			
		}
		
		$path = getcwd()."/levels/community";

		$files = array_diff(scandir($path), array(".", ".."));

		foreach ($files as $f) {
			
			if(strpos(strtoupper($f), strtoupper($_GET['s'])) !== false) {
			
				echo "<li><a href='/automatron/play.php?lvl=community/".$f."'>".str_replace(".txt","",$f)."</a></li>";
			
			}
			
		}
	}
	else {
		$path = getcwd()."/levels/tutorial";

		$files = array_diff(scandir($path), array(".", ".."));

		echo "<h1>All Levels</h1>";
		
		echo "<ul>";

		foreach ($files as $f) {
			
			echo "<li><a href='/automatron/play.php?lvl=tutorials/".$f."'>".str_replace(".txt","",$f)."</a></li>";
			
		}
		
		$path = getcwd()."/levels/campaign";

		$files = array_diff(scandir($path), array(".", ".."));

		foreach ($files as $f) {
			
			echo "<li><a href='/automatron/play.php?lvl=campaign/".$f."'>".str_replace(".txt","",$f)."</a></li>";
			
		}
		
		$path = getcwd()."/levels/community";

		$files = array_diff(scandir($path), array(".", ".."));

		foreach ($files as $f) {
			
			echo "<li><a href='/automatron/play.php?lvl=community/".$f."'>".str_replace(".txt","",$f)."</a></li>";
			
		}
	}
	echo "</ul>";
}

unset($f);

?>

</div>

</body>

</html>