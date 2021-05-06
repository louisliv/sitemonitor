import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemInfoComponent } from './system-info.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [SystemInfoComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [SystemInfoComponent]
})
export class SystemInfoModule { }
