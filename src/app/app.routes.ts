import { Routes } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    {path: 'report', component:ReportComponent},
    {path: 'evaluacion', component:EvaluacionComponent},
    {path: 'login', component:LoginComponent},
    {path: 'dashboard', component:DashboardComponent},
    {path: '', redirectTo: 'login', pathMatch: 'full'},
];
