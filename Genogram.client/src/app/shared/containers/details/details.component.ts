import { Component } from '@angular/core';
import { ProfileHeaderComponent } from '../../../portal/shared/containers/profile-header/profile-header.component';
import { TabsSectionComponent } from '../../../portal/shared/containers/tabs-section/tabs-section.component';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { parse } from 'path';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MatIconModule,MatCardModule,ProfileHeaderComponent,TabsSectionComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {

  userId: number=0;  // Initialize userId as a property

  constructor(private activatedRoute: ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      // Safely access 'id' with optional chaining and fallback to '0' if 'id' is nullish
      const id = params.get('id');
      this.userId = id ? +id : 1;  
    });
  }
  GotoHome() {
    this.router.navigate(['/']);
    }
}
