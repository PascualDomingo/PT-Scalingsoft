<?php

// Permitir solicitudes desde cualquier dominio
header("Access-Control-Allow-Origin: *");
// Permitir solicitudes con los siguientes métodos HTTP
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
// Permitir incluir cookies en las solicitudes (si es necesario)
header("Access-Control-Allow-Credentials: true");
// Establecer el tipo de contenido para la respuesta
header("Content-Type: application/json");


// Verificar que la solicitud sea GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Archivo de conexión
    include('db_conexion.php');

    // Consulta a la tabla roles
    $query = "SELECT * FROM roles";
    $result = $conexion->query($query);

    // Manipular resultado
    $response = array();
    if ($result) {
        while ($fila = $result->fetch_assoc()) {
            $response[] = array('rol' => $fila['roleName'], 'id' => $fila['roleId']);
        }

        // Liberar resultado
        $result->free();
    } else {
        $response['error'] = "Error en la consulta: " . $conexion->error;
    }

    // Cerrar la conexión
    $conexion->close();

    // Devolver respuesta en formato JSON
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    // Si la solicitud no es GET, devolver un mensaje de error
    header('HTTP/1.1 405 Method Not Allowed');
    header('Allow: GET');
    echo 'Method Not Allowed';
}
?>
