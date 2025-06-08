import { Component, OnInit } from '@angular/core';
import { EvaluacionService } from '../core/evaluacion.service';
import { CommonModule } from '@angular/common';    // Para *ngIf, *ngFor, etc.
import { ReactiveFormsModule } from '@angular/forms';  // Para formGroup
import {RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatButtonModule]  // Lo que uses  
})
export class ReportComponent implements OnInit {
  reportData: any[] = [];

  constructor(private evalService: EvaluacionService) {}

  ngOnInit(): void {
    this.reportData = this.evalService.getGroupedResults();
  }
}
