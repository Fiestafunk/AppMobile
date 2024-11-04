import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'nosotros',
    loadChildren: () => import('./nosotros/nosotros.module').then(m => m.NosotrosPageModule)
  },
  {
    path: 'contactanos',
    loadChildren: () => import('./contactanos/contactanos.module').then(m => m.ContactanosPageModule)
  },  {
    path: 'despachos',
    loadChildren: () => import('./despachos/despachos.module').then( m => m.DespachosPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
