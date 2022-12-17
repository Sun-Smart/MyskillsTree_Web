import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmsschedule } from '../model/pmsschedule.model';
import { environment } from '../../environments/environment';
import { IpmsscheduleResponse } from '../model/pmsschedule.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmsscheduleService {
  formData: pmsschedule;
  readonly rootURL = AppConstants.baseURL;
  list: pmsschedule[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmsschedules():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmsschedule', body);
  }
  }

  saveOrUpdatepmsschedulesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmsschedule', body);
  }
  }

  getpmsschedulesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsschedule').toPromise();
  }
  }
  getListByscheduleid(scheduleid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsschedule'+'/scheduleid/'+scheduleid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsschedule'+'/param/'+key).toPromise();
  }
  }


  getpmsschedulesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsschedule'+'/e/'+id).toPromise();
  }
  }
  getpmsschedulesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsschedule'+'/'+id).toPromise();
  }
  }

  deletepmsschedule(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmsschedule'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmsschedule')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IpmsscheduleResponse> {
return this.http.get<IpmsscheduleResponse>(AppConstants.ntirepropertyURL+'/pmsschedule')
.pipe(
tap((response: IpmsscheduleResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(pmsschedule => new pmsschedule(pmsschedule.scheduleid,pmsschedule.propertyid,pmsschedule.propertyiddesc,pmsschedule.tenantid,pmsschedule.tenantiddesc,pmsschedule.unitid,pmsschedule.unitiddesc,pmsschedule.ownerid,pmsschedule.owneriddesc,pmsschedule.description,pmsschedule.details,pmsschedule.workordertype,pmsschedule.workordertypedesc,pmsschedule.workorderfrequency,pmsschedule.workorderfrequencydesc,pmsschedule.recurringstartdate,pmsschedule.noenddate,pmsschedule.recurringenddate,pmsschedule.priority,pmsschedule.prioritydesc,pmsschedule.attachment,pmsschedule.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(pmsschedule => pmsschedule.description.includes(filter.name))

return response;
})
);
}



}

