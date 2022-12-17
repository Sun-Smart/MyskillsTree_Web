import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpfapaymentdetail } from '../model/erpfapaymentdetail.model';
import { environment } from '../../environments/environment';
import { IerpfapaymentdetailResponse } from '../model/erpfapaymentdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpfapaymentdetailService {
  formData: erpfapaymentdetail;
  readonly rootURL = AppConstants.baseURL;
  list: erpfapaymentdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpfapaymentdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfapaymentdetail', body);
  }
  }

  saveOrUpdateerpfapaymentdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfapaymentdetail', body);
  }
  }

  geterpfapaymentdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfapaymentdetail').toPromise();
  }
  }
  getListBypaymentdetailid(paymentdetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfapaymentdetail'+'/paymentdetailid/'+paymentdetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfapaymentdetail'+'/param/'+key).toPromise();
  }
  }


  geterpfapaymentdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfapaymentdetail'+'/e/'+id).toPromise();
  }
  }
  geterpfapaymentdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfapaymentdetail'+'/'+id).toPromise();
  }
  }

  deleteerpfapaymentdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirefinanceURL + '/erpfapaymentdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirefinanceURL + '/erpfapaymentdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

