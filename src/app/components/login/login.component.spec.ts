import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { from } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let loginService: jasmine.SpyObj<LoginService>

  beforeEach(async(() => {
    loginService = jasmine.createSpyObj('LoginService',['login']);
    loginService.login.and.returnValue(from([{token:'abcd'}]));
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[RouterTestingModule.withRoutes([])],
      providers:[{provide:LoginService, useValue:loginService }]
    })
    .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create component and have relevant properties and methods', () => {
    expect(component).toBeTruthy();
    expect(component['formGroup']).toBeTruthy();
    expect(typeof component['login']).toEqual("function");
  });

  it('should have login form', () => {
    expect(fixture.nativeElement.querySelector('input')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('form')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('button')).toBeTruthy();
  });

  it('should add token to localStorage on successful login', () => {
    router = TestBed.inject(Router);
    expect(window.localStorage.getItem('token')).toBeTruthy();
  });

  it('should change route on successful login', () => {
    router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');
    component['login']();
    expect(navigateSpy).toHaveBeenCalledWith(['home']);
  });

});