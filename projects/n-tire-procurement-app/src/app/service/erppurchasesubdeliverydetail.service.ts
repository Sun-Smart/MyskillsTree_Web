import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erppurchasesubdeliverydetail } from '../model/erppurchasesubdeliverydetail.model';
import { environment } from '../../environments/environment';
import { IerppurchasesubdeliverydetailResponse } from '../model/erppurchasesubdeliverydetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erppurchasesubdeliverydetailService {
  formData: erppurchasesubdeliverydetail;
  readonly rootURL = AppConstants.baseURL;
  list: erppurchasesubdeliverydetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerppurchasesubdeliverydetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erppurchasesubdeliverydetail', body);
  }
  }

  saveOrUpdateerppurchasesubdeliverydetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erppurchasesubdeliverydetail', body);
  }
  }

  geterppurchasesubdeliverydetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchasesubdeliverydetail').toPromise();
  }
  }
  getListBysubdeliveryid(subdeliveryid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchasesubdeliverydetail'+'/subdeliveryid/'+subdeliveryid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchasesubdeliverydetail'+'/param/'+key).toPromise();
  }
  }


  geterppurchasesubdeliverydetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchasesubdeliverydetail'+'/e/'+id).toPromise();
  }
  }
  geterppurchasesubdeliverydetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchasesubdeliverydetail'+'/'+id).toPromise();
  }
  }

  deleteerppurchasesubdeliverydetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erppurchasesubdeliverydetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erppurchasesubdeliverydetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

