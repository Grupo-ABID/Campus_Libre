import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('myChart') chartRef!: ElementRef;

  ngAfterViewInit(): void {
    new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr'],
        datasets: [
          {
            label: 'Evaluaciones',
            data: [5, 8, 6, 10],
            backgroundColor: '#42A5F5'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
  }
}
