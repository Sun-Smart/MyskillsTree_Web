import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsalesorderpaymentterm } from '../model/erpsalesorderpaymentterm.model';
import { environment } from '../../environments/environment';
import { IerpsalesorderpaymenttermResponse } from '../model/erpsalesorderpaymentterm.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsalesorderpaymenttermService {
  formData: erpsalesorderpaymentterm;
  readonly rootURL = AppConstants.baseURL;
  list: erpsalesorderpaymentterm[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsalesorderpaymentterms():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsalesorderpaymentterm', body);
  }
  }

  saveOrUpdateerpsalesorderpaymenttermsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsalesorderpaymentterm', body);
  }
  }

  geterpsalesorderpaymenttermsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsalesorderpaymentterm').toPromise();
  }
  }
  getListBypaytermid(paytermid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsalesorderpaymentterm'+'/paytermid/'+paytermid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsalesorderpaymentterm'+'/param/'+key).toPromise();
  }
  }


  geterpsalesorderpaymenttermsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsalesorderpaymentterm'+'/e/'+id).toPromise();
  }
  }
  geterpsalesorderpaymenttermsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsalesorderpaymentterm'+'/'+id).toPromise();
  }
  }

  deleteerpsalesorderpaymentterm(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsalesorderpaymentterm'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsalesorderpaymentterm')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

