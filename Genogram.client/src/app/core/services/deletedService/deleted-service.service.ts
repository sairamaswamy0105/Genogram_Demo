import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeletedServiceService {
  _url=`${environment.apiUrl}/UserRelations/deleteuserrelation/`;
  constructor(private httpclient:HttpClient) { }
  deleteUser(id:number)
  {
    return this.httpclient.delete(`${this._url}${id}`);
  }
}
