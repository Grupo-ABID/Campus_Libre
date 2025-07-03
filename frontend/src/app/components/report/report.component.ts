import { Component, OnInit } from '@angular/core';
import { EvaluacionService } from '../../core/evaluacion.service';
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
  styleUrl: './report.component.css',
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
        console.log('Datos cargados:', this.reportData);
      },
      error: (error) => {
        console.error('Error al cargar datos:', error);
      }
    });
  }
}
