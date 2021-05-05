import { Component, OnInit } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { SettingsApi } from './../api/api.settings';
import { Setting } from "./../models/setting.model";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  isLoaded = false;
  faSpinner = faSpinner;
  settings: Setting[];

  constructor(private settingsApi: SettingsApi) { }

  ngOnInit(): void {
    this.settingsApi.getAll().subscribe({
      next: data => {
        this.settings = data
        this.isLoaded = true;
      }
    })
  }

}
