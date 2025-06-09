import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  template: `
    <highcharts-chart 
      [Highcharts]="Highcharts" 
      [options]="chartOptions" 
      style="width: 100%; height: 400px; display: block;">
    </highcharts-chart>
  `
})
export class DashboardComponent {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Evaluación Docente'
    },
    xAxis: {
      categories: ['Prof. Pérez', 'Prof. Soto', 'Prof. Gómez', 'Prof. Ramírez'],
      title: {
        text: 'Profesores'
      }
    },
    yAxis: {
      min: 0,
      max: 7,
      title: {
        text: 'Promedio de Evaluación'
      }
    },
    series: [
      {
        name: 'Promedio',
        type: 'column',
        data: [5.6, 4.9, 6.2, 5.1],
        color: '#1f77b4'
      }
    ],
    tooltip: {
      pointFormat: 'Promedio: <b>{point.y}</b>'
    },
    credits: {
      enabled: false
    }
  };
}
