import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ChallengesService } from './services/challenges.service';
import { AddChallengeComponent } from './components/add-challenge/add-challenge.component';
import { ChallengesComponent } from './components/challenges/challenges.component';

@NgModule({
  declarations: [
    AppComponent,
    AddChallengeComponent,
    ChallengesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }
