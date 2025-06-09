import { Component } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  barChartLabels: string[] = ['Ene', 'Feb', 'Mar', 'Abr'];

  barChartData: ChartDataset<'bar'>[] = [
    { data: [5, 8, 6, 10], label: 'Evaluaciones' }
  ];

  barChartType: ChartType = 'bar';
}
