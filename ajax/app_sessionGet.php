<?php
	$data = array();
	
	if (isset($_COOKIE['abcd'])) {
		foreach ($_COOKIE['abcd'] as $name => $value) {
			$data[] = $value;
		}
	}
	echo json_encode($data);
?>

