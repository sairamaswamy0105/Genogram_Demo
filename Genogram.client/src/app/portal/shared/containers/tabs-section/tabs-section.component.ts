import { Component, Input, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ContactsSectionComponent } from '../contacts-section/contacts-section.component';
import { ContactsTableComponent } from '../contacts-table/contacts-table.component';
import { UserRelationalModel } from '../../../../core/models/UserModel';
import { GetAllRelationsOfUserService } from '../../../../core/services/getAllRelationsOfUser/get-all-relations-of-user.service';
import { UserRelationsService } from '../../../../core/services/user-relations/user-relations.service';
@Component({
  selector: 'app-tabs-section',
  standalone: true,
  imports: [MatTabsModule,ContactsSectionComponent,ContactsTableComponent],
  templateUrl: './tabs-section.component.html',
  styleUrl: './tabs-section.component.scss'
})
export class TabsSectionComponent implements OnInit {
  @Input() userId: number=1;
  dataSource :UserRelationalModel[]=[];
  constructor(private getRelativesData:GetAllRelationsOfUserService,private userRelationsService: UserRelationsService) {
    
  }
ngOnInit(): void {
  this.getRelativesData.GetRelations(this.userId).subscribe(
    data => {
      this.dataSource = data || [];
        // Convert the fetched data into a Map format expected by the service
    const relationsMap = this.convertToRelationsMap(this.dataSource);

    // Update the relations in the service
    this.userRelationsService.updateRelations(relationsMap);

    }
  );
}
  selectedIndex = 2;
  displayedColumns = ['edit','firstName', 'lastName', 'relationship', 'phone', 'email', 'primaryContact', 'remarks'];


  

  private convertToRelationsMap(data: UserRelationalModel[]): Map<string, number | string> {
    const map = new Map<string, number | string>();

  data.forEach(item => {
    if (item.relationship && item.id) {
      if (item.relationship !== 'Brother' && 
          item.relationship !== 'Sister' && 
          item.relationship !== 'Guardian') {
        // Increment the count if the relationship already exists, or initialize with 1
        const currentCount = map.get(item.relationship) as number;
        map.set(item.relationship, currentCount ? currentCount + 1 : 1);
      } else {
        // For 'Brother', 'Sister', or 'Guardian', set the value as 'any'
        map.set(item.relationship, 'any');
      }
    }
  });

  return map;
  }
}
