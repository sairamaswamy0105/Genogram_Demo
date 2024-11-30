import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { UserRelationalModel } from '../../../../core/models/UserModel';
import { PostingRelationsDataService } from '../../../../core/services/postRelationsData/posting-relations-data.service';
import { DeletedServiceService } from '../../../../core/services/deletedService/deleted-service.service';
import { DeleteDialogComponent } from '../../presentationals/delete-dialog/delete-dialog.component';
import { UserFormComponent } from '../../presentationals/user-form/user-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RemarksDialogComponent } from '../../presentationals/remarks-dialog/remarks-dialog.component';

@Component({
  selector: 'app-contacts-table',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatPaginatorModule, MatMenuModule, MatTableModule, MatCheckboxModule, MatIconModule, CommonModule, MatSortModule],
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss'],
})
export class ContactsTableComponent implements AfterViewInit {
  @Input() dataSource: UserRelationalModel[] = [];
  @Input() displayedColumns: string[] = [];

  matTableDataSource = new MatTableDataSource<UserRelationalModel>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private deletedService: DeletedServiceService,
    private dialog: MatDialog,
    private postingRelationService: PostingRelationsDataService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.updateTableDataSource();
  }

  ngOnChanges(): void {
    this.updateTableDataSource();
  }

  updateTableDataSource(): void {
    this.matTableDataSource.data = this.dataSource;
    this.matTableDataSource.sort = this.sort;
    this.matTableDataSource.paginator = this.paginator;
  }

  openDialogDelete(userdata: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { name: userdata } });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'false') {
        this.deletedService.deleteUser(userdata.id).subscribe(
          (data) => {
            console.log(data);
            this.router.navigate([`/home/${userdata.userId}`]).then(() => {
              window.location.reload();
            });
          },
          (error) => console.log(error.message)
        );
      }
    });
  }

  openDialogEdit(data: any): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '600px',
      data: { name: data },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'false') {
        this.postingRelationService.SubmitData(result).subscribe((data) => {
          console.log(data);
          this.router.navigate([`/home/${result.userId}`]).then(() => {
            window.location.reload();
          });
        });
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement)?.value || '';
    this.matTableDataSource.filter = filterValue.trim().toLowerCase();
    if (this.matTableDataSource.paginator) {
      this.matTableDataSource.paginator.firstPage();
    }
  }
  openDialogChat(data:string)
  {
    this.dialog.open(RemarksDialogComponent, {
      data: { name: data },
    });
  }
}
