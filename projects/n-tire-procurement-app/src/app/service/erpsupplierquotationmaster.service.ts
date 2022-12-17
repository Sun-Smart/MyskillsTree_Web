import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsupplierquotationmaster } from '../model/erpsupplierquotationmaster.model';
import { erpquotationpaymentterm } from '../model/erpquotationpaymentterm.model';
import { erpsupplierquotationdetail } from '../model/erpsupplierquotationdetail.model';
import { environment } from '../../environments/environment';
import { IerpsupplierquotationmasterResponse } from '../model/erpsupplierquotationmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsupplierquotationmasterService {
  formData: erpsupplierquotationmaster;
  readonly rootURL = AppConstants.baseURL;
  list: erpsupplierquotationmaster[];
  erpquotationpaymentterms: erpquotationpaymentterm[]=[];
  erpsupplierquotationdetails: erpsupplierquotationdetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsupplierquotationmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpquotationpaymentterms: this.erpquotationpaymentterms.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erpsupplierquotationdetails: this.erpsupplierquotationdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierquotationmaster', body);
  }
  }

  saveOrUpdateerpsupplierquotationmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierquotationmaster', body);
  }
  }

  geterpsupplierquotationmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierquotationmaster').toPromise();
  }
  }
  getListByquotationid(quotationid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierquotationmaster'+'/quotationid/'+quotationid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierquotationmaster'+'/param/'+key).toPromise();
  }
  }


  geterpsupplierquotationmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierquotationmaster'+'/e/'+id).toPromise();
  }
  }
  geterpsupplierquotationmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierquotationmaster'+'/'+id).toPromise();
  }
  }

  deleteerpsupplierquotationmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsupplierquotationmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpquotationpaymentterms = [];
this.erpsupplierquotationdetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierquotationmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

