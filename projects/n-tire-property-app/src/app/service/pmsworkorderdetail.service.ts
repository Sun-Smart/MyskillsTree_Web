import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmsworkorderdetail } from '../model/pmsworkorderdetail.model';
import { environment } from '../../environments/environment';
import { IpmsworkorderdetailResponse } from '../model/pmsworkorderdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmsworkorderdetailService {
  formData: pmsworkorderdetail;
  readonly rootURL = AppConstants.baseURL;
  list: pmsworkorderdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmsworkorderdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmsworkorderdetail', body);
  }
  }

  saveOrUpdatepmsworkorderdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmsworkorderdetail', body);
  }
  }

  getpmsworkorderdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsworkorderdetail').toPromise();
  }
  }
  getListByworkorderdetailid(workorderdetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsworkorderdetail'+'/workorderdetailid/'+workorderdetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsworkorderdetail'+'/param/'+key).toPromise();
  }
  }


  getpmsworkorderdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsworkorderdetail'+'/e/'+id).toPromise();
  }
  }
  getpmsworkorderdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsworkorderdetail'+'/'+id).toPromise();
  }
  }

  deletepmsworkorderdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmsworkorderdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmsworkorderdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IpmsworkorderdetailResponse> {
return this.http.get<IpmsworkorderdetailResponse>(AppConstants.ntirepropertyURL+'/pmsworkorderdetail')
.pipe(
tap((response: IpmsworkorderdetailResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(pmsworkorderdetail => new pmsworkorderdetail(pmsworkorderdetail.workorderdetailid,pmsworkorderdetail.workorderid,pmsworkorderdetail.workorderiddesc,pmsworkorderdetail.propertyid,pmsworkorderdetail.propertyiddesc,pmsworkorderdetail.description,pmsworkorderdetail.quantity,pmsworkorderdetail.amounteach,pmsworkorderdetail.totalamount,pmsworkorderdetail.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(pmsworkorderdetail => pmsworkorderdetail.description.includes(filter.name))

return response;
})
);
}



}

