import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpqcdetail } from '../model/erpqcdetail.model';
import { environment } from '../../environments/environment';
import { IerpqcdetailResponse } from '../model/erpqcdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpqcdetailService {
  formData: erpqcdetail;
  readonly rootURL = AppConstants.baseURL;
  list: erpqcdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpqcdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpqcdetail', body);
  }
  }

  saveOrUpdateerpqcdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpqcdetail', body);
  }
  }

  geterpqcdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpqcdetail').toPromise();
  }
  }
  getListByqcdetailid(qcdetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpqcdetail'+'/qcdetailid/'+qcdetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpqcdetail'+'/param/'+key).toPromise();
  }
  }


  geterpqcdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpqcdetail'+'/e/'+id).toPromise();
  }
  }
  geterpqcdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpqcdetail'+'/'+id).toPromise();
  }
  }

  deleteerpqcdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpqcdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpqcdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

