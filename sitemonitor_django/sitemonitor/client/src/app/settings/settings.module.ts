import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { SettingEditModal } from "./_components/edit/edit-modal.component";

@NgModule({
  declarations: [SettingsComponent, SettingEditModal],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule
  ],
  exports: [
    SettingsComponent,
    SettingEditModal
  ],
})
export class SettingsModule { }
