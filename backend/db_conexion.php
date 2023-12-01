<?php
// Datos de conexión a la base de datos
$host = "127.0.0.1";
$port = 3307;
$username = "root";
$password = "root@cunocdev";
$bd = "test";

//crear la conexion
$conexion = new mysqli($host, $username, $password, $bd, $port);

//verificando conexion
if($conexion->connect_error){
    die("Error de conexión: " . $conexion->connect_error);
}


?>