import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vmsinviteperson } from '../model/vmsinviteperson.model';
import { environment } from '../../environments/environment';
import { IvmsinvitepersonResponse } from '../model/vmsinviteperson.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class vmsinvitepersonService {
  formData: vmsinviteperson;
  readonly rootURL = AppConstants.baseURL;
  list: vmsinviteperson[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatevmsinvitepersons():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirevisitorURL + '/vmsinviteperson', body);
  }
  }

  saveOrUpdatevmsinvitepersonsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirevisitorURL + '/vmsinviteperson', body);
  }
  }

  getvmsinvitepersonsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsinviteperson').toPromise();
  }
  }
  getListByinvitationpersonid(invitationpersonid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsinviteperson'+'/invitationpersonid/'+invitationpersonid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsinviteperson'+'/param/'+key).toPromise();
  }
  }


  getvmsinvitepersonsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsinviteperson'+'/e/'+id).toPromise();
  }
  }
  getvmsinvitepersonsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsinviteperson'+'/'+id).toPromise();
  }
  }

  deletevmsinviteperson(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirevisitorURL + '/vmsinviteperson'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirevisitorURL + '/vmsinviteperson')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IvmsinvitepersonResponse> {
return this.http.get<IvmsinvitepersonResponse>(AppConstants.ntirevisitorURL+'/vmsinviteperson')
.pipe(
tap((response: IvmsinvitepersonResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(vmsinviteperson => new vmsinviteperson(vmsinviteperson.invitationid,vmsinviteperson.invitationpersonid,vmsinviteperson.firstname,vmsinviteperson.lastname,vmsinviteperson.email,vmsinviteperson.mobile,vmsinviteperson.language,vmsinviteperson.languagedesc,vmsinviteperson.reserveparking,vmsinviteperson.carregistrationno,vmsinviteperson.parkingslot,vmsinviteperson.invitestatus,vmsinviteperson.invitestatusdesc,vmsinviteperson.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(vmsinviteperson => vmsinviteperson.lastname.includes(filter.name))

return response;
})
);
}



}

