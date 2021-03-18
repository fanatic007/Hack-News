import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let loginService: LoginService;
  let httpMock: HttpTestingController;
  const LOGIN_ENDPOINT = "http://localhost:3000/login/";
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpTestingController]
    });
    loginService = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create loginService having relevant properties and method', () => {
    expect(loginService).toBeTruthy();
    expect(loginService['loginEndpoint']).toBeTruthy();
    expect(typeof loginService['login']).toBeTruthy();
  });

  it('should make a POST request for login', () => {
    loginService['login']('123').subscribe(response => {
      expect(response.status).toBeTruthy(1);
      expect(response.status).toEqual('success');
    });
    const req = httpMock.expectOne(LOGIN_ENDPOINT);
    req.flush({ status: "success" , token:'abcd'});
    expect(req.request.method).toEqual('POST');
  });
});