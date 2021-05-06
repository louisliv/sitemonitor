import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  faChartArea, 
  faCog, 
  faDesktop,
  faDoorClosed,
  faDoorOpen
} from '@fortawesome/free-solid-svg-icons';
import { ApiLogin } from "src/app/api/api.login";
import { CookieService } from 'ngx-cookie-service';

/**
 * this component control the nagaivation menu 
 */
@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavBarComponent implements OnInit {
  faChartArea = faChartArea;
  faCog = faCog;
  faDesktop = faDesktop;
  faSignIn = faDoorOpen;
  faSignOut = faDoorClosed;
  isLoggedIn = this.cookieService.get('token')

  constructor(
    public route: ActivatedRoute, 
    public router: Router,
    public loginApi: ApiLogin,
    private cookieService:CookieService
  ) { }

  ngOnInit() {
    this.loginApi.authenticated.subscribe((authenticated) => {
      console.log(authenticated);
      this.isLoggedIn = authenticated;
    })
  }

  logout() {
    this.loginApi.logout().subscribe({
      next: () => {
        this.cookieService.delete("token");
        this.cookieService.delete("username");
        this.loginApi.authenticated.emit(false);
        this.router.navigate(['login'])
      }
    })
  }
}