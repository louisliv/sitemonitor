import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  faChartArea, 
  faCog, 
  faDesktop,
  faSignInAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { ApiLogin } from "src/app/api/api.login";
import { ToastService } from "src/app/services/toast.service";
import { ApiAuth } from "src/app/api/api.auth";

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
  faSignIn = faSignInAlt;
  faSignOut = faSignOutAlt;
  isLoggedIn;
  actionBtnTooltipPlacement: string;
  userBtnTooltipPlacement: string;

  constructor(
    public route: ActivatedRoute, 
    public router: Router,
    public loginApi: ApiLogin,
    private toastService: ToastService,
    private authApi: ApiAuth
  ) { }

  ngOnInit() {
    this.authApi.isAuthenticated().subscribe((authenticated) => {
      this.isLoggedIn = authenticated
    })
    this.loginApi.authenticated.subscribe((authenticated) => {
      this.isLoggedIn = authenticated;
    })

    this.actionBtnTooltipPlacement = this.getTooltipPlacement();
    this.userBtnTooltipPlacement = this.getUserBtnTooltipPlacement();
  }

  logout() {
    this.loginApi.logout().subscribe({
      next: () => {
        this.loginApi.authenticated.emit(false);

        this.toastService.show('Logged out successfully.', 
          { classname: "bg-success text-light"}
        )

        this.router.navigate(['login'])
      }
    })
  }

  getTooltipPlacement = function () {
    return (window.innerWidth < 768) ? 'bottom' : 'right';
  };

  getUserBtnTooltipPlacement = function () {
    return (window.innerWidth < 768) ? 'left' : 'right';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.actionBtnTooltipPlacement = this.getTooltipPlacement();
    this.userBtnTooltipPlacement = this.getUserBtnTooltipPlacement();
  }
}