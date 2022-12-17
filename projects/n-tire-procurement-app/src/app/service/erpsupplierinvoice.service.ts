import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsupplierinvoice } from '../model/erpsupplierinvoice.model';
import { erpsupplierinvoicedetail } from '../model/erpsupplierinvoicedetail.model';
import { environment } from '../../environments/environment';
import { IerpsupplierinvoiceResponse } from '../model/erpsupplierinvoice.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsupplierinvoiceService {
  formData: erpsupplierinvoice;
  readonly rootURL = AppConstants.baseURL;
  list: erpsupplierinvoice[];
  erpsupplierinvoicedetails: erpsupplierinvoicedetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsupplierinvoices():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpsupplierinvoicedetails: this.erpsupplierinvoicedetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierinvoice', body);
  }
  }

  saveOrUpdateerpsupplierinvoicesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierinvoice', body);
  }
  }

  geterpsupplierinvoicesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierinvoice').toPromise();
  }
  }
  getListByinvoiceid(invoiceid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierinvoice'+'/invoiceid/'+invoiceid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierinvoice'+'/param/'+key).toPromise();
  }
  }


  geterpsupplierinvoicesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierinvoice'+'/e/'+id).toPromise();
  }
  }
  geterpsupplierinvoicesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierinvoice'+'/'+id).toPromise();
  }
  }

  deleteerpsupplierinvoice(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsupplierinvoice'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpsupplierinvoicedetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierinvoice')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

