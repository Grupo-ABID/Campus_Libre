import { Component, OnInit } from '@angular/core';
import { EvaluacionService } from '../../core/evaluacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss'],
  standalone: true,
  imports: [
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class EvaluacionComponent implements OnInit {
  enrolledCourses: any[] = [];
  selectedCourse: any = null;
  warningUnrated: boolean = false;
  evaluationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private evalService: EvaluacionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCourses();

    this.evaluationForm = this.fb.group({
      courseId: [{value: '', disabled: true}, Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
      comment: ['', Validators.required],
    });
  }

  loadCourses(): void {
    this.evalService.getEnrolledCourses().subscribe({
      next: (courses) => {
        this.enrolledCourses = courses;
        this.warningUnrated = this.enrolledCourses.some((c) => !c.evaluated);
      },
      error: (error) => {
        console.error('Error al cargar cursos:', error);
      },
    });
  }

  selectCourse(course: any): void {
  this.selectedCourse = course;

  // Llamamos a la encuesta asociada
  this.evalService.getEncuestaByCurso(course.id).subscribe({
    next: (encuestas) => {
      if (encuestas.length > 0) {
        // Asignamos la primera encuesta encontrada
        this.selectedCourse.encuesta = encuestas[0];
        console.log('Encuesta encontrada:', this.selectedCourse.encuesta);

        // Actualizamos el formulario
        this.evaluationForm.patchValue({
          courseId: course.id,
          rating: '',
          comment: '',
        });
      } else {
        console.error('No se encontró encuesta para este curso.');
      }
    },
    error: (err) => console.error('Error al cargar la encuesta:', err)
  });
}

  cancelEvaluation(): void {
    this.dialog.open(DialogComponent, {
      width: '350px',
    });

    this.selectedCourse = null;
    this.evaluationForm.reset();
    this.loadCourses();
  }

  onSubmit(): void {
    if (this.evaluationForm.invalid) {
      this.evaluationForm.markAllAsTouched();
      return;
    }

    // 🔧 Ajusta estos IDs según lo que tengas en tu base
    const evaluacionPayload = {
      alumno: 2, // Cambiar por el alumno autenticado
      curso: this.selectedCourse.id,
      encuesta: this.selectedCourse.encuesta.id, // Deberia seleccionar la id de la encuesta
    };

    console.log('Enviando evaluación:', evaluacionPayload);

    this.evalService.saveEvaluation(evaluacionPayload).subscribe({
      next: (evaluacionResponse) => {
        console.log('Evaluación creada:', evaluacionResponse);

        const respuestaPayload = {
          evaluacion: evaluacionResponse.id,
          pregunta: 4, // Cambiar por la pregunta correspondiente
          valor: this.evaluationForm.value.rating,
          comentario: this.evaluationForm.value.comment,
        };

        console.log('Enviando respuesta:', respuestaPayload);

        this.evalService.saveRespuesta(respuestaPayload).subscribe({
          next: () => {
            console.log('Respuesta guardada correctamente');
            this.snackBar.open('¡Evaluación enviada correctamente!', 'Cerrar', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['snackbar-success'],
            });

            this.selectedCourse = null;
            this.evaluationForm.reset();
            this.loadCourses();
          },
          error: (err) => {
            console.error('Error al guardar respuesta:', err);
          },
        });
      },
      error: (error) => {
        console.error('Error al enviar evaluación:', error);
      },
    });
  }
}
