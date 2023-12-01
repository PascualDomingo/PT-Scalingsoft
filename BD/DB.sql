
CREATE DATABASE test;
USE test;

CREATE TABLE roles(
    roleId INT AUTO_INCREMENT PRIMARY KEY,
    roleName VARCHAR(100) NOT NULL,
    status TINYINT(1)
);

CREATE TABLE user(
    userId INT AUTO_INCREMENT PRIMARY KEY,
    roleId INT NOT NULL,
    firstName VARCHAR(45),
    lastName VARCHAR(45),
    user_name VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    intento TINYINT NOT NULL,
    status TINYINT(1) NOT NULL,
    createUser VARCHAR(45) NOT NULL,
    createDate DATETIME NOT NULL,
    modifiedUser VARCHAR(45),
    modifiedDate DATETIME NOT NULL
);


INSERT roles(roleName, status) 
VALUES('director', 1);
INSERT roles(roleName, status) 
VALUES('gerente', 1);
INSERT roles(roleName, status) 
VALUES('administrador', 1);
INSERT roles(roleName, status) 
VALUES('desarrollador', 1);
INSERT roles(roleName, status) 
VALUES('QC', 1);
INSERT roles(roleName, status) 
VALUES('diseñador', 1);


--------------------------------------------------------
-------------   PROCEDIMIENTO ALMACENADO ---------------

-- crear usuario
DROP PROCEDURE IF EXISTS RegistrarUsuario;

DELIMITER //
CREATE PROCEDURE RegistrarUsuario(
    IN p_roleId INT,
    IN p_firstName VARCHAR(45),
    IN p_lastName VARCHAR(45),
    IN p_user_name VARCHAR(45),
    IN p_password VARCHAR(45),
    IN p_createUser VARCHAR(45),
    IN p_modifiedUser VARCHAR(45)
)
BEGIN
    DECLARE v_status TINYINT DEFAULT 1; -- 1 para activo, puedes ajustar según tus necesidades
    DECLARE v_intento TINYINT DEFAULT 0; -- Puedes ajustar según tus necesidades
    DECLARE v_createDate DATETIME DEFAULT NOW();
    DECLARE v_mensaje VARCHAR(255);
    
    -- Verificar si el nombre de usuario ya existe
    IF EXISTS (SELECT 1 FROM user WHERE user_name = p_user_name and status = 1) THEN
        SET v_mensaje = 'El nombre de usuario ya está registrado';
    ELSE
        -- Insertar el nuevo usuario
        INSERT INTO user (
            roleId, firstName, lastName, user_name, password,
            intento, status, createUser, createDate, modifiedUser, modifiedDate
        ) VALUES 
            p_roleId, p_firstName, p_lastName, p_user_name, p_password,
            v_intento, v_status, p_createUser, v_createDate, p_modifiedUser, v_createDate
        );
        SET v_mensaje = 'Usuario creado con éxito';
    END IF;
    
    -- Devolver el mensaje
    SELECT v_mensaje AS message;
    
END //
DELIMITER ;

--- modificar usuario
DROP PROCEDURE IF EXISTS ModificarUsuario;

DELIMITER //
CREATE PROCEDURE ModificarUsuario(
    IN p_userId INT,
    IN p_roleId INT,
    IN p_firstName VARCHAR(45),
    IN p_lastName VARCHAR(45),
    IN p_password VARCHAR(45),
    IN p_modifiedUser VARCHAR(45)
)
BEGIN
    DECLARE v_status TINYINT DEFAULT 1;
    DECLARE v_intento TINYINT DEFAULT 0;
    DECLARE v_modifiedDate DATETIME DEFAULT NOW();
    DECLARE v_mensaje VARCHAR(255);

    -- Verificar si el usuario existe
    IF NOT EXISTS (SELECT 1 FROM user WHERE userId = p_userId) THEN
        SET v_mensaje = 'El usuario no existe';
    ELSE
        -- Actualizar información del usuario
        UPDATE user
        SET
            roleId = p_roleId,
            firstName = p_firstName,
            lastName = p_lastName,
            password = p_password,
            modifiedUser = p_modifiedUser,
            modifiedDate = v_modifiedDate
        WHERE userId = p_userId;

        SET v_mensaje = 'Usuario modificado con éxito';
    END IF;

    -- Devolver el mensaje
    SELECT v_mensaje AS message;
    
END //
DELIMITER ;

--- modificar estado usuario
DROP PROCEDURE IF EXISTS statusUsuario;

