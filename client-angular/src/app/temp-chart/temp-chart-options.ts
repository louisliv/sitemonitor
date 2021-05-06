import { ChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';
export const TempChartOptions: ChartOptions = {
    title: {
        text: '',
        display: true,
        fontColor: 'white',
        fontSize: 20
    },
    legend: {
        labels: {
            fontColor: "white"
        }
    },
    responsive: true,
    scales: {
        xAxes: [{
            gridLines: {
                display:false,
            },
            ticks: {
                fontColor: "white"
            }
        }],
        yAxes: [
            {
                id: 'y-axis-1',
                position: 'left',
                gridLines: {
                color:'white',
                },
                ticks: {
                    fontColor: "white",
                    beginAtZero: true
                }
            }
        ],
    },
    elements: {
        line: {
            tension: 0
        }
    }
}

export const TempChartColors: Color[] = [
    {
        backgroundColor: 'transparent',
        borderColor: '#339af0',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
        backgroundColor: 'transparent',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
]