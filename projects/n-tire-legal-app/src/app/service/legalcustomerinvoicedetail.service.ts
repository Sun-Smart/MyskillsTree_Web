import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalcustomerinvoicedetail } from '../model/legalcustomerinvoicedetail.model';
import { environment } from '../../environments/environment';
import { IlegalcustomerinvoicedetailResponse } from '../model/legalcustomerinvoicedetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalcustomerinvoicedetailService {
  formData: legalcustomerinvoicedetail;
  readonly rootURL = AppConstants.baseURL;
  list: legalcustomerinvoicedetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalcustomerinvoicedetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcustomerinvoicedetail', body);
  }
  }

  saveOrUpdatelegalcustomerinvoicedetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcustomerinvoicedetail', body);
  }
  }

  getlegalcustomerinvoicedetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcustomerinvoicedetail').toPromise();
  }
  }
  getListByinvoicedetailid(invoicedetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcustomerinvoicedetail'+'/invoicedetailid/'+invoicedetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcustomerinvoicedetail'+'/param/'+key).toPromise();
  }
  }


  getlegalcustomerinvoicedetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcustomerinvoicedetail'+'/e/'+id).toPromise();
  }
  }
  getlegalcustomerinvoicedetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcustomerinvoicedetail'+'/'+id).toPromise();
  }
  }

  deletelegalcustomerinvoicedetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalcustomerinvoicedetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalcustomerinvoicedetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

