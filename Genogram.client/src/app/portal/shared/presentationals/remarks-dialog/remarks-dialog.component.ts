import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-remarks-dialog',
  standalone: true,
  imports: [MatDialogModule,MatIconModule],
  templateUrl: './remarks-dialog.component.html',
  styleUrl: './remarks-dialog.component.scss'
})
export class RemarksDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA)public data:any,public dialogRef: MatDialogRef<RemarksDialogComponent>){}
  closeDialog(): void {
    this.dialogRef.close();
  }
}
