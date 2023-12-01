import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from './services/usuario.service';

import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';




@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    LoginComponent,
    HeaderComponent,
    UsuarioComponent,
    RouterModule.forRoot([]),
    FormsModule
  ],
  providers:[
    HttpClientModule,
    UsuarioService,
    RouterModule
  ]
})
export class AppModule { }
