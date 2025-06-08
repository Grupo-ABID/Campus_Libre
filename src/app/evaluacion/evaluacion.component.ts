import { Component, OnInit } from '@angular/core';
import { EvaluacionService } from '../core/evaluacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';    // Para *ngIf, *ngFor, etc.
import { ReactiveFormsModule } from '@angular/forms';  // Para formGroup

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.scss'],
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule]  // Lo que uses  
})
export class EvaluacionComponent implements OnInit {
  evaluationForm!: FormGroup;
  enrolledCourses: any[] = [];
  submitted = false;
  warningUnrated: boolean = false;

  constructor(private evalService: EvaluacionService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadCourses();
    this.evaluationForm = this.fb.group({
      courseId: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(7)]],
      comment: ['', Validators.required]
    });
  }

  loadCourses(): void {
    this.enrolledCourses = this.evalService.getEnrolledCourses();
    this.warningUnrated = this.enrolledCourses.some(c => !c.evaluated);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.evaluationForm.valid) {
      this.evalService.saveEvaluation(this.evaluationForm.value);
      alert('Evaluación enviada.');
      this.evaluationForm.reset();
      this.submitted = false;
      this.loadCourses();
    }
  }
}
