import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {
  public roles: any = null;
  public usuarios: any = null;
  flag_admin:boolean = false;
  color: string = "alert-primary";
  mostrarAlerta: boolean = false;
  flagAlert: boolean = false;
  flagInputUsername: boolean = false;
  msgAlert = '';

  public DataUser: any = {
    userId: 0,
    firstName: '',
    lastName: '',
    roleId: 0,
    user_name: '',
    password: '',
    createUser: '',
    modifiedUser: ''
  };

  public credenciales_user: any = {
    user_name: '',
    password: ''
  };


  constructor(private App: UsuarioService, private router: Router) { }

  //este metodo inicia al momento de entrar o recargar la página
  ngOnInit(): void {

    //validar login
    //si no está logueado reenvia la pagina a login
    if(!this.App.validarLogin()){
      window.location.replace('/login');
    }

    //recupera todos los roles
    this.App.getRoles().subscribe(
      (res: any) => {
        this.roles = res;
        //console.log(this.roles);
      }
    );

    //obtener todos los usuarios
    this.App.getUsuarios().subscribe(
      (res: any) => {
        this.usuarios = res;
        //console.log(this.usuarios);
      }
    );

    //recuperar datos del usuario logueado
    let userData = localStorage.getItem('user');
    this.credenciales_user = userData ? JSON.parse(userData) : null;

    //si el usuario logueado es administrador, se habilitarán botones para modificar estados de usuarios
    //devuelve un Json { message: 0} si es 0 no es admin y de lo contrario es 1
    this.App.validar_rol_usuario(this.credenciales_user).subscribe(
      (res:any)=>{
        if(res[0].message === '1'){
          this.flag_admin = true;
        }else{
          this.flag_admin = false;
        }
      }
    );

  }

  //funcion que sirve para bloquear o desbloquear el usuario
  botonCambiarEstado(id: any) {
    let data = { userId: id }

    this.App.actualizarStatusUser(data).subscribe(
      (res: any) => {
        //this.msgAlert = res.message;
        //this.flagAlert = true;
        console.log(res)
        window.location.reload();
      }
    );

  }

  //funcion que modifica datos del usuario
  botonModificarUsuario(id: any) {
    this.usuarios.forEach((element: any) => {
      if (element.userId === id) {
        this.DataUser = {
          userId: element.userId,
          roleId: element.roleId,
          firstName: element.firstName,
          lastName: element.lastName,
          user_name: element.user_name,
          password: element.password,
        }

        //daja inactivo el input del username para no poder modificar
        this.flagInputUsername = true;
      }
    });
  }

  //esta funcion sirve para eliminar el usuario, se envia el id por parametro
  botonEliminarUsuario(id: any) {
    let dato = { userId: id }
    this.App.eliminarUsuario(dato).subscribe(
      (res: any) => {
        this.msgAlert = res.message;
        this.flagAlert = true;
      }
    );
  }

  //funcion para guardar cambios de un usuario o para crear un nuevo usuario
  botonGuardarDatoUser() {
    if (this.DataUser.roleId == 0) {
      this.msgAlert += 'Error: Debe seleccionar un rol <br>';
      this.flagAlert = true;
    }

    if (this.DataUser.user_name == '' || this.DataUser.password == '') {
      this.msgAlert += 'Error: el campo nombre de usuario y contraseña son obligatorios';
      this.flagAlert = true;
    }

    if (this.DataUser.userId !== 0) {
      if (!this.flagAlert) {
        this.modificarDatoUsuario(this.DataUser);
        this.resetForm();
      }

    } else {


      if (!this.flagAlert) {
        this.DataUser.createUser = this.credenciales_user.user_name;
        this.DataUser.modifiedUser = this.credenciales_user.user_name;
        this.App.registrarUsuario(this.DataUser).subscribe(
          (res: any) => {
            this.msgAlert = res.message;
            this.flagAlert = true;
          }
        );
        this.resetForm();
      }
    }


  }

  //se envia datos del usuario por parámetro
  modificarDatoUsuario(user: any) {
    let datos = {
      userId: user.userId,
      roleId: user.roleId,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      modifiedUser: this.credenciales_user.user_name
    }

    this.App.modificarUser(datos).subscribe(
      (res: any) => {
        this.msgAlert = res.message;
        this.flagAlert = true;
      }
    );

  }

  //esta funcion srive para cerrar una alerta emergente, cuando la cierra cambia el estado del bool
  cerrarAlertMessage() {
    this.flagAlert = false;
    this.msgAlert = '';
    window.location.reload();
  }

  //funcion para resetear campos
  resetForm() {
    this.DataUser = {
      firstName: '',
      lastName: '',
      roleId: 0,
      user_name: '',
      password: '',
      userId: 0
    };

    //despues de modificar, se activa el input
    this.flagInputUsername = false;
  }

}
