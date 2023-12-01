<?php

// Permitir solicitudes desde cualquier dominio
header("Access-Control-Allow-Origin: *");
// Permitir solicitudes con los siguientes métodos HTTP
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Permitir incluir cookies en las solicitudes (si es necesario)
header("Access-Control-Allow-Credentials: true");
// Establecer el tipo de contenido para la respuesta
header("Content-Type: application/json");

// Manejar la solicitud OPTIONS y salir del script
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
}

// Verificar que la solicitud sea GET
 if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include('db_conexion.php');

    $data = json_decode(file_get_contents("php://input"), true);
    // Asignar los valores a variables
    $p_user_name = $data['user_name'];
    $p_password = $data['password'];

    // Consulta SQL para llamar a la función
    $query = "SELECT validar_login('$p_user_name', '$p_password') AS login_valido";
    $resultado = $conexion->query($query);


    // Manipular resultado
    $response = array();
    // Verificar si la consulta fue exitosa
    if ($resultado) {
        // Obtener el resultado
        $fila = $resultado->fetch_assoc();

        // Verificar el resultado de la función
        $response[] = array('message' => $fila['login_valido']);

    } else {
        $response['error'] = "Error en la consulta: " . $conexion->error;
    }

    // Cerrar la conexión
    $conexion->close();

    // Devolver respuesta en formato JSON
    header('Content-Type: application/json');
    echo json_encode($response);

}else {
    // Si la solicitud no es GET, devolver un mensaje de error
    header('HTTP/1.1 405 Method Not Allowed');
    header('Allow: GET, POST, PUT, DELETE');
    echo 'Method Not Allowed';
}
?>