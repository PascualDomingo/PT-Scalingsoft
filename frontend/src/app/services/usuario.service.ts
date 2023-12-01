import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL = "http://localhost:8000"

  constructor(private http: HttpClient) { }

  getRoles(){
    return this.http.get(`${this.URL}/test/roles/allroles`);
  }

  getUsuarios(){
    return this.http.get(`${this.URL}/test/user/usuarios`);
  }

  modificarUser(datos:any){
    return this.http.post(this.URL+'/test/user/modificar', datos);
  }

  eliminarUsuario(dato:any){
    return this.http.post(this.URL+'/test/user/eliminar', dato);
  }

  registrarUsuario(dato:any){
    return this.http.post(this.URL+'/test/user/registrar', dato);
  }

  actualizarStatusUser(dato:any){
    return this.http.post(this.URL+'/test/user/status', dato);
  }

  validar_rol_usuario(dato:any){
    return this.http.post(this.URL+'/test/user/rol', dato);
  }

  login(dato:any){
    return this.http.post(this.URL+'/test/user/login', dato);
  }

  validarLogin():boolean{
    let userData = localStorage.getItem('user');
    let DataUser = userData ? JSON.parse(userData) : null;
    if(DataUser !== null){
      return true;
    }

    return false;
  }




}
