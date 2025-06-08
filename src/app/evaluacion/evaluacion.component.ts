import { Component, OnInit } from '@angular/core';
import { EvaluacionService } from '../core/evaluacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';    // Para *ngIf, *ngFor, etc.
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from "../dashboard/dashboard.component";  // Para formGroup
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card'; 

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss'],
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, MatSidenavModule, MatCardModule] // Lo que uses  
  // Lo que uses  
})
export class EvaluacionComponent implements OnInit {
  enrolledCourses: any[] = [];
  selectedCourse: any = null;
  warningUnrated: boolean = false;
  evaluationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadCourses();

    this.evaluationForm = this.fb.group({
      courseId: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
      comment: ['', Validators.required]
    });
  }

  loadCourses(): void {
    // Simulación, reemplazar con llamado a backend
    this.enrolledCourses = [
      { id: 1, name: 'Matemáticas' },
      { id: 2, name: 'Matemáticas II' },
      { id: 3, name: 'Programación Orientada a Objetos' }
    ];

    // Lógica para advertencia (ejemplo)
    this.warningUnrated = this.enrolledCourses.length > 0;
  }

  selectCourse(course: any): void {
    this.selectedCourse = course;
    this.evaluationForm.patchValue({
      courseId: course.id,
      rating: '',
      comment: ''
    });
  }

  cancelEvaluation(): void {
    this.selectedCourse = null;
    this.evaluationForm.reset();
  }

  onSubmit(): void {
    if (this.evaluationForm.invalid) {
      this.evaluationForm.markAllAsTouched();
      return;
    }

    const data = this.evaluationForm.value;
    console.log('Datos enviados:', data);
    alert('¡Evaluación enviada correctamente!');
    this.selectedCourse = null;
    this.evaluationForm.reset();
  }
}
