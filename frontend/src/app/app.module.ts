import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts'; // ✅ Asegúrate de que esté aquí
import {HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    NgChartsModule, // ✅ Este es necesario
    HttpClientModule, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
