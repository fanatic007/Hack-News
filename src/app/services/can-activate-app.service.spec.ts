import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CanActivateApp } from './can-activate-app.service';

describe('CanActivateApp', () => {
  let service: CanActivateApp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      providers:[CanActivateApp]
    });
    service = TestBed.inject(CanActivateApp);
  });

  it('should be create service and have relevant methods', () => {
    expect(service).toBeTruthy();
    expect(typeof service['canActivate']).toBeTruthy('function');
  });

  it('should return false when no token found', () => {
    window.localStorage.removeItem('token');
    expect(service['canActivate'](undefined,undefined)).toBeFalsy();
  });

  it('should return true when token found', () => {
    window.localStorage.setItem('token','abcd');
    expect(service['canActivate'](undefined,undefined)).toBeTruthy();
  });

});
