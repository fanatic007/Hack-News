import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CanActivateLogin } from './can-activate-login.service';

describe('CanActivateLogin', () => {
  let service: CanActivateLogin;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      providers:[CanActivateLogin]
    });
    service = TestBed.inject(CanActivateLogin);
  });

  it('should be create service and have relevant methods', () => {
    expect(service).toBeTruthy();
    expect(typeof service['canActivate']).toBeTruthy('function');
  });

  it('should return false when no token found', () => {
    window.localStorage.removeItem('token');
    expect(service['canActivate'](undefined,undefined)).toBeTruthy();
  });

  it('should return true when token found', () => {
    window.localStorage.setItem('token','abcd');
    expect(service['canActivate'](undefined,undefined)).toBeFalsy();
  });
});
