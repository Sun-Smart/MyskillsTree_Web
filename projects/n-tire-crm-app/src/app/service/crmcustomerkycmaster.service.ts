import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crmcustomerkycmaster } from '../model/crmcustomerkycmaster.model';
import { environment } from '../../environments/environment';
import { IcrmcustomerkycmasterResponse } from '../model/crmcustomerkycmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class crmcustomerkycmasterService {
  formData: crmcustomerkycmaster;
  readonly rootURL = AppConstants.baseURL;
  list: crmcustomerkycmaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecrmcustomerkycmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/crmcustomerkycmaster', body);
  }
  }

  saveOrUpdatecrmcustomerkycmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/crmcustomerkycmaster', body);
  }
  }

  getcrmcustomerkycmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomerkycmaster').toPromise();
  }
  }
  getListBykycid(kycid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomerkycmaster'+'/kycid/'+kycid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomerkycmaster'+'/param/'+key).toPromise();
  }
  }


  getcrmcustomerkycmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomerkycmaster'+'/e/'+id).toPromise();
  }
  }
  getcrmcustomerkycmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomerkycmaster'+'/'+id).toPromise();
  }
  }

  deletecrmcustomerkycmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/crmcustomerkycmaster'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/crmcustomerkycmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IcrmcustomerkycmasterResponse> {
return this.http.get<IcrmcustomerkycmasterResponse>(AppConstants.ntirecrmURL+'/crmcustomerkycmaster')
.pipe(
tap((response: IcrmcustomerkycmasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(crmcustomerkycmaster => new crmcustomerkycmaster(crmcustomerkycmaster.kycid,crmcustomerkycmaster.customerid,crmcustomerkycmaster.customeriddesc,crmcustomerkycmaster.identityname,crmcustomerkycmaster.identitynamedesc,crmcustomerkycmaster.identitynumber,crmcustomerkycmaster.issuedate,crmcustomerkycmaster.expirydate,crmcustomerkycmaster.renewalrequired,crmcustomerkycmaster.customfield,crmcustomerkycmaster.attachment,crmcustomerkycmaster.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(crmcustomerkycmaster => crmcustomerkycmaster.identitynumber.includes(filter.name))

return response;
})
);
}



}

