import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erppurchaseordermaster } from '../model/erppurchaseordermaster.model';
import { erppurchaseorderdetail } from '../model/erppurchaseorderdetail.model';
import { erppurchaseorderpaymentterm } from '../model/erppurchaseorderpaymentterm.model';
import { environment } from '../../environments/environment';
import { IerppurchaseordermasterResponse } from '../model/erppurchaseordermaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erppurchaseordermasterService {
  formData: erppurchaseordermaster;
  readonly rootURL = AppConstants.baseURL;
  list: erppurchaseordermaster[];
  erppurchaseorderdetails: erppurchaseorderdetail[]=[];
  erppurchaseorderpaymentterms: erppurchaseorderpaymentterm[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerppurchaseordermasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erppurchaseorderdetails: this.erppurchaseorderdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erppurchaseorderpaymentterms: this.erppurchaseorderpaymentterms.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erppurchaseordermaster', body);
  }
  }

  saveOrUpdateerppurchaseordermastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erppurchaseordermaster', body);
  }
  }

  geterppurchaseordermastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaseordermaster').toPromise();
  }
  }
  getListBypoid(poid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaseordermaster'+'/poid/'+poid).toPromise();
  }
  }

  getListBysupplierid(supplierid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaseordermaster'+'/supplierid/'+supplierid).toPromise();
  }
  }

  getdefault():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaseordermaster'+'/getdefault').toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaseordermaster'+'/param/'+key).toPromise();
  }
  }


  geterppurchaseordermastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaseordermaster'+'/e/'+id).toPromise();
  }
  }
  geterppurchaseordermastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaseordermaster'+'/'+id).toPromise();
  }
  }

  deleteerppurchaseordermaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erppurchaseordermaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.erppurchaseorderdetails = [];
this.erppurchaseorderpaymentterms = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erppurchaseordermaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}

  getpoalldetails() {
    if (this.valid()) {
      return this.http.get(this.rootURL + "/erppurchaseordermaster/podetail").toPromise();
    }
  }

}

