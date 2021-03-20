import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { ChallengesComponent } from '../app/components/challenges/challenges.component';
import { CanActivateApp } from '../app/services/can-activate-app.service';
import { CanActivateLogin } from '../app/services/can-activate-login.service';

const routes: Routes = [
  { path:'home', component:ChallengesComponent, canActivate:[CanActivateApp] },
  { path:'login', component:LoginComponent, canActivate:[CanActivateLogin] },
  { path:'', redirectTo: 'login' , pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
