import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpquotationpaymentterm } from '../model/erpquotationpaymentterm.model';
import { environment } from '../../environments/environment';
import { IerpquotationpaymenttermResponse } from '../model/erpquotationpaymentterm.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpquotationpaymenttermService {
  formData: erpquotationpaymentterm;
  readonly rootURL = AppConstants.baseURL;
  list: erpquotationpaymentterm[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpquotationpaymentterms():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpquotationpaymentterm', body);
  }
  }

  saveOrUpdateerpquotationpaymenttermsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpquotationpaymentterm', body);
  }
  }

  geterpquotationpaymenttermsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpquotationpaymentterm').toPromise();
  }
  }
  getListBypaytermid(paytermid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpquotationpaymentterm'+'/paytermid/'+paytermid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpquotationpaymentterm'+'/param/'+key).toPromise();
  }
  }


  geterpquotationpaymenttermsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpquotationpaymentterm'+'/e/'+id).toPromise();
  }
  }
  geterpquotationpaymenttermsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpquotationpaymentterm'+'/'+id).toPromise();
  }
  }

  deleteerpquotationpaymentterm(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpquotationpaymentterm'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpquotationpaymentterm')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

