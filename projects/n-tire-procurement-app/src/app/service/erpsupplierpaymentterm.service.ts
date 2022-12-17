import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsupplierpaymentterm } from '../model/erpsupplierpaymentterm.model';
import { environment } from '../../environments/environment';
import { IerpsupplierpaymenttermResponse } from '../model/erpsupplierpaymentterm.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsupplierpaymenttermService {
  formData: erpsupplierpaymentterm;
  readonly rootURL = AppConstants.baseURL;
  list: erpsupplierpaymentterm[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsupplierpaymentterms():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierpaymentterm', body);
  }
  }

  saveOrUpdateerpsupplierpaymenttermsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierpaymentterm', body);
  }
  }

  geterpsupplierpaymenttermsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpaymentterm').toPromise();
  }
  }
  getListBysupplierpaytermid(supplierpaytermid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpaymentterm'+'/supplierpaytermid/'+supplierpaytermid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpaymentterm'+'/param/'+key).toPromise();
  }
  }


  geterpsupplierpaymenttermsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpaymentterm'+'/e/'+id).toPromise();
  }
  }
  geterpsupplierpaymenttermsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpaymentterm'+'/'+id).toPromise();
  }
  }

  deleteerpsupplierpaymentterm(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsupplierpaymentterm'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpaymentterm')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IerpsupplierpaymenttermResponse> {
return this.http.get<IerpsupplierpaymenttermResponse>(AppConstants.ntireprocurementURL+'/erpsupplierpaymentterm')
.pipe(
tap((response: IerpsupplierpaymenttermResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(erpsupplierpaymentterm => new erpsupplierpaymentterm(erpsupplierpaymentterm.supplierid,erpsupplierpaymentterm.supplieriddesc,erpsupplierpaymentterm.supplieritemid,erpsupplierpaymentterm.supplieritemiddesc,erpsupplierpaymentterm.supplierpaytermid,erpsupplierpaymentterm.paymenttermtype,erpsupplierpaymentterm.paymenttermtypedesc,erpsupplierpaymentterm.percentage,erpsupplierpaymentterm.description,erpsupplierpaymentterm.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(erpsupplierpaymentterm => erpsupplierpaymentterm.description.includes(filter.name))

return response;
})
);
}



}

