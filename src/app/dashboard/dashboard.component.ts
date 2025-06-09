<<<<<<< HEAD
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
=======
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts'; // Importa NgChartsModule aquí

// Define una interfaz para nuestra estructura de datos de evaluación
interface Evaluation {
  career: string;
  semester: string;
  evaluations: number;
}

@Component({
  selector: 'app-dashboard',
  // Si tu template y estilos están en archivos separados, se mantienen así:
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true, // <--- ¡Esto es lo importante! Declara el componente como autónomo
  imports: [NgChartsModule] // <--- ¡Importa NgChartsModule aquí dentro de imports!
})
export class DashboardComponent implements OnInit, OnDestroy {

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'Evaluaciones Realizadas por Carreras y Semestre',
        font: {
          size: 18
        },
        color: '#333'
      }
    },
    scales: {
      x: {
        stacked: false,
        title: {
          display: true,
          text: 'Carreras',
          font: {
            size: 16
          }
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      y: {
        stacked: false,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Número de Evaluaciones',
          font: {
            size: 16
          }
        },
        ticks: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartData!: ChartData<'bar'>;

  private mockEvaluations: Evaluation[] = [
    { career: 'Ingeniería de Sistemas', semester: '2023-1', evaluations: 12 },
    { career: 'Ingeniería de Sistemas', semester: '2023-2', evaluations: 15 },
    { career: 'Ingeniería de Sistemas', semester: '2024-1', evaluations: 10 },
    { career: 'Ingeniería Civil', semester: '2023-1', evaluations: 8 },
    { career: 'Ingeniería Civil', semester: '2023-2', evaluations: 10 },
    { career: 'Ingeniería Civil', semester: '2024-1', evaluations: 7 },
    { career: 'Arquitectura', semester: '2023-1', evaluations: 5 },
    { career: 'Arquitectura', semester: '2023-2', evaluations: 7 },
    { career: 'Arquitectura', semester: '2024-1', evaluations: 9 },
    { career: 'Derecho', semester: '2023-1', evaluations: 10 },
    { career: 'Derecho', semester: '2023-2', evaluations: 12 },
    { career: 'Derecho', semester: '2024-1', evaluations: 11 },
  ];

  ngOnInit(): void {
    this.prepareChartData();
  }

  ngOnDestroy(): void {
    // ng2-charts maneja la destrucción interna de Chart.js
  }

  private prepareChartData(): void {
    const careers = Array.from(new Set(this.mockEvaluations.map(e => e.career)));
    const semesters = Array.from(new Set(this.mockEvaluations.map(e => e.semester))).sort();

    const backgroundColors: string[] = [
      'rgba(66, 165, 245, 0.8)',
      'rgba(255, 167, 38, 0.8)',
      'rgba(102, 187, 106, 0.8)',
      'rgba(239, 83, 80, 0.8)',
      'rgba(171, 71, 188, 0.8)',
      'rgba(84, 110, 122, 0.8)',
      'rgba(255, 205, 86, 0.8)',
      'rgba(75, 192, 192, 0.8)'
    ];

    const datasets = semesters.map((semester, index) => {
      const dataForSemester = careers.map(career => {
        const evaluationEntry = this.mockEvaluations.find(
          e => e.career === career && e.semester === semester
        );
        return evaluationEntry ? evaluationEntry.evaluations : 0;
      });

      return {
        label: `Evaluaciones ${semester}`,
        data: dataForSemester,
        backgroundColor: backgroundColors[index % backgroundColors.length],
        borderColor: backgroundColors[index % backgroundColors.length].replace('0.8', '1'),
        borderWidth: 1,
      };
    });

    this.barChartData = {
      labels: careers,
      datasets: datasets,
    };
  }
>>>>>>> 41a17ab1bdf95d65c7b599d35ab60be82b337270
}
