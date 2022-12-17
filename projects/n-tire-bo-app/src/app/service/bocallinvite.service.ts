import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bocallinvite } from '../model/bocallinvite.model';
import { environment } from '../../environments/environment';
import { IbocallinviteResponse } from '../model/bocallinvite.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bocallinviteService {
  formData: bocallinvite;
  readonly rootURL = AppConstants.baseURL;
  list: bocallinvite[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebocallinvitees():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bocallinvite', body);
  }
  }

  saveOrUpdatebocallinviteesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bocallinvite', body);
  }
  }

  getbocallinviteesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocallinvite').toPromise();
  }
  }
  getListByinviteeid(inviteeid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocallinvite'+'/inviteeid/'+inviteeid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocallinvite'+'/param/'+key).toPromise();
  }
  }


  getbocallinviteesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocallinvite'+'/e/'+id).toPromise();
  }
  }
  getbocallinviteesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocallinvite'+'/'+id).toPromise();
  }
  }

  deletebocallinvite(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bocallinvite'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bocallinvite')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbocallinviteResponse> {
return this.http.get<IbocallinviteResponse>(AppConstants.ntireboURL+'/bocallinvite')
.pipe(
tap((response: IbocallinviteResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bocallinvite => new bocallinvite(bocallinvite.callid,bocallinvite.calliddesc,bocallinvite.inviteeid,bocallinvite.firstname,bocallinvite.lastname,bocallinvite.email,bocallinvite.mobile,bocallinvite.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bocallinvite => bocallinvite.lastname.includes(filter.name))

return response;
})
);
}



}

