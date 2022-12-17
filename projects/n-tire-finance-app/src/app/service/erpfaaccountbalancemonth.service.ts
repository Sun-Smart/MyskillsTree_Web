import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpfaaccountbalancemonth } from '../model/erpfaaccountbalancemonth.model';
import { environment } from '../../environments/environment';
import { IerpfaaccountbalancemonthResponse } from '../model/erpfaaccountbalancemonth.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpfaaccountbalancemonthService {
  formData: erpfaaccountbalancemonth;
  readonly rootURL = AppConstants.ntirefinanceURL;
  list: erpfaaccountbalancemonth[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpfaaccountbalancemonths():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfaaccountbalancemonth', body);
  }
  }

  saveOrUpdateerpfaaccountbalancemonthsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfaaccountbalancemonth', body);
  }
  }

  geterpfaaccountbalancemonthsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountbalancemonth').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountbalancemonth'+'/param/'+key).toPromise();
  }
  }


  geterpfaaccountbalancemonthsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountbalancemonth'+'/e/'+id).toPromise();
  }
  }
  geterpfaaccountbalancemonthsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountbalancemonth'+'/'+id).toPromise();
  }
  }

  deleteerpfaaccountbalancemonth(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirefinanceURL + '/erpfaaccountbalancemonth'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountbalancemonth')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

