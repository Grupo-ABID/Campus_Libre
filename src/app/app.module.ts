import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts'; // ✅ Asegúrate de que esté aquí

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule // ✅ Este es necesario
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
