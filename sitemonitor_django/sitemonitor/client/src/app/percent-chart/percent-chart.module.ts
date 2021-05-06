import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PercentChartComponent } from './percent-chart.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [PercentChartComponent],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [
    PercentChartComponent
  ],
})
export class PercentChartModule { }
