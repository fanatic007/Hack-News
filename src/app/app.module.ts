import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AddChallengeComponent } from './components/add-challenge/add-challenge.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { LoginComponent } from './components/login/login.component';
import { HttpInterceptorService } from '../app/services/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AddChallengeComponent,
    ChallengesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi:true }
  ]
})
export class AppModule { }
