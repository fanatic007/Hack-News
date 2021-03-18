import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginEndpoint = "http://localhost:3000/login/";
  constructor(private httpClient:HttpClient) { }

  login(employeeID:string){
    return this.httpClient.post(this.loginEndpoint,{employeeID:employeeID},{observe:'body'});
  }
}