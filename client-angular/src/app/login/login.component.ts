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
  serverError: string;

  constructor(
    private apiLogin:ApiLogin, 
    private cookieService:CookieService, 
    private router:Router,
  ) { 
    this.userLogin = new UserLogin();
    this.serverError = '';
  }

  ngOnInit(): void {
  }

  login():void{
    this.apiLogin.login(this.userLogin).subscribe({
      next: data => {
        this.cookieService.set("token", data.token);
        this.cookieService.set("username", data.username);
        this.apiLogin.authenticated.emit(true);
        this.serverError = null;
        //Redirects to main page
        this.router.navigate(['./']);
      },
      error: err =>{
        this.serverError = `${err.error.status}: ${err.error.message}`;
      }
    });
  }

}
