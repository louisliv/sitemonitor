import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    SettingsComponent
  ],
})
export class SettingsModule { }
