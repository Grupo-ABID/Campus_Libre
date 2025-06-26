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

  ngOnInit(): void {
    // Lógica de inicialización
  }

  ngOnDestroy(): void {
    // Lógica de limpieza
  }
}
