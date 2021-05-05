import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChartArea, faCog, faDesktop } from '@fortawesome/free-solid-svg-icons';

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
  
  links = [
    { title: 'Monitor', fragment: "'/home'" },
    { title: 'Settings', fragment: '/settings' }
  ];
  isNavbarCollapsed=true;
  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
    
  }

}