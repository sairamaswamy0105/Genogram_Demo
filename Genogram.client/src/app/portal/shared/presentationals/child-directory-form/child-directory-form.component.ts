import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-child-directory-form',
  standalone: true,
  imports: [MatDatepickerModule,MatButtonModule,MatInputModule,MatDialogModule,ReactiveFormsModule,MatFormFieldModule,CommonModule],
  providers: [
    {provide: DateAdapter, useClass: NativeDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}
 ],
  templateUrl: './child-directory-form.component.html',
  styleUrl: './child-directory-form.component.scss'
})
export class ChildDirectoryFormComponent implements OnInit {
  currentUser:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,private activatedRoute:ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.user.patchValue({
      id: this.data.name.id || 0,
      name: this.data.name.name || '',
      street: this.data.name.street || '',
      city: this.data?.name?.city||'',
      pincode: this.data.name.pincode || '',
      nationality: this.data.name.nationality || '',
      language: this.data.name.language || '',
      email: this.data.name.email || '',
      dateOfBirth:this.data.name.dateOfBirth||'',
      userImage:this.data.name.userImage||''
    });
    
  }
  user = new FormGroup({
    id: new FormControl(),
    name: new FormControl('', [Validators.required]),
    street: new FormControl(''),
    city: new FormControl(''),
    pincode: new FormControl(''),
    nationality: new FormControl('', [Validators.required]),
    language: new FormControl(''),
    email: new FormControl(''),
    dateOfBirth:new FormControl(''),
    userImage:new FormControl(''),
  });
  get f() {
    return this.user.controls;
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        const base64String = reader.result as string;
        // Store base64 string (without the data:image/... prefix)
        this.user.patchValue({
          userImage: base64String.split(',')[1] // only the base64 content without the prefix
        });
      };

      reader.readAsDataURL(file); // Convert to base64
    }
  }

  
}
