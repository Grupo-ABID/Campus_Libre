import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class EvaluacionService {
  
private apiUrl = 'http://127.0.0.1:8000/api/evaluaciones/';

constructor(private http: HttpClient) {}

  getEnrolledCourses() {
    
  }

  saveEvaluation(data: any) {
   
  }

  getGroupedResults(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTeacherEvaluations() {
    
  }
}

