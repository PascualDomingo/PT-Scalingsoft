# PT-Scalingsoft Prueba Técnica
crear frontend, backend y BD con procedimientos y funciones desde Mysql

## Metodos, Rutas y respuestas

### Servidor: localhost
### Puerto: 8000
### Comando para ejecutar en consola de ubuntu: php -S localhost:8000


### USUARIO
#### login
#### RUTA: /test/user/login
#### TIPO: POST
#### BODY:
    {
    "user_name": "kui",
    "password": "secret5"
    }

#### RESPUESTA
##### si el usuario está bloqueado 
    [
        {
            "message": "1"
        }
    ]
##### credenciales incorrectas
    [
        {
            "message": "2"
        }
    ]
##### login correcto
    [
        {
            "message": "3"
        }
    ]

#### ************************************************************************************
#### Todos los usuarios

#### RUTA: /test/user/usuarios
#### TIPO: GUET
#### RESPUESTA:
    [
        {
            "userId": "1",
            "roleId": "1",
            "firstName": "John",
            "lastName": "Snow",
            "user_name": "john",
            "password": "secret",
            "status": "0"
        },
        ...
    ]

#### ************************************************************************************
#### Registro de usuario

#### RUTA: /test/user/registrar
#### TIPO: POST
#### BODY:
    {
        "roleId": 1,
        "firstName": "pasco3",
        "lastName": "Dom3",
        "user_name": "kuin",
        "password": "secret3",
        "createUser": "director",
        "modifiedUser": "director"
    }
#### RESPUSTA:
    {
        "message": "Usuario creado con éxito"
    }

#### RESPUESTA CON ERROR
    {
        "message": "No se pudo crear el usuario"
    }

#### ************************************************************************************
#### Modificar  usuario

#### RUTA: /test/user/modificar
#### TIPO: POST
#### BODY:
    {
        "userId": 3,
        "roleId": 2,
        "firstName": "pascualito",
        "lastName": "Domingo",
        "password": "secret5",
        "modifiedUser": "john"
    }
#### RESPUSTA:
    {
        "message": "Usuario modificado con éxito"
    }

#### RESPUESTA CON ERROR
    {
        "message": "No se pudo modificar el usuario"
    }

#### ************************************************************************************
#### eliminar usuario

#### RUTA: /test/user/eliminar
#### TIPO: POST
#### BODY:
    {
    "userId": 4
    }
#### RESPUSTA:
    {
        "message": "Usuario eliminado con éxito"
    }

#### RESPUESTA CON ERROR
    {
        "message": "No se pudo eliminar el usuario"
    }

#### ************************************************************************************
#### Estado de usuario Bloqueado o Activo

#### RUTA: /test/user/status
#### TIPO: POST
#### BODY:
    {
        "userId": 4
    }
#### RESPUSTA:
    {
        "message": "El estado de usuario fue modificado con éxito"
    }


## ROLES
#### Verifica si es usuario administrador o no

#### RUTA: /test/user/rol
#### TIPO: POST
#### BODY:
    {
        "user_name": "kuin",
        "password": "123"
    }
#### RESPUSTA:
###### retorna 1 si es usuario administrador
    [
        {
            "message": "1"
        }
    ]
#### RESPUSTA:
###### retorna 2 si no es usuario administrador
    [
        {
            "message": "1"
        }
    ]