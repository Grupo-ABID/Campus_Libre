import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dynamic';

@Injectable({ providedIn: 'root' })
export class EvaluacionService {

  private apiUrlBase = `${environment.apiUrl}/api/`;

  private cursosUrl = `${this.apiUrlBase}cursos/`;
  private evaluacionesUrl = `${this.apiUrlBase}evaluaciones/`;
  private respuestasUrl = `${this.apiUrlBase}respuestas/`;

  constructor(private http: HttpClient) {}

  // Obtener los cursos inscritos
  getEnrolledCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.cursosUrl);
  }

  // Guardado de la evaluación
  saveEvaluation(evaluacionData: any): Observable<any> {
    return this.http.post<any>(this.evaluacionesUrl, evaluacionData);
  }

  saveRespuesta(respuestaData: any): Observable<any> {
    return this.http.post<any>(this.respuestasUrl, respuestaData);
  }

  getGroupedResults(): Observable<any[]> {
    return this.http.get<any[]>(this.respuestasUrl);
  }

  getTeacherEvaluations() {
    // Aquí puedes agregar funcionalidad si lo necesitas
  }

  getAvailableCourses(): Observable<string[]> {
    return this.http.get<string[]>(this.cursosUrl);
  }

  getEncuestaByCurso(cursoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlBase}encuestas/?curso=${cursoId}`);
  }

}
