import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from "../components/custom-sidenav/custom-sidenav.component";


@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule, RouterLink, RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, CustomSidenavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
