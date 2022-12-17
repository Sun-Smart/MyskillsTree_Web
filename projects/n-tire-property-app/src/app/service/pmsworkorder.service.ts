import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmsworkorder } from '../model/pmsworkorder.model';
import { pmsworkorderdetail } from '../model/pmsworkorderdetail.model';
import { environment } from '../../environments/environment';
import { IpmsworkorderResponse } from '../model/pmsworkorder.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmsworkorderService {
  formData: pmsworkorder;
  readonly rootURL = AppConstants.baseURL;
  list: pmsworkorder[];
  pmsworkorderdetails: pmsworkorderdetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmsworkorders():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      pmsworkorderdetails: this.pmsworkorderdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmsworkorder', body);
  }
  }

  saveOrUpdatepmsworkordersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmsworkorder', body);
  }
  }

  getpmsworkordersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsworkorder').toPromise();
  }
  }
  getListByworkorderid(workorderid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsworkorder'+'/workorderid/'+workorderid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsworkorder'+'/param/'+key).toPromise();
  }
  }


  getpmsworkordersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsworkorder'+'/e/'+id).toPromise();
  }
  }
  getpmsworkordersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsworkorder'+'/'+id).toPromise();
  }
  }

  deletepmsworkorder(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmsworkorder'+'/'+id).toPromise();
  }
  }
clearList(){
this.pmsworkorderdetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmsworkorder')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IpmsworkorderResponse> {
return this.http.get<IpmsworkorderResponse>(AppConstants.ntirepropertyURL+'/pmsworkorder')
.pipe(
tap((response: IpmsworkorderResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(pmsworkorder => new pmsworkorder(pmsworkorder.workorderid,pmsworkorder.propertyid,pmsworkorder.propertyiddesc,pmsworkorder.unitid,pmsworkorder.workorderno,pmsworkorder.tenantid,pmsworkorder.tenantiddesc,pmsworkorder.scheduleid,pmsworkorder.description,pmsworkorder.details,pmsworkorder.workordertype,pmsworkorder.workordertypedesc,pmsworkorder.workorderfrequency,pmsworkorder.workorderfrequencydesc,pmsworkorder.recurringstartdate,pmsworkorder.recurringenddate,pmsworkorder.noenddate,pmsworkorder.priority,pmsworkorder.prioritydesc,pmsworkorder.invoiceno,pmsworkorder.totalamount,pmsworkorder.suggestedperson,pmsworkorder.responsibleid,pmsworkorder.responsibleiddesc,pmsworkorder.visittype,pmsworkorder.visittypedesc,pmsworkorder.visitdate,pmsworkorder.visittime,pmsworkorder.duedate,pmsworkorder.leaseid,pmsworkorder.ownerid,pmsworkorder.owneriddesc,pmsworkorder.attachment,pmsworkorder.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(pmsworkorder => pmsworkorder.description.includes(filter.name))

return response;
})
);
}



}

