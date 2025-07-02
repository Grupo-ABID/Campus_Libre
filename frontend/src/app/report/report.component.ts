import { Component, OnInit } from '@angular/core';
import { EvaluacionService } from '../core/evaluacion.service';
import { CommonModule } from '@angular/common';    // Para *ngIf, *ngFor, etc.
import { ReactiveFormsModule } from '@angular/forms';  // Para formGroup
import {RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';     
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  standalone:true,
  imports: [MatListModule, MatDividerModule, MatCardModule, MatToolbarModule, CommonModule, ReactiveFormsModule, RouterLink, MatButtonModule]  // Lo que uses  
})

export class ReportComponent implements OnInit {
  reportData: any[] = [];

  constructor(private evalService: EvaluacionService) {}

  ngOnInit(): void {
    this.evalService.getGroupedResults().subscribe({
      next: (data) => {
        this.reportData = data;
      }, 
    error: (error) => {
      console.error('Error al obtener datos:', error);
    }
  });


  }
}
