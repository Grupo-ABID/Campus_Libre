import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class EvaluacionService {
  
private apiUrlBase = 'http://127.0.0.1:8000/api/';

private cursosUrl = `${this.apiUrlBase}cursos/`;
private evaluacionesUrl = `${this.apiUrlBase}evaluaciones/`;
private respuestasUrl = `${this.apiUrlBase}respuestas/`;

constructor(private http: HttpClient) {}

  // obtener los cursos inscritos
  getEnrolledCourses(): Observable<any[]> {

    // tira el id:1, name: xx, etc.
    return this.http.get<any[]>(this.cursosUrl);
    
  }

  // guardado de la evaluación
  saveEvaluation(evaluacionData: any): Observable<any> {

    return this.http.get<any>(this.evaluacionesUrl, evaluacionData);
   

  }

  getGroupedResults(): Observable<any[]> {
    return this.http.get<any[]>(this.respuestasUrl);
  }

  getTeacherEvaluations() {
    
  }

   // Nuevo método para obtener los cursos disponibles
  getAvailableCourses(): Observable<string[]> { // O `any[]` si el backend devuelve objetos completos de cursos
    return this.http.get<string[]>(this.cursosUrl);
  }

}



