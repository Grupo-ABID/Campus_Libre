import { Component, OnInit } from '@angular/core';
import { EvaluacionService } from '../../core/evaluacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';    // Para *ngIf, *ngFor, etc.
import { ReactiveFormsModule } from '@angular/forms';  // Para formGroup
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card'; 
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { MatDialogModule, MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatListModule } from '@angular/material/list'; 
import { MatIconModule } from '@angular/material/icon'; 


@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss'],
  standalone:true,
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
    MatIconModule,
    MatListModule
  ]  
})


export class EvaluacionComponent implements OnInit {
  enrolledCourses: any[] = [];
  selectedCourse: any = null;
  warningUnrated: boolean = false;
  evaluationForm!: FormGroup;



  constructor(private fb: FormBuilder,
              private dialog: MatDialog, 
              private snackBar: MatSnackBar, 
              // Se inyecta el servicio
              private evaluacionService: EvaluacionService) {}

  ngOnInit(): void {
    this.loadCourses();

    this.evaluationForm = this.fb.group({
      curso: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
      comment: ['', Validators.required]
    });
  }

  loadCourses(): void {
    // Reemplazar la simulación con el llamado al backend
    this.evaluacionService.getEnrolledCourses().subscribe({
      next: (data) => {
        this.enrolledCourses = data;
        this.warningUnrated = this.enrolledCourses.some((c) => !c.evaluated);

        
        if (this.enrolledCourses.length > 0 && !this.selectedCourse) {
          const PrimeroSinEvaluar = this.enrolledCourses.find(c => !c.evaluated);
          if (PrimeroSinEvaluar) {
             this.selectCourse(PrimeroSinEvaluar);
          } else {
             this.selectCourse(this.enrolledCourses[0]); // Selecciona el primero si todos están evaluados
          }
        }
      },
      error: (err) => {
        console.error('Error al cargar los cursos:', err);
        this.snackBar.open(
          'Error al cargar los cursos. Inténtalo de nuevo.',
          'Cerrar',
          {
            duration: 3000,
            panelClass: ['snackbar-error'],
          }
        );
      },
    });
  }

  selectCourse(course: any): void {
    this.selectedCourse = course;
    this.evaluationForm.patchValue({
      curso: course.id,
      rating: '',
      comment: ''
    });

    if (course.evaluated){
      this.evaluationForm.disable();

      this.snackBar.open('este curso ya ha sido evaluado', 'cerrar',{
        duration:3000,
        panelClass: ['snackbar.info']
      });
    } else {
      this.evaluationForm.enable();
    }
  }

  cancelEvaluation(): void {
    const referenciaDialog = this.dialog.open(DialogComponent, {
      width:'350px',
    });

    referenciaDialog.afterClosed().subscribe(result => {
      if (result){

        this.selectedCourse = null;
        this.evaluationForm.reset();
        this.loadCourses();
      }
    });
  }

  onSubmit(): void {
    if (this.evaluationForm.invalid) {
      this.evaluationForm.markAllAsTouched();
      return;
    }

    const payload = {
      curso: this.evaluationForm.value.curso,
      nota: this.evaluationForm.value.rating,
      comentario: this.evaluationForm.value.comment,
    };

    this.evaluacionService.saveEvaluation(payload).subscribe({
      next: (response) => {
        console.log('Evaluación enviada con éxito:', response);
        this.snackBar.open('¡Evaluación enviada correctamente!', 'Cerrar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['snackbar-success'],
        });

        // Actualizar el estado del curso en el frontend después de una evaluación exitosa
        if (this.selectedCourse) {
          const index = this.enrolledCourses.findIndex(
            (c) => c.id === this.selectedCourse!.id
          );
          if (index !== -1) {
            this.enrolledCourses[index].evaluated = true;
          }
        }

        // Restablecer el formulario y recargar la lista de cursos
        this.selectedCourse = null;
        this.evaluationForm.reset();
        this.loadCourses(); // Recargar los cursos para que el estado 'evaluated' se actualice

      },
      error: (error) => {
        console.error('Error al enviar la evaluación:', error);
        this.snackBar.open(
          'Error al enviar la evaluación. Por favor, inténtalo de nuevo.',
          'Cerrar',
          {
            duration: 5000,
            panelClass: ['snackbar-error'],
          }
        );
      },
    });
  }
}
