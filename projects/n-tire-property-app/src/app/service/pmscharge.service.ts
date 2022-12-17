import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmscharge } from '../model/pmscharge.model';
import { environment } from '../../environments/environment';
import { IpmschargeResponse } from '../model/pmscharge.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmschargeService {
  formData: pmscharge;
  readonly rootURL = AppConstants.baseURL;
  list: pmscharge[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmscharges():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmscharge', body);
  }
  }

  saveOrUpdatepmschargesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmscharge', body);
  }
  }

  getpmschargesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmscharge').toPromise();
  }
  }
  getListBychargeid(chargeid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmscharge'+'/chargeid/'+chargeid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmscharge'+'/param/'+key).toPromise();
  }
  }


  getpmschargesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmscharge'+'/e/'+id).toPromise();
  }
  }
  getpmschargesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmscharge'+'/'+id).toPromise();
  }
  }

  deletepmscharge(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmscharge'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmscharge')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IpmschargeResponse> {
return this.http.get<IpmschargeResponse>(AppConstants.ntirepropertyURL+'/pmscharge')
.pipe(
tap((response: IpmschargeResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(pmscharge => new pmscharge(pmscharge.chargeid,pmscharge.leaseid,pmscharge.leaseiddesc,pmscharge.propertyid,pmscharge.propertyiddesc,pmscharge.unitid,pmscharge.unitiddesc,pmscharge.tenantid,pmscharge.tenantiddesc,pmscharge.ownerid,pmscharge.owneriddesc,pmscharge.datecharged,pmscharge.chargecycle,pmscharge.chargecycledesc,pmscharge.chargetype,pmscharge.chargetypedesc,pmscharge.consumption,pmscharge.chargeamount,pmscharge.duedate,pmscharge.paiddate,pmscharge.paidamount,pmscharge.paidmode,pmscharge.paidmodedesc,pmscharge.paidreference,pmscharge.nextduedate,pmscharge.notes,pmscharge.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(pmscharge => pmscharge.chargetype.includes(filter.name))

return response;
})
);
}



}

