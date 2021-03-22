import { HttpClient, HttpErrorResponse, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError } from 'rxjs';

import { HttpInterceptorService } from './http-interceptor.service';
import { LoginService } from './login.service';

describe('HttpInterceptorService', () => {
  let service: HttpInterceptorService;
  let loginService: jasmine.SpyObj<LoginService>;
  let mockRouter :jasmine.SpyObj<Router>;

  beforeEach(() => {
    loginService = jasmine.createSpyObj('LoginService',['clearSession']);
    mockRouter = jasmine.createSpyObj('Router',['navigate']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HttpInterceptorService,
        multi: true
      },
      {
        provide:LoginService, useValue:loginService
      },
      {
        provide:Router, useValue: mockRouter
      }
      ]
    });
    service = TestBed.inject(HttpInterceptorService);
  });

  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    mock.verify();
  }));

  it('should be create service and have relevant method', () => {
    expect(service).toBeTruthy();
    expect(typeof service['intercept']).toBeTruthy();
  });

  describe('intercept HTTP requests', () => {
    it('should add Authorization to Headers', inject([HttpClient, HttpTestingController],
      (http: HttpClient, mock: HttpTestingController) => {
        http.get('challenges/').subscribe(response => expect(response).toBeTruthy());
        const request = mock.expectOne(req => (req.headers.has('Authorization')));
        request.flush({data: 'test'});
        mock.verify();
    }));
  });
});