DELIMITER //
CREATE PROCEDURE statusUsuario(
    IN p_userId INT
)
BEGIN
    DECLARE v_status TINYINT;
    DECLARE v_intento TINYINT;
    DECLARE v_mensaje VARCHAR(255);

    -- Verificar si el usuario existe
    IF NOT EXISTS (SELECT 1 FROM user WHERE userId = p_userId) THEN
        SET v_mensaje = 'El usuario no existe';
    ELSE
        -- Obtener el estado actual del usuario
        SELECT status INTO v_status FROM user WHERE userId = p_userId;

        -- Invertir el estado del usuario
        IF v_status = 0 THEN
            SET v_status = 1;
            SET v_intento = 0;
        ELSE
            SET v_status = 0;
            SET v_intento = 3;
        END IF;

        -- Actualizar información del usuario
        UPDATE user
        SET
            status = v_status, intento = v_intento
        WHERE userId = p_userId;
        SET v_mensaje = 'El estado de usuario fue modificado con éxito';
    END IF;

    -- Devolver el mensaje
    SELECT v_mensaje AS message;
    
END //
DELIMITER ;


--eliminar usuario
DELIMITER //
CREATE PROCEDURE EliminarUsuario(
    IN p_userId INT
)
BEGIN
    DECLARE v_mensaje VARCHAR(255);

    -- Verificar si el usuario existe
    IF NOT EXISTS (SELECT 1 FROM user WHERE userId = p_userId) THEN
        SET v_mensaje = CONCAT('El usuario con ID ', p_userId, ' no existe.');
    ELSE
        -- Eliminar el usuario
        DELETE FROM user WHERE userId = p_userId;
        SET v_mensaje = 'Usuario eliminado con éxito.';
    END IF;
    -- Devolver el mensaje
    SELECT v_mensaje AS message;
END //
DELIMITER ;


--obtener todos los usuarios

DELIMITER //

-- Crear el procedimiento almacenado
CREATE PROCEDURE ObtenerUsuarios()
BEGIN
    -- Sentencia SQL para seleccionar todos los registros de la tabla
    SELECT * FROM user;
END //

-- Restaurar el delimitador
DELIMITER ;


--------------------------------------------------------
-----------------   FUNCIONES  -------------------------

-- funcion para validar el login

DELIMITER //
CREATE FUNCTION validar_login(p_username VARCHAR(45), p_password VARCHAR(45)) RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE num_intentos INT;
    DECLARE existe_usuario BOOLEAN;
    
    -- Obtener el número actual de intentos para el usuario
    SELECT intento INTO num_intentos
    FROM user
    WHERE user_name = p_username;
    
    -- Verificar si el usuario está bloqueado
    -- Devuelve 1 si el usuario se encuentra bloqueado
    IF num_intentos >= 3 THEN
        -- Usuario bloqueado
        -- Actualiza el estado del usuario, estado bloqueado
        -- usuario bloqueado:0, usuario desbloqueado:1
        UPDATE user
        SET status = 0
        WHERE user_name = p_username;

        RETURN 1;
    END IF;

    -- Verificar si el usuario y la contraseña coinciden
    SELECT COUNT(*) INTO existe_usuario
    FROM user
    WHERE user_name = p_username AND password = p_password;

    -- Incrementar el número de intentos si el inicio de sesión falla
    IF NOT existe_usuario THEN
        UPDATE user
        SET intento = num_intentos + 1
        WHERE user_name = p_username;
    ELSE
        -- Restablecer el contador de intentos si el inicio de sesión tiene éxito
        UPDATE user
        SET intento = 0
        WHERE user_name = p_username;
    END IF;

    -- Devolver 2 si las credenciales son incorrectas, 3 si son correctas
    IF NOT existe_usuario THEN
        RETURN 2;
    ELSE
        RETURN 3;
    END IF;
    
END //
//
DELIMITER ;


-- Funcion para validar si el usuario logueado es Administrador
DELIMITER //
CREATE FUNCTION validar_usuarioAdmin(p_username VARCHAR(45), p_password VARCHAR(45)) RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DECLARE v_roleName VARCHAR(100);
    
    -- Obtiene el rol del usuario
    SELECT roleName INTO v_roleName 
    FROM user u
    INNER JOIN roles r ON r.roleId = u.roleId
    WHERE u.user_name = p_username AND u.password = p_password;

    -- Devolver true si el rol es 'administrador', false en caso contrario
    RETURN v_roleName = 'administrador';
    
END //
//
DELIMITER ;


