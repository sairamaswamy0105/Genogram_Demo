  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  import { UserModel } from '../../models/UserModel';
import { environment } from '../../../../environments/environment';

  @Injectable({
    providedIn: 'root'
  })
  export class GetUserDataService {
    private baseUrl = `${environment.apiUrl}/User/1`;
    constructor(private httpClient:HttpClient) {
     }
    UserData(userId:number):Observable<UserModel>
    {
      return this.httpClient.get<UserModel>(`${environment.apiUrl}/User/${userId}`);
    }
  }
