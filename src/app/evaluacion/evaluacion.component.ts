import { Component, OnInit } from '@angular/core';
import { EvaluacionService } from '../core/evaluacion.service';
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


@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss'],
  standalone:true,
  imports: [MatSnackBarModule, MatDialogModule, MatFormFieldModule, MatSelectModule, CommonModule, ReactiveFormsModule, MatSidenavModule, MatCardModule, MatButtonModule, MatInputModule, DialogComponent] // Lo que uses  
  // Lo que uses  
})


export class EvaluacionComponent implements OnInit {
  enrolledCourses: any[] = [];
  selectedCourse: any = null;
  warningUnrated: boolean = false;
  evaluationForm!: FormGroup;



  constructor(private fb: FormBuilder, private dialog: MatDialog, private snackBar: MatSnackBar) {}

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
      { id: 1, name: 'Matemáticas', evaluated: false },
      { id: 2, name: 'Matemáticas II', evaluated: true },
      { id: 3, name: 'Programación Orientada a Objetos', evaluated: false }
    ];

    // Lógica para advertencia (ejemplo)
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
    this.dialog.open(DialogComponent, {
      width:'350px',
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

    const data = this.evaluationForm.value;
    console.log('Datos enviados:', data);


    this.snackBar.open('¡Evaluación enviada correctamente!', 'Cerrar', {
      duration: 3000, // Duración en milisegundos (3 segundos)
      horizontalPosition: 'center', // Posición horizontal del snackbar
      verticalPosition: 'bottom', // Posición vertical del snackbar
      panelClass: ['snackbar-success'] // Clase CSS opcional para estilizado personalizado
    });
    
    if (this.selectedCourse) {
      const index = this.enrolledCourses.findIndex(c => c.id === this.selectedCourse!.id);
      if (index !== -1) {
        this.enrolledCourses[index].evaluated = true;
      }
    }
    
    this.selectedCourse = null;
    this.evaluationForm.reset();
    this.loadCourses();
  }
}
