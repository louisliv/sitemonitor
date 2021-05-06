import { Component, OnInit, Input, } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { TempChartOptions, TempChartColors } from "./temp-chart-options";

@Component({
  selector: 'temp-chart',
  templateUrl: './temp-chart.component.html',
  styleUrls: ['./temp-chart.component.scss']
})
export class TempChartComponent implements OnInit {
  private _data: any;
  public _label: string;
  
  @Input() set data(value: any) {
    this._data = value;
    this.changeData();
  }

  @Input() set label(value: string) {
    this._label = value;
    this.setLabel();
  }

  constructor() { }

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Current Temperature' },
    { data: [], label: 'Critical Heat' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = TempChartOptions

  public lineChartColors: Color[] = TempChartColors;
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';

  ngOnInit(): void {
    for (var i = 0; i < 20; i++) {
      this.lineChartData[1].data.push(this._data.high_temp)
    }
  }

  setLabel() {
    this.lineChartOptions.title.text = `${this._label} Temp`;
  }

  changeData() {
    this.lineChartLabels = this._data.data.map(temp => {
      return temp.time
    })
    this.lineChartData[0].data = this._data.data.map(temp => {
      return temp.temp
    })
  }
}
