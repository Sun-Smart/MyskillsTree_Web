import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpiltdetail } from '../model/erpiltdetail.model';
import { environment } from '../../environments/environment';
import { IerpiltdetailResponse } from '../model/erpiltdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpiltdetailService {
  formData: erpiltdetail;
  readonly rootURL = AppConstants.baseURL;
  list: erpiltdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpiltdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpiltdetail', body);
  }
  }

  saveOrUpdateerpiltdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpiltdetail', body);
  }
  }

  geterpiltdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpiltdetail').toPromise();
  }
  }
  getListByiltdetailid(iltdetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpiltdetail'+'/iltdetailid/'+iltdetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpiltdetail'+'/param/'+key).toPromise();
  }
  }


  geterpiltdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpiltdetail'+'/e/'+id).toPromise();
  }
  }
  geterpiltdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpiltdetail'+'/'+id).toPromise();
  }
  }

  deleteerpiltdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpiltdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpiltdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

