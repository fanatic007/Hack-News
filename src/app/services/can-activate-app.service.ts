import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanActivateApp implements CanActivate {

  constructor(private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let canActivate = window.localStorage.getItem('token') !== null;
    !canActivate && this.router.navigate(['login']);console.log(canActivate);    
    return canActivate;
  }
}
