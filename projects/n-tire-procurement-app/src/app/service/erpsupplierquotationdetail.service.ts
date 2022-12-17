import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsupplierquotationdetail } from '../model/erpsupplierquotationdetail.model';
import { environment } from '../../environments/environment';
import { IerpsupplierquotationdetailResponse } from '../model/erpsupplierquotationdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsupplierquotationdetailService {
  formData: erpsupplierquotationdetail;
  readonly rootURL = AppConstants.baseURL;
  list: erpsupplierquotationdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsupplierquotationdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierquotationdetail', body);
  }
  }

  saveOrUpdateerpsupplierquotationdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierquotationdetail', body);
  }
  }

  geterpsupplierquotationdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierquotationdetail').toPromise();
  }
  }
  getListByquotationdetailid(quotationdetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierquotationdetail'+'/quotationdetailid/'+quotationdetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierquotationdetail'+'/param/'+key).toPromise();
  }
  }


  geterpsupplierquotationdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierquotationdetail'+'/e/'+id).toPromise();
  }
  }
  geterpsupplierquotationdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierquotationdetail'+'/'+id).toPromise();
  }
  }

  deleteerpsupplierquotationdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsupplierquotationdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierquotationdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}



}

