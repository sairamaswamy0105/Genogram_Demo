import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProfileHeaderComponent } from '../../../portal/shared/containers/profile-header/profile-header.component';
import { TabsSectionComponent } from '../../../portal/shared/containers/tabs-section/tabs-section.component';
import { Router } from '@angular/router';
import { UserModel } from '../../../core/models/UserModel';
import { RequestServicesService } from '../../../core/services/request-services/request-services.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ChildDirectoryFormComponent } from '../../../portal/shared/presentationals/child-directory-form/child-directory-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule,CommonModule,MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  usersData:UserModel[]=[];
  constructor(private postingUserService:RequestServicesService,private dialog:MatDialog,private requestService:RequestServicesService,private router:Router) {
    requestService.GetAllUser().subscribe(
      data=>{
        this.usersData=data;
      }
    )
  }
  GetRelations(name:string, id: number) {
    localStorage.setItem('name',name);
    this.router.navigate([`home/${id}`]);
  }

    openDialog(): void {
      const dialogRef = this.dialog.open(ChildDirectoryFormComponent, {
        width: '600px',
        data: { name: '' },
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
