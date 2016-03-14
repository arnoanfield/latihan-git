<?php

require_once '../config.php';

$conn = new PDO("mysql:host=$db_hostname;dbname:$db_name", $db_username,$db_password, array(
	PDO::ATTR_ERRMODE => 	PDO::ERRMODE_EXCEPTION
));

$str = $_SERVER['QUERY_STRING'];
$val = explode('~',$str);
$command = $val[0];
$data = array();

if (isset($command)){
	switch ($command) {
		case 'login':
			session_start();
			$nama=$val[1];
			$pass=md5($val[2]);
			$check=$val[3];

			$query= $conn->prepare("SELECT username,password from abcd.tbl_user WHERE username='$nama' and password='$pass'");
			$query->execute();

			while ($row=$query->fetch(PDO::FETCH_ASSOC)){
				$data = array(
					'status' => 'ok', 
					'username' => $nama,
					'remember' => $check
					);
				
			}
			break;

		case 'logout':
			$data = array('logout' => 'success' );
			session_destroy();
			break;
	}
	echo json_encode($data);

}

?>