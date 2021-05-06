import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiAuth } from "src/app/api/api.auth";
import { Router, CanActivate } from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService implements CanActivate {

  constructor(
    private apiAuthService: ApiAuth, 
    private router: Router,
    private cookies: CookieService
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(res => {
        this.apiAuthService.isAuthenticated().subscribe(
          (active) => {
            if (active) {
              res(true);
            } else {
              this.router.navigate(['/login']);
              this.cookies.delete("username");
              this.cookies.delete("token");
              res(false);
            }
          },
          (error) => {
            this.router.navigate(['/login']);
            this.cookies.delete("username");
            this.cookies.delete("token");
            res(false);
          }
        );
    });
}
}
