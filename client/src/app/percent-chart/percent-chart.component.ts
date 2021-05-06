import { 
  Component, 
  OnInit, 
  ElementRef, 
  AfterViewInit, 
  ViewChild,
  Input
} from '@angular/core';
import { ChartOptions, ChartType, ChartTooltipOptions } from 'chart.js';
import { SingleDataSet, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';

@Component({
  selector: 'percent-chart',
  templateUrl: './percent-chart.component.html',
  styleUrls: ['./percent-chart.component.scss']
})
export class PercentChartComponent implements OnInit {
  private _data: any;
  public _secondaryLabel: string;
  
  @Input() set data(value: any) {
    this._data = value;
    this.changeData();
    this.setColors();
  }

  @Input() set secondaryLabel(value: string) {
    this._secondaryLabel = value;
  }

  constructor() {
  }
  
  ngOnInit(): void {
    this.changeData();
    this.setColors();
  }

  public doughnutChartData: SingleDataSet = [10, 90];
  public chartColors: Array < any > = [{
    backgroundColor: ['', '#EEEEEE'],
    borderColor:['', '']
  }];
  public doughnutChartType: ChartType = 'doughnut';
  public chartLabels: string[] = ['Percentage','Percentage'];

  public chartOptions: ChartOptions = {
    rotation: 1* Math.PI,
    circumference: 1 * Math.PI,
    cutoutPercentage: 75,
    tooltips: {
      enabled: false
    },
    hover:{mode:null},
  }

  public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [{
    afterDraw: (chart) => {
    }
  }]

  changeData(): void {
    var x = this._data;
    this.doughnutChartData = [x, (100-x)];
  }

  getColor(): string {
    var x = parseFloat(this.doughnutChartData[0].toString());
    var rounded = Math.round((100 - Math.round(x)) * 150 / 100)
    return `hsl(${rounded}, 100%, 50%)`;
  }

  setColors(): void {
    this.chartColors[0]['backgroundColor'][0] = this.getColor();
  }
}
