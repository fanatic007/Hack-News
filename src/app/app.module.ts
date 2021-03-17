import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChallengesService } from './services/challenges.service';
import { AddChallengeComponent } from './components/add-challenge/add-challenge.component';

@NgModule({
  declarations: [
    AppComponent,
    AddChallengeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ChallengesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
