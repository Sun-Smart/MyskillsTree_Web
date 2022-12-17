import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erppurchaseorderpaymentterm } from '../model/erppurchaseorderpaymentterm.model';
import { environment } from '../../environments/environment';
import { IerppurchaseorderpaymenttermResponse } from '../model/erppurchaseorderpaymentterm.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erppurchaseorderpaymenttermService {
  formData: erppurchaseorderpaymentterm;
  readonly rootURL = AppConstants.baseURL;
  list: erppurchaseorderpaymentterm[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerppurchaseorderpaymentterms():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erppurchaseorderpaymentterm', body);
  }
  }

  saveOrUpdateerppurchaseorderpaymenttermsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erppurchaseorderpaymentterm', body);
  }
  }

  geterppurchaseorderpaymenttermsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaseorderpaymentterm').toPromise();
  }
  }
  getListBypaytermid(paytermid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaseorderpaymentterm'+'/paytermid/'+paytermid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaseorderpaymentterm'+'/param/'+key).toPromise();
  }
  }


  geterppurchaseorderpaymenttermsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaseorderpaymentterm'+'/e/'+id).toPromise();
  }
  }
  geterppurchaseorderpaymenttermsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaseorderpaymentterm'+'/'+id).toPromise();
  }
  }

  deleteerppurchaseorderpaymentterm(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erppurchaseorderpaymentterm'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erppurchaseorderpaymentterm')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IerppurchaseorderpaymenttermResponse> {
return this.http.get<IerppurchaseorderpaymenttermResponse>(AppConstants.ntireprocurementURL+'/erppurchaseorderpaymentterm')
.pipe(
tap((response: IerppurchaseorderpaymenttermResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(erppurchaseorderpaymentterm => new erppurchaseorderpaymentterm(erppurchaseorderpaymentterm.poid,erppurchaseorderpaymentterm.poiddesc,erppurchaseorderpaymentterm.customerid,erppurchaseorderpaymentterm.rfqid,erppurchaseorderpaymentterm.rfqiddesc,erppurchaseorderpaymentterm.quoteid,erppurchaseorderpaymentterm.quoteiddesc,erppurchaseorderpaymentterm.paytermid,erppurchaseorderpaymentterm.paymenttermtype,erppurchaseorderpaymentterm.paymenttermtypedesc,erppurchaseorderpaymentterm.percentage,erppurchaseorderpaymentterm.description,erppurchaseorderpaymentterm.currency,erppurchaseorderpaymentterm.amount,erppurchaseorderpaymentterm.approvalremarks,erppurchaseorderpaymentterm.apid,erppurchaseorderpaymentterm.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(erppurchaseorderpaymentterm => erppurchaseorderpaymentterm.description.includes(filter.name))

return response;
})
);
}



}

