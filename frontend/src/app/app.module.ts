// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';








@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // Puedes agregar más componentes aquí si es necesario
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // Puedes agregar más módulos aquí si es necesario
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
