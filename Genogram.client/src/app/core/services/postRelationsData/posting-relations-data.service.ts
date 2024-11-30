import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { UserModel } from '../../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class PostingRelationsDataService {
  // /api/Home/addnewrelation
  private baseUrl = `${environment.apiUrl}/UserRelations/addnewrelation`;
  constructor(private httpClient:HttpClient) { }
  SubmitData(model:any)
  {
    return this.httpClient.post(this.baseUrl,model);
  }
}
