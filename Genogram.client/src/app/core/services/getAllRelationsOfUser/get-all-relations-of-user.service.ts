import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { UserRelationalModel } from '../../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class GetAllRelationsOfUserService {
  private baseUrl = `${environment.apiUrl}/UserRelations/1`;

  constructor(private httpClient:HttpClient) { }
  GetRelations(userId:number):Observable<UserRelationalModel[]>
  {
    return this.httpClient.get<UserRelationalModel[]>(`${environment.apiUrl}/UserRelations/${userId}/relations`);
  }
}
