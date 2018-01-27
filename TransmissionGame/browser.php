<?php

$path = getcwd()."/levels";
$files = array_diff(scandir($path), array(".", ".."));

echo "<h1>LEVELS</h1>";

foreach ($files as $f) {
	
	echo "<li><a href='/play.php?lvl=".$f."'>".$f."</a></li>";
	
}

unser($f);

?>