<?php

include('db_conexion.php');
//include('consultas.php');

// Verificar si la conexión fue exitosa
/*
if ($conexion) {
    echo "¡Conexión exitosa!";
    // Puedes realizar otras operaciones aquí si la conexión es exitosa
} else {
    echo "No se pudo establecer la conexión.";
}

*/


// Obtén la ruta de la URL después del nombre de dominio
$uri = $_SERVER['REQUEST_URI'];

// Elimina el posible nombre del archivo (puede variar según tu configuración de servidor)
$baseDir = str_replace(basename($_SERVER['SCRIPT_NAME']), '', $_SERVER['SCRIPT_NAME']);
$uri = str_replace($baseDir, '/', $uri);

// Divide la URL en segmentos
$segments = explode('/', $uri);

// Filtra los segmentos vacíos
$segments = array_filter($segments);

// Manejar diferentes endpoints
if (count($segments) > 0) {
    $endpoint = $segments[1];
    switch ($endpoint) {
        case 'test':
            // Subruta después de 'test'
            
            if (count($segments) > 1) {
                $subEndpoint = $segments[2];

                switch ($subEndpoint) {
                    case 'roles':
                        // Subruta después de 'roles'
                        if (count($segments) > 2) {
                            $subSubEndpoint = $segments[3];

                            switch ($subSubEndpoint) {
                                case 'allroles':
                                    include('consultasRoles.php');
                                    break;

                                default:
                                    echo 'Sub-subendpoint de roles no válido';
                                    break;
                            }
                        } else {
                            echo 'Falta sub-subendpoint después de "roles"';
                        }
                        break;

                    case 'user':
                        // Subruta después de 'user'
                        if (count($segments) > 2) {
                            $subSubEndpoint = $segments[3];

                            switch ($subSubEndpoint) {
                                case 'registrar':
                                    include('consultaUser.php');
                                    break;
                                case 'modificar':
                                    include('modificarUser.php');
                                    break;
                                case 'eliminar':
                                    include('eliminarUser.php');
                                    break;
                                case 'usuarios':
                                    include('consultaUser.php');
                                    break;
                                case 'status':
                                    include('statusUser.php');
                                    break;
                                case 'login':
                                    include('login.php');
                                    break;
                                case 'rol':
                                    include('consultaRolAdmin.php');
                                    break;

                                default:
                                    echo 'Sub-subendpoint de user no válido';
                                    break;
                            }
                        } else {
                            echo 'Falta sub-subendpoint después de "user"';
                        }
                        
                        break;

                    default:
                        echo 'Subendpoint no válido después de "test"';
                        break;
                }
            } else {
                echo 'Falta subruta después de "test"';
            }
            break;

        default:
            echo 'Endpoint no válido';
            break;
    }
} else {
    echo 'Falta el endpoint principal';
}


?>