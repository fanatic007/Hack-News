import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/components/login/login.component';
import { ChallengesComponent } from '../app/components/challenges/challenges.component';

const routes: Routes = [
  { path:'home', component:ChallengesComponent },
  { path:'login', component:LoginComponent },
  { path:'', redirectTo: 'home' , pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
