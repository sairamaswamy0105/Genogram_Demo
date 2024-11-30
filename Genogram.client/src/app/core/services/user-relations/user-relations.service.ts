import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserRelationalModel } from '../../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserRelationsService {
  // Declare a BehaviorSubject that will hold a Map
  private relationsSubject = new BehaviorSubject<Map<string, number | string>>(new Map());
  relations$ = this.relationsSubject.asObservable();

  constructor() {
    this.initializeRelations();
  }

  // Initialize the relations with the provided familyMap
  private initializeRelations(): void {
    const familyMap = new Map<string, number | string>([
      ['Father', 1],
      ['Mother', 1],
      ['Brother', 'any'],
      ['Sister', 'any'],
      ['Grandfather',2],
      ['Grandmother',2],
      ['Guardian','any']
    ]);

    // Update the BehaviorSubject with the initial Map
    this.relationsSubject.next(familyMap);
  }

  // Method to update the Map in the BehaviorSubject
  updateRelations(updatedMap: Map<string, number | string>): void {
    this.relationsSubject.next(updatedMap);
  }

  // Method to add a new relation to the Map
  addRelation(key: string, value: number | string): void {
    const currentMap = this.relationsSubject.getValue();
    currentMap.set(key, value);
    this.relationsSubject.next(currentMap);  // Push the updated map to the BehaviorSubject
  }
}
