import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalcustomerinvoice } from '../model/legalcustomerinvoice.model';
import { legalcustomerinvoicedetail } from '../model/legalcustomerinvoicedetail.model';
import { environment } from '../../environments/environment';
import { IlegalcustomerinvoiceResponse } from '../model/legalcustomerinvoice.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalcustomerinvoiceService {
  formData: legalcustomerinvoice;
  readonly rootURL = AppConstants.baseURL;
  list: legalcustomerinvoice[];
  legalcustomerinvoicedetails: legalcustomerinvoicedetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalcustomerinvoices():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      legalcustomerinvoicedetails: this.legalcustomerinvoicedetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcustomerinvoice', body);
  }
  }

  saveOrUpdatelegalcustomerinvoicesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcustomerinvoice', body);
  }
  }

  getlegalcustomerinvoicesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcustomerinvoice').toPromise();
  }
  }
  getListByinvoiceid(invoiceid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcustomerinvoice'+'/invoiceid/'+invoiceid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcustomerinvoice'+'/param/'+key).toPromise();
  }
  }


  getlegalcustomerinvoicesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcustomerinvoice'+'/e/'+id).toPromise();
  }
  }
  getlegalcustomerinvoicesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcustomerinvoice'+'/'+id).toPromise();
  }
  }

  deletelegalcustomerinvoice(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalcustomerinvoice'+'/'+id).toPromise();
  }
  }
clearList(){
this.legalcustomerinvoicedetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalcustomerinvoice')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

