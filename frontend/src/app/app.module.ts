import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './components/header/header.module';
import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    //HeaderComponent,
    LoginComponent,
    HeaderModule,
    UsuarioComponent,
  ],
  providers:[]
})
export class AppModule { }
