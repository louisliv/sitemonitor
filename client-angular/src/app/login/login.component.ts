import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiLogin } from './../api/api.login';
import { UserLogin } from './../models/user-login.model';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLogin : UserLogin;

  constructor(
    private apiLogin:ApiLogin, 
    private cookieService:CookieService, 
    private router:Router,
  ) { 
    this.userLogin = new UserLogin();
  }

  ngOnInit(): void {
  }

  login():void{
    this.apiLogin.login(this.userLogin).subscribe({
      next: data => {
        this.cookieService.set("token", data.token);
        this.cookieService.set("username", data.username);
        //Redirects to main page
        this.router.navigate(['./']);
      },
      error: err =>{
      }
    });
  }

}
