import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IChallenge } from '../models/challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {
  private readonly ENDPOINT="localhost:3000/challenges/";
  constructor() { }

  getAllChallenges():Observable<IChallenge[]>{
    return null;
  }

  addChallenge():Observable<any>{
    return null;
  }

  upvoteChallenge():Observable<any>{
    return null;
  }
}