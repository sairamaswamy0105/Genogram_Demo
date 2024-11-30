import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UserFormComponent } from '../../presentationals/user-form/user-form.component';
import { PostingRelationsDataService } from '../../../../core/services/postRelationsData/posting-relations-data.service';
import { Router } from '@angular/router';
import { ShowGenogramComponent } from '../../presentationals/show-genogram/show-genogram.component';
import { UserRelationalModel } from '../../../../core/models/UserModel';

@Component({
  selector: 'app-contacts-section',
  standalone: true,
  imports: [MatIconModule,MatButtonModule],
  templateUrl: './contacts-section.component.html',
  styleUrl: './contacts-section.component.scss'
})
export class ContactsSectionComponent {
  constructor(private dialog:MatDialog,private postingRelationService:PostingRelationsDataService,private router:Router) {
  }
  @Input() userId: number=1;
  @Input() dataSource: UserRelationalModel[] = [];
  openDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '600px',
      data: { name: '',userId:this.userId },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'false')
      this.postingRelationService.SubmitData(result).subscribe(
    data=>{
      console.log(data);
      this.router.navigate([`/home/${result.userId}`]).then(() => {
        window.location.reload();
      });
    })
    });
  }
  openDialogBox()
  {
    const dialogRef=this.dialog.open(ShowGenogramComponent, {
      width: '600px',
      height:'650px',
      data: { name: this.dataSource },
    })
  }
  isDataSourceEmpty(): boolean {
    return !this.dataSource || this.dataSource.length === 0;
  }
}

