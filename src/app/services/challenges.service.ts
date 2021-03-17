import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IChallenge } from '../models/challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {
  private readonly endpoint="http://localhost:3000/challenges/";
  constructor(private httpClient: HttpClient) { }

  getAllChallenges():Observable<IChallenge[]>{
    return this.httpClient.get<IChallenge[]>(this.endpoint,{observe:"body", responseType:"json"});
  }

  addChallenge(challenge:IChallenge):Observable<any>{
    return this.httpClient.post(this.endpoint,challenge,{observe:"body", responseType:"json"});
  }

  upvoteChallenge(id:string):Observable<any>{
    return this.httpClient.put(this.endpoint,{_id:id},{observe:"body", responseType:"json"});
  }
}