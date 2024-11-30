import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RequestServicesService } from './core/services/request-services/request-services.service';
import { UserModel } from './core/models/UserModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatCardModule,CommonModule,FormsModule,MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Genogram';
}
