import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erppurchaseorderdetail } from '../model/erppurchaseorderdetail.model';
import { erppurchasesubdeliverydetail } from '../model/erppurchasesubdeliverydetail.model';
import { environment } from '../../environments/environment';
import { IerppurchaseorderdetailResponse } from '../model/erppurchaseorderdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erppurchaseorderdetailService {
  formData: erppurchaseorderdetail;
  readonly rootURL = AppConstants.baseURL;
  list: erppurchaseorderdetail[];
  erppurchasesubdeliverydetails: erppurchasesubdeliverydetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerppurchaseorderdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erppurchasesubdeliverydetails: this.erppurchasesubdeliverydetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erppurchaseorderdetail', body);
  }
  }

  saveOrUpdateerppurchaseorderdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erppurchaseorderdetail', body);
  }
  }

  geterppurchaseorderdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaseorderdetail').toPromise();
  }
  }
  getListBypodetailid(podetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaseorderdetail'+'/podetailid/'+podetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaseorderdetail'+'/param/'+key).toPromise();
  }
  }


  geterppurchaseorderdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaseorderdetail'+'/e/'+id).toPromise();
  }
  }
  geterppurchaseorderdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaseorderdetail'+'/'+id).toPromise();
  }
  }

  deleteerppurchaseorderdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erppurchaseorderdetail'+'/'+id).toPromise();
  }
  }
clearList(){
this.erppurchasesubdeliverydetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erppurchaseorderdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

