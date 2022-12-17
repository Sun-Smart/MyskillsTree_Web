import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bomeetinginvite } from '../model/bomeetinginvite.model';
import { environment } from '../../environments/environment';
import { IbomeetinginviteResponse } from '../model/bomeetinginvite.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bomeetinginviteService {
  formData: bomeetinginvite;
  readonly rootURL = AppConstants.baseURL;
  list: bomeetinginvite[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebomeetinginvitees():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bomeetinginvite', body);
  }
  }

  saveOrUpdatebomeetinginviteesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bomeetinginvite', body);
  }
  }

  getbomeetinginviteesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomeetinginvite').toPromise();
  }
  }
  getListByinviteeid(inviteeid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomeetinginvite'+'/inviteeid/'+inviteeid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomeetinginvite'+'/param/'+key).toPromise();
  }
  }


  getbomeetinginviteesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomeetinginvite'+'/e/'+id).toPromise();
  }
  }
  getbomeetinginviteesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomeetinginvite'+'/'+id).toPromise();
  }
  }

  deletebomeetinginvite(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bomeetinginvite'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bomeetinginvite')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbomeetinginviteResponse> {
return this.http.get<IbomeetinginviteResponse>(AppConstants.ntireboURL+'/bomeetinginvite')
.pipe(
tap((response: IbomeetinginviteResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bomeetinginvite => new bomeetinginvite(bomeetinginvite.meetingid,bomeetinginvite.inviteeid,bomeetinginvite.firstname,bomeetinginvite.lastname,bomeetinginvite.email,bomeetinginvite.mobile,bomeetinginvite.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bomeetinginvite => bomeetinginvite.lastname.includes(filter.name))

return response;
})
);
}



}

