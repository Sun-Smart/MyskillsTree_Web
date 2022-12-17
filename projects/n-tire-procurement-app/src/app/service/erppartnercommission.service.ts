import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erppartnercommission } from '../model/erppartnercommission.model';
import { environment } from '../../environments/environment';
import { IerppartnercommissionResponse } from '../model/erppartnercommission.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erppartnercommissionService {
  formData: erppartnercommission;
  readonly rootURL = AppConstants.baseURL;
  list: erppartnercommission[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerppartnercommissions():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erppartnercommission', body);
  }
  }

  saveOrUpdateerppartnercommissionsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erppartnercommission', body);
  }
  }

  geterppartnercommissionsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppartnercommission').toPromise();
  }
  }
  getListBycommissionid(commissionid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppartnercommission'+'/commissionid/'+commissionid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppartnercommission'+'/param/'+key).toPromise();
  }
  }


  geterppartnercommissionsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppartnercommission'+'/e/'+id).toPromise();
  }
  }
  geterppartnercommissionsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppartnercommission'+'/'+id).toPromise();
  }
  }

  deleteerppartnercommission(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erppartnercommission'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erppartnercommission')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

