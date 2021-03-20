import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup = new FormGroup({
    employeeId :  new FormControl('')
  });
  constructor(private loginService:LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    let employeeId = this.formGroup.get('employeeId').value;
    this.loginService.login(employeeId).subscribe(
      res=>{
        window.localStorage.setItem('employeeId',employeeId);
        window.localStorage.setItem('token',res['token']);
        window.localStorage.setItem('role',res['role']);
        this.router.navigate(['home']);
      },
      err => {console.log(err);      
        alert('Login Failed');
      }
    );
  }
}
