import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { PercentChartModule } from './../percent-chart/percent-chart.module';
import { TempChartModule } from './../temp-chart/temp-chart.module';
import { ChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ChartsModule,
    PercentChartModule,
    TempChartModule,
    FontAwesomeModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
