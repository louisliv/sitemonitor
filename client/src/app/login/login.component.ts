import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiLogin } from 'src/app/api/api.login';
import { UserLogin } from 'src/app/models/user-login.model';
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userLogin : UserLogin;
  serverError: string;

  constructor(
    private apiLogin: ApiLogin,
    private router: Router,
    private toastService: ToastService
  ) { 
    this.userLogin = new UserLogin();
    this.serverError = '';
  }

  ngOnInit(): void {
  }

  login():void{
    this.apiLogin.login(this.userLogin).subscribe({
      next: data => {
        this.apiLogin.authenticated.emit(true);
        this.serverError = null;

        this.toastService.show('Logged in successfully.', 
          { classname: "bg-success text-light"}
        )

        //Redirects to main page
        this.router.navigate(['./']);
      },
      error: err =>{
        this.serverError = `${err.error.status}: ${err.error.message}`;
      }
    });
  }

}
