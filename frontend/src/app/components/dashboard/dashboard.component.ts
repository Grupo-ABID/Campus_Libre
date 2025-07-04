import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { EvaluacionService } from '../../core/evaluacion.service';

interface Evaluation {
  curso: string;
  semestre: string;
  cantidad: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [NgChartsModule]
})
export class DashboardComponent implements OnInit, OnDestroy {

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Evaluaciones Realizadas por Curso y Semestre' }
    },
    scales: {
      x: {
        stacked: false,
        title: { display: true, text: 'Cursos' }
      },
      y: {
        stacked: false,
        beginAtZero: true,
        title: { display: true, text: 'Número de Evaluaciones' }
      }
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartData!: ChartData<'bar'>;

  constructor(private evalService: EvaluacionService) {}

  ngOnInit(): void {
    this.loadEvaluations();
  }

  ngOnDestroy(): void {}

  loadEvaluations(): void {
    this.evalService.getGroupedResults().subscribe({
      next: (data) => {
        console.log('Datos cargados para dashboard:', data);
        const formattedData = this.formatBackendData(data);
        this.prepareChartData(formattedData);
      },
      error: (err) => {
        console.error('Error al cargar datos del dashboard:', err);
      }
    });
  }

  private formatBackendData(rawData: any[]): Evaluation[] {
    const grouped: { [key: string]: { [key: string]: number } } = {};

    rawData.forEach(item => {
      console.log('Item recibido:', item); // prueba de datos 

      const curso = item.evaluacion.curso.nombre;
      const periodo = `${item.evaluacion.curso.periodo.year}-${item.evaluacion.curso.periodo.semestre}`;

      if (!grouped[curso]) grouped[curso] = {};
      if (!grouped[curso][periodo]) grouped[curso][periodo] = 0;

      grouped[curso][periodo] += 1;
    });

    const evaluations: Evaluation[] = [];

    for (const curso in grouped) {
      for (const periodo in grouped[curso]) {
        evaluations.push({
          curso: curso,
          semestre: periodo,
          cantidad: grouped[curso][periodo]
        });
      }
    }

    return evaluations;
  }

  private prepareChartData(evaluations: Evaluation[]): void {
    const cursos = Array.from(new Set(evaluations.map(e => e.curso)));
    const semestres = Array.from(new Set(evaluations.map(e => e.semestre))).sort();

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

    const datasets = semestres.map((semestre, index) => {
      const dataForSemester = cursos.map(curso => {
        const entry = evaluations.find(e => e.curso === curso && e.semestre === semestre);
        return entry ? entry.cantidad : 0;
      });

      return {
        label: `Evaluaciones ${semestre}`,
        data: dataForSemester,
        backgroundColor: backgroundColors[index % backgroundColors.length],
        borderColor: backgroundColors[index % backgroundColors.length].replace('0.8', '1'),
        borderWidth: 1,
      };
    });

    this.barChartData = {
      labels: cursos,
      datasets: datasets,
    };
  }
}
