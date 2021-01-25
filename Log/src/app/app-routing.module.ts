import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './auth/register/register.component';


const routes: Routes = [
  { path: '',
  component: MainComponent,
  loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: 'login',
  component: LoginComponent,
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'register',
  component: RegisterComponent,
  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

/*@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})*/
// export class AppRoutingModule { }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
