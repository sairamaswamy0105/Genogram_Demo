import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class RequestServicesService {

  constructor(private httpClient:HttpClient) {
   }
   GetAllUser():Observable<UserModel[]>
   {
    return this.httpClient.get<UserModel[]>(`${environment.apiUrl}/user/getallusers`);
   }
   SubmitUser(user:any)
   {
    return this.httpClient.post(`${environment.apiUrl}/user/addnewuser`,user);
   }
}
