import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-evaluation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss']
})
export class EvaluacionComponent implements OnInit {
  enrolledCourses = [
    { id: 1, name: 'Matemáticas', evaluated: false },
    { id: 2, name: 'Matemáticas II', evaluated: true },
    { id: 3, name: 'Programación Orientada a Objetos', evaluated: false }
  ];

  selectedCourse: any = null;
  warningUnrated = false;
  evaluationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.checkUnratedCourses();
  }

  private initForm(): void {
    this.evaluationForm = this.fb.group({
      courseId: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
      comment: ['', Validators.required]
    });
  }

  private checkUnratedCourses(): void {
    this.warningUnrated = this.enrolledCourses.some(c => !c.evaluated);
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
    this.resetEvaluation();
  }


  private resetEvaluation(): void {
    this.selectedCourse = null;
    this.evaluationForm.reset();
    this.checkUnratedCourses();
  }

  onSubmit(): void {
    if (this.evaluationForm.invalid) {
      this.evaluationForm.markAllAsTouched();
      return;
    }

    // Procesar envío de datos (puedes reemplazar con llamada a servicio)
    console.log('Datos enviados:', this.evaluationForm.value);

    this.snackBar.open('¡Evaluación enviada correctamente!', 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success']
    });

    this.markCourseEvaluated(this.evaluationForm.value.courseId);
    this.resetEvaluation();
  }

  private markCourseEvaluated(courseId: number): void {
    const course = this.enrolledCourses.find(c => c.id === courseId);
    if (course) {
      course.evaluated = true;
    }
  }
}
