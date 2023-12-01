import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  mostrarAlerta: boolean = false;
  flagAlert: boolean = false;
  msgAlert = '';
  public DataUser: any = {
    user_name: '',
    password: ''
  }

  constructor(private App:UsuarioService, private router:Router){}
  ngOnInit(): void {}

  botonLogin(){
    this.flagAlert = false;
    this.App.login(this.DataUser).subscribe(
      (res:any)=>{
        let result:any = res[0].message;
        if(result === '1'){
          this.msgAlert = "se ha bloqueado tu cuenta, comunicate con el admnistrador";
          this.flagAlert = true;
        } else if (result === '2'){
          this.msgAlert = "Credenciales incorrectas, intento fallido.";
          this.flagAlert = true;
        }else if(result === '3'){
          console.log('bienvenido')
          localStorage.setItem('user', JSON.stringify(this.DataUser));
          window.location.replace('/usuario');
        }
        this.resetForm(); //funcion para limpiar campos
      }
    );
  }


  botonCerrarAlertMessage(){
    this.flagAlert = false;
    this.msgAlert = '';
  }

  resetForm() {
    this.DataUser = {
      user_name: '',
      password: ''
    };

  }

}
