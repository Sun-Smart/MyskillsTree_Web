import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpfapayment } from '../model/erpfapayment.model';
import { erpfapaymentdetail } from '../model/erpfapaymentdetail.model';
import { environment } from '../../environments/environment';
import { IerpfapaymentResponse } from '../model/erpfapayment.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpfapaymentService {
  formData: erpfapayment;
  readonly rootURL = AppConstants.baseURL;
  list: erpfapayment[];
  erpfapaymentdetails: erpfapaymentdetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpfapayments():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpfapaymentdetails: this.erpfapaymentdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfapayment', body);
  }
  }

  saveOrUpdateerpfapaymentsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfapayment', body);
  }
  }

  geterpfapaymentsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfapayment').toPromise();
  }
  }
  getListBypaymentid(paymentid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfapayment'+'/paymentid/'+paymentid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfapayment'+'/param/'+key).toPromise();
  }
  }


  geterpfapaymentsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfapayment'+'/e/'+id).toPromise();
  }
  }
  geterpfapaymentsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfapayment'+'/'+id).toPromise();
  }
  }

  deleteerpfapayment(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirefinanceURL + '/erpfapayment'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpfapaymentdetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirefinanceURL + '/erpfapayment')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

