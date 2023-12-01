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
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Archivo de conexión
    include('db_conexion.php');

    // llamada del procedimiento almacenado para obtener todos los usuarios
    $query = "CALL ObtenerUsuarios()";
    $result = $conexion->query($query);

    // Manipular resultado
    $response = array();
    if ($result) {
        while ($fila = $result->fetch_assoc()) {
            $response[] = array(
                'userId' => $fila['userId'],
                'roleId' => $fila['roleId'],
                'firstName' => $fila['firstName'],
                'lastName' => $fila['lastName'],
                'user_name' => $fila['user_name'],
                'password' => $fila['password'],
                'status' => $fila['status']
            );
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

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include('db_conexion.php');

    $data = json_decode(file_get_contents("php://input"), true);
    // Asignar los valores a variables
    $p_roleId = $data['roleId'];
    $p_firstName = $data['firstName'];
    $p_lastName = $data['lastName'];
    $p_user_name = $data['user_name'];
    $p_password = $data['password'];
    $p_createUser = $data['createUser'];
    $p_modifiedUser = $data['modifiedUser'];

    // Llamar al procedimiento almacenado con marcadores de posición
    $query = "CALL RegistrarUsuario(?, ?, ?, ?, ?, ?, ?)";

    // Llamar al procedimiento almacenado
    //$query = "CALL RegistrarUsuario($p_roleId, '$p_firstName', '$p_lastName', '$p_user_name', '$p_password', '$p_createUser', '$p_modifiedUser')";
    $stmt = $conexion->prepare($query);
    $stmt->bind_param("issssss", $p_roleId, $p_firstName, $p_lastName, $p_user_name, $p_password, $p_createUser, $p_modifiedUser);
    $stmt->execute();

    // Obtener resultados si hay alguno
    $result = $stmt->get_result();
    
    // Manejar resultado del procedimiento almacenado
    $response = array();
    
    if ($stmt->affected_rows > 0) {
        $row = $result->fetch_assoc();
        $response['message'] = $row['message'];
    } elseif ($result) {
        // Procesar los resultados si hay alguno
        $row = $result->fetch_assoc();
        $response['message'] = $row['message'];
    } else {
        $response['error'] = "Error en el registro del usuario: " . $stmt->error;
    }
 

    // Cerrar la conexión
    $stmt->close();
    $conexion->close();

    // Devolver respuesta en formato JSON
    header('Content-Type: application/json');
    echo json_encode($response);

} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    

}else {
    // Si la solicitud no es GET, devolver un mensaje de error
    header('HTTP/1.1 405 Method Not Allowed');
    header('Allow: GET, POST, PUT, DELETE');
    echo 'Method Not Allowed';
}
?>