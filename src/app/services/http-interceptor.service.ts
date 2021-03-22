import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let employeeId = window.localStorage.getItem('employeeId');
    let token =  window.localStorage.getItem('token');
    let headers = {};
    employeeId && (headers['EmployeeId']=employeeId);
    token && (headers['Authorization']=`Bearer ${token}`);
    req = req.clone({
      setHeaders: headers
    });
    return next.handle(req);
  }
}
