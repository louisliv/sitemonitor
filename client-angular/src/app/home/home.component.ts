import { Component, OnInit } from '@angular/core';
import { MonitorApi } from "./../api/api.monitor";
import { Monitor } from "./../models/monitor.model";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  monitor: Monitor;
  faSpinner = faSpinner;
  isLoaded = false;
  loadError: any;

  constructor(private monitorApi: MonitorApi) { }

  ngOnInit(): void {
    this.getMonitor();
  }
  
  intervalId = setInterval(() => {
    this.getMonitor();
  }, 5000);

  getMonitor() {
    this.monitorApi.get().subscribe({
      next: data => {
        this.monitor = data;
        this.isLoaded = true;
        this.loadError = null;
      },
      error: err => {
        this.isLoaded = false;
        this.loadError = err.statusText;
      }
    })
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  itemTracker( index, item ) 
  {
    return item.key;
  }
}
