import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpitembundledetail } from '../model/erpitembundledetail.model';
import { environment } from '../../environments/environment';
import { IerpitembundledetailResponse } from '../model/erpitembundledetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpitembundledetailService {
  formData: erpitembundledetail;
  readonly rootURL = AppConstants.baseURL;
  list: erpitembundledetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpitembundledetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpitembundledetail', body);
  }
  }

  saveOrUpdateerpitembundledetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpitembundledetail', body);
  }
  }

  geterpitembundledetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitembundledetail').toPromise();
  }
  }
  getListBybundledetailid(bundledetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitembundledetail'+'/bundledetailid/'+bundledetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitembundledetail'+'/param/'+key).toPromise();
  }
  }


  geterpitembundledetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitembundledetail'+'/e/'+id).toPromise();
  }
  }
  geterpitembundledetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitembundledetail'+'/'+id).toPromise();
  }
  }

  deleteerpitembundledetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpitembundledetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpitembundledetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

