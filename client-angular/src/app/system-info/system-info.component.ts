import { Component, OnInit } from '@angular/core';
import { SystemInfoApi } from "./../api/api.sys-info";
import { SystemInfo } from "./../models/system-info.model";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-system-info',
  templateUrl: './system-info.component.html',
  styleUrls: ['./system-info.component.scss']
})
export class SystemInfoComponent implements OnInit {
  isLoaded: boolean;
  systemInfo: SystemInfo;
  faSpinner = faSpinner;

  constructor(
    private systemInfoApi: SystemInfoApi
  ) { this.isLoaded = false; }

  ngOnInit(): void {
    this.systemInfoApi.get().subscribe({
      next: data => {
        this.systemInfo = data;
        this.isLoaded = true;
      }
    })
  }

}
