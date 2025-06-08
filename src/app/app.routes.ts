import { Routes } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { EvaluacionComponent } from './evaluacion/evaluacion.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // <-- redirige a login
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent, // <-- cuando implementes el layout
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'report', component: ReportComponent },
      { path: 'evaluacion', component: EvaluacionComponent },
    ]
  },
  { path: '**', redirectTo: 'login' } // fallback
];
