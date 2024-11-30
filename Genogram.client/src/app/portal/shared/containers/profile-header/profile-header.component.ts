import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { GetUserDataService } from '../../../../core/services/getUserData/get-user-data.service';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../../../core/models/UserModel';
import { MatCardModule } from '@angular/material/card';
import { ChildDirectoryFormComponent } from '../../presentationals/child-directory-form/child-directory-form.component';
import { MatDialog } from '@angular/material/dialog';
import { RequestServicesService } from '../../../../core/services/request-services/request-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,CommonModule,MatCardModule],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent implements OnInit {
  @Input() userId: number=1;
  currentUser:UserModel| null=null;
  constructor(private getUserData:GetUserDataService,private dialog:MatDialog,private postingUserService:RequestServicesService,private router:Router) {
  }
  ngOnInit(): void {
    if (this.userId) {
      this.getUserData.UserData(this.userId).subscribe(
        (data) => {
          this.currentUser = data;
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChildDirectoryFormComponent, {
      width: '600px',
      data: { name: this.currentUser },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'false')
      this.postingUserService.SubmitUser(result).subscribe(
    data=>{
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    })
    });
  }
}
