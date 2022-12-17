import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erppurchaserequestdetail } from '../model/erppurchaserequestdetail.model';
import { environment } from '../../environments/environment';
import { IerppurchaserequestdetailResponse } from '../model/erppurchaserequestdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erppurchaserequestdetailService {
  formData: erppurchaserequestdetail;
  readonly rootURL = AppConstants.baseURL;
  list: erppurchaserequestdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerppurchaserequestdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erppurchaserequestdetail', body);
  }
  }

  saveOrUpdateerppurchaserequestdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erppurchaserequestdetail', body);
  }
  }

  geterppurchaserequestdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaserequestdetail').toPromise();
  }
  }
  getListByprsdetailid(prsdetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaserequestdetail'+'/prsdetailid/'+prsdetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaserequestdetail'+'/param/'+key).toPromise();
  }
  }


  geterppurchaserequestdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaserequestdetail'+'/e/'+id).toPromise();
  }
  }
  geterppurchaserequestdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaserequestdetail'+'/'+id).toPromise();
  }
  }

  deleteerppurchaserequestdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erppurchaserequestdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erppurchaserequestdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}

  getbudget(itemcategory: number, itemsubcategory: number) {
    if (this.valid()) {
      let httpParams = new HttpParams().set("itemcategory", itemcategory.toString()).set("itemsubcategory", itemsubcategory.toString());
      return this.http.get(this.rootURL + "/erppurchaserequest/getbudget", { params: httpParams }).toPromise();
    }
  }

}

