import { NgModule } from '@angular/core';
import { NavBarComponent } from './navbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    NavBarComponent,
  ],
  imports: [
    RouterModule,
    NgbModule,
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    NavBarComponent
  ],
  providers:[]
})
export class NavbarModule { }
