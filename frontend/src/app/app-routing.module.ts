
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'login', loadComponent: ()=> import('./components/login/login.component').then(m=>m.LoginComponent)
  },
  {
    path:'usuario', loadComponent: ()=> import('./components/usuario/usuario.component').then(m=>m.UsuarioComponent)
  }
  // Otras rutas si las tienes
];


   
/*
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

*/
