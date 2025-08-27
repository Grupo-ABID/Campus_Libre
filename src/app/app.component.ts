import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { MatToolbarModule} from '@angular/material/toolbar';
import { DashboardComponent } from "./dashboard/dashboard.component";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Campus libre';
}
