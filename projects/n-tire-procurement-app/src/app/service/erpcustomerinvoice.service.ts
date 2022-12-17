import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpcustomerinvoice } from '../model/erpcustomerinvoice.model';
import { erpcustomerinvoicedetail } from '../model/erpcustomerinvoicedetail.model';
import { environment } from '../../environments/environment';
import { IerpcustomerinvoiceResponse } from '../model/erpcustomerinvoice.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpcustomerinvoiceService {
  formData: erpcustomerinvoice;
  readonly rootURL = AppConstants.baseURL;
  list: erpcustomerinvoice[];
  erpcustomerinvoicedetails: erpcustomerinvoicedetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpcustomerinvoices():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpcustomerinvoicedetails: this.erpcustomerinvoicedetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpcustomerinvoice', body);
  }
  }

  saveOrUpdateerpcustomerinvoicesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpcustomerinvoice', body);
  }
  }

  geterpcustomerinvoicesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcustomerinvoice').toPromise();
  }
  }
  getListByinvoiceid(invoiceid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcustomerinvoice'+'/invoiceid/'+invoiceid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcustomerinvoice'+'/param/'+key).toPromise();
  }
  }


  geterpcustomerinvoicesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcustomerinvoice'+'/e/'+id).toPromise();
  }
  }
  geterpcustomerinvoicesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcustomerinvoice'+'/'+id).toPromise();
  }
  }

  deleteerpcustomerinvoice(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpcustomerinvoice'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpcustomerinvoicedetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpcustomerinvoice')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

