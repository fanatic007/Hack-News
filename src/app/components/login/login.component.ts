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
    this.loginService.login(this.formGroup.get('employeeId').value).subscribe(
      res=>{
        window.localStorage.setItem('token',res['token']);
        this.router.navigate(['home']);
      },
      err => {console.log(err);      
        alert('Login Failed');
      }
    );
  }

}
