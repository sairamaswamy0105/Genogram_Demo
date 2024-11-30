import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input'
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { UserRelationsService } from '../../../../core/services/user-relations/user-relations.service';
import { MatOptionModule } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';

export enum Relationship {
  Father = 'Father',
  Mother = 'Mother',
  Sister = 'Sister',
  Brother = 'Brother',
  Grandfather = 'Grandfather',
  Grandmother = 'Grandmother',
  Guardian = 'Guardian'
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
    MatSelectModule, 
    MatOptionModule,
     FormsModule,
  ],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit, AfterViewInit {

  availableRelations: Set<Relationship> = new Set();
  availableRelationsArray: Relationship[] = [];
  currentUserRelation: any;
  primaryContactCheck = false;


  updatedUser = new FormGroup({
    id: new FormControl(),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    relationship: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl('', [Validators.required]),
    primaryContact: new FormControl(false),
    userId: new FormControl(null),
    remarks:new FormControl('')
  });


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userRelationsService: UserRelationsService,private activatedRoute:ActivatedRoute
  ) {
  }
  ngAfterViewInit(): void {

    // Patch the values from data to the form controls
    this.updatedUser.patchValue({
      id: this.data.name.id || 0,
      firstName: this.data.name.firstName || '',
      lastName: this.data.name.lastName || '',
      relationship: this.data?.name?.relationship ? Relationship[this.data.name.relationship as keyof typeof Relationship] : '',
      phone: this.data.name.phone || '',
      email: this.data.name.email || '',
      primaryContact: this.data.name.primaryContact || false,
      userId: this.data.name.userId || this.data.userId || 1,
      remarks:this.data.name.remarks||'',
    });
  }

  ngOnInit() {
    this.availableRelations.add(Relationship.Father);
    this.availableRelations.add(Relationship.Mother);
    this.availableRelations.add(Relationship.Brother);
    this.availableRelations.add(Relationship.Sister);
    this.availableRelations.add(Relationship.Grandfather);
    this.availableRelations.add(Relationship.Grandmother);
    this.availableRelations.add(Relationship.Guardian);
    this.userRelationsService.relations$.subscribe((relations) => {
      relations.forEach((value, key) => {
        if (key == 'Father' && value == 1) {
          this.availableRelations.delete(Relationship.Father);
        }
        if (key == 'Mother' && value == 1) {
          this.availableRelations.delete(Relationship.Mother);
        }
        if (key == 'Grandfather' && typeof value === 'number' && value == 2) {
          this.availableRelations.delete(Relationship.Grandfather);
        }
        if (key == 'Grandmother' && typeof value === 'number' && value == 2) {
          this.availableRelations.delete(Relationship.Grandmother);
        }
      });
    });

    // Convert Set to array only once for rendering in the template
    this.availableRelationsArray = Array.from(this.availableRelations);
    if(this.data?.name?.relationship!="Sister" && this.data?.name?.relationship!="Brother" && this.data?.name?.relationship!="Guardian")
    {
      this.availableRelationsArray.push(this.data?.name?.relationship);
    }
    

    this.currentUserRelation = this.data?.name?.relationship ? Relationship[this.data.name.relationship as keyof typeof Relationship] : ''
    
  }



  get f() {
    return this.updatedUser.controls;
  }

}
