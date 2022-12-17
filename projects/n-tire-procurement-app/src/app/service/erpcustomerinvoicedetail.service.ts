import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpcustomerinvoicedetail } from '../model/erpcustomerinvoicedetail.model';
import { environment } from '../../environments/environment';
import { IerpcustomerinvoicedetailResponse } from '../model/erpcustomerinvoicedetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpcustomerinvoicedetailService {
  formData: erpcustomerinvoicedetail;
  readonly rootURL = AppConstants.baseURL;
  list: erpcustomerinvoicedetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpcustomerinvoicedetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpcustomerinvoicedetail', body);
  }
  }

  saveOrUpdateerpcustomerinvoicedetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpcustomerinvoicedetail', body);
  }
  }

  geterpcustomerinvoicedetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcustomerinvoicedetail').toPromise();
  }
  }
  getListByinvoicedetailid(invoicedetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcustomerinvoicedetail'+'/invoicedetailid/'+invoicedetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcustomerinvoicedetail'+'/param/'+key).toPromise();
  }
  }


  geterpcustomerinvoicedetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcustomerinvoicedetail'+'/e/'+id).toPromise();
  }
  }
  geterpcustomerinvoicedetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcustomerinvoicedetail'+'/'+id).toPromise();
  }
  }

  deleteerpcustomerinvoicedetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpcustomerinvoicedetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpcustomerinvoicedetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

