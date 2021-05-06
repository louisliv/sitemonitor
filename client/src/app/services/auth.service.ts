import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiAuth } from "src/app/api/api.auth";
import { Router, CanActivate } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from "./toast.service"

@Injectable()
export class AuthService implements CanActivate {

  constructor(
    private apiAuthService: ApiAuth, 
    private router: Router,
    private cookies: CookieService,
    private toastService: ToastService
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(res => {
        this.apiAuthService.isAuthenticated().subscribe(
          (active) => {
            if (active) {
              res(true);
            } else {
              this.router.navigate(['/login']);
              this.toastService.show("Unable to authenticate. Please log in.",
                { classname: 'bg-danger text-light' }
              )
              res(false);
            }
          },
          (error) => {
            this.router.navigate(['/login']);
            this.toastService.show("Unable to authenticate. Please log in.",
              { classname: 'bg-danger text-light' }
            )
            res(false);
          }
        );
    });
}
}
