import { Component, signal } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';



export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-custom-sidenav',
  imports: [MatListModule,MatIconModule,CommonModule],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css'
})
export class CustomSidenavComponent {

  menuItems = signal<MenuItem[]>([

    {
      icon:'dashboard',
      label:'Dashboard',
      route:'dashboard'
    }


  ]);
}

