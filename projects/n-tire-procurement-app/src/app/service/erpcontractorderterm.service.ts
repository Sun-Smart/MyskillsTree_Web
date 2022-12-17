import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpcontractorderterm } from '../model/erpcontractorderterm.model';
import { environment } from '../../environments/environment';
import { IerpcontractordertermResponse } from '../model/erpcontractorderterm.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpcontractordertermService {
  formData: erpcontractorderterm;
  readonly rootURL = AppConstants.baseURL;
  list: erpcontractorderterm[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpcontractorderterms():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpcontractorderterm', body);
  }
  }

  saveOrUpdateerpcontractordertermsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpcontractorderterm', body);
  }
  }

  geterpcontractordertermsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderterm').toPromise();
  }
  }
  getListBycontracttermid(contracttermid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderterm'+'/contracttermid/'+contracttermid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderterm'+'/param/'+key).toPromise();
  }
  }


  geterpcontractordertermsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderterm'+'/e/'+id).toPromise();
  }
  }
  geterpcontractordertermsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderterm'+'/'+id).toPromise();
  }
  }

  deleteerpcontractorderterm(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpcontractorderterm'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderterm')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

