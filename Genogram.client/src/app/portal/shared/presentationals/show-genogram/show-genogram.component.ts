import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgxGraphModule } from '@swimlane/ngx-graph';

@Component({
  selector: 'app-show-genogram',
  standalone: true,
  imports: [MatCardModule,NgxGraphModule, MatIconModule, CommonModule],
  templateUrl: './show-genogram.component.html',
  styleUrls: ['./show-genogram.component.scss']
})
export class ShowGenogramComponent {
  userName:any;
  closeGenogram(): void {
    this.dialogRef.close();
  }
  title = 'Genogram';
  nodes: any[] = [];
  links: any[] = [];
  isBrowser: boolean = false;
view: [number,number]=[400,400];

  constructor(public dialogRef: MatDialogRef<ShowGenogramComponent>,@Inject(MAT_DIALOG_DATA) public data: any, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const userName=localStorage.getItem('name');
      this.userName=userName;
      // Initialize the nodes and links only in the browser environment

      // Add the root node
      this.nodes.push({
        id: '0', // Convert to string
        label: `${userName}`,
        data: {
          color: 'lightblue', // Set the color here
          icon: 'person'      // Set the icon here (this can be a Material icon like 'person', 'home', etc.)
        }
      });

      // Populate nodes and links from the dialog data
      data.name.forEach((element: any) => {
        const nodeId = element.id.toString(); // Convert to string

        this.nodes.push({
          id: nodeId,
          label: `${element.firstName} ${element.lastName}`,
          data: {
            color: 'red', // Example: Color per node
            icon: 'person' // Example: Material icon
          }
        });

        // Create a relationship (link) between 'John Doe' and the new node
        this.links.push({
          id: `link-${nodeId}`,   // Convert id to string
          source: '0',            // John Doe's id as string
          target: nodeId,         // Current node's id as string
          label: element.relationship || 'Relation' // Default to 'Relation' if no relationship is provided
        });
      });

      // Additional relationships based on the data
      data.name.forEach((element1:any) => {
        if (element1.relationship === 'Brother' || element1.relationship === 'Sister') {
          data.name.forEach((element2:any) => {
            if (element2.relationship === 'Father' || element2.relationship === 'Mother') {
              this.links.push({
                id: `link-${element1.id}${element2.id}`,   // Convert id to string
                source: element1.id.toString(),            // Current node's id as string
                target: element2.id.toString(),         // Target node's id as string
                label: element2.relationship // Relationship label
              });
            }
          });
        }
      });
    }
  }
  // Calculate node width dynamically based on label length
  calculateNodeWidth(label: string): number {
    const baseWidth = 55;  // Minimum width of the node (for the icon and padding)
    const labelWidth = label.length *8; // Estimate width based on label length (10px per character)

    return labelWidth; // Return combined width
  }
}
