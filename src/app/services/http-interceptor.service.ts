import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private router:Router, private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let employeeId = window.localStorage.getItem('employeeId');
    let token =  window.localStorage.getItem('token');
    let headers = {};
    employeeId && (headers['EmployeeId']=employeeId);
    token && (headers['Authorization']=`Bearer ${token}`);
    req = req.clone({
      setHeaders: headers
    });
    return next.handle(req).pipe( tap(() => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status !== 401) {
          return;
        }
        this.loginService.clearSession();
        this.router.navigate(['login']);
        alert('Session Expired');
      }
    }));
  }
}
