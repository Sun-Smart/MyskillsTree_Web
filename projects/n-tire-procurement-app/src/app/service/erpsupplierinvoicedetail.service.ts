import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsupplierinvoicedetail } from '../model/erpsupplierinvoicedetail.model';
import { environment } from '../../environments/environment';
import { IerpsupplierinvoicedetailResponse } from '../model/erpsupplierinvoicedetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsupplierinvoicedetailService {
  formData: erpsupplierinvoicedetail;
  readonly rootURL = AppConstants.baseURL;
  list: erpsupplierinvoicedetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsupplierinvoicedetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierinvoicedetail', body);
  }
  }

  saveOrUpdateerpsupplierinvoicedetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierinvoicedetail', body);
  }
  }

  geterpsupplierinvoicedetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierinvoicedetail').toPromise();
  }
  }
  getListByinvoicedetailid(invoicedetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierinvoicedetail'+'/invoicedetailid/'+invoicedetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierinvoicedetail'+'/param/'+key).toPromise();
  }
  }


  geterpsupplierinvoicedetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierinvoicedetail'+'/e/'+id).toPromise();
  }
  }
  geterpsupplierinvoicedetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierinvoicedetail'+'/'+id).toPromise();
  }
  }

  deleteerpsupplierinvoicedetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsupplierinvoicedetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierinvoicedetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

