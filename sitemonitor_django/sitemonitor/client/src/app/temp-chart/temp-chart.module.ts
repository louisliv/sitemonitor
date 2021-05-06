import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { TempChartComponent } from "./temp-chart.component";
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [TempChartComponent],
  imports: [
    CommonModule,
    ChartsModule,
    NgxChartsModule
  ],
  exports: [
    TempChartComponent
  ],
})
export class TempChartModule { }
