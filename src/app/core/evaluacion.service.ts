import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EvaluacionService {
  private courses = [
    { id: 1, name: 'Matemáticas I', evaluated: false },
    { id: 2, name: 'Historia', evaluated: true }
  ];
  private evaluations: any[] = [];

  getEnrolledCourses() {
    return this.courses;
  }

  saveEvaluation(data: any) {
    const course = this.courses.find(c => c.id === +data.courseId);
    if (course) course.evaluated = true;
    this.evaluations.push(data);
  }

  getGroupedResults() {
    return [
      {
        name: 'Ingeniería',
        results: [{ semestre: '2024-2', promedio: 5.3 }]
      }
    ];
  }

  getTeacherEvaluations() {
    return [
      { name: 'Prof. Pérez', promedio: 5.6 },
      { name: 'Prof. Soto', promedio: 4.9 }
    ];
  }

  getEvaluacionesPorMes() {
  // Simulación de datos agrupados por mes
  return [
    { mes: 'Ene', cantidad: 5 },
    { mes: 'Feb', cantidad: 12 },
    { mes: 'Mar', cantidad: 8 },
    { mes: 'Abr', cantidad: 15 },
    { mes: 'May', cantidad: 7 },
    { mes: 'Jun', cantidad: 10 }
    ];
  }
}
