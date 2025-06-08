import { Component, Input, signal } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import { RouterLink } from '@angular/router';



export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-custom-sidenav',
  imports: [MatListModule,MatIconModule,CommonModule, RouterLink],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css'
})
export class CustomSidenavComponent {

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean){
    this.sideNavCollapsed.set(val);
  }


  menuItems = signal<MenuItem[]>([

    {
      icon:'dashboard',
      label:'Dashboard',
      route:'/dashboard'
    },

    {
      icon:'report',
      label:'Reporte',
      route:'/report'
    },

    {
      icon:'book',
      label:'Evaluación',
      route:'/evaluacion'
    }


  ]);



}

