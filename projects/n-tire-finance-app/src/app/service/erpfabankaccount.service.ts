import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpfabankaccount } from '../model/erpfabankaccount.model';
import { environment } from '../../environments/environment';
import { IerpfabankaccountResponse } from '../model/erpfabankaccount.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpfabankaccountService {
  formData: erpfabankaccount;
  readonly rootURL = AppConstants.ntirefinanceURL;
  list: erpfabankaccount[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpfabankaccounts():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfabankaccount', body);
  }
  }

  saveOrUpdateerpfabankaccountsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfabankaccount', body);
  }
  }

  geterpfabankaccountsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfabankaccount').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfabankaccount'+'/param/'+key).toPromise();
  }
  }


  geterpfabankaccountsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfabankaccount'+'/e/'+id).toPromise();
  }
  }
  geterpfabankaccountsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfabankaccount'+'/'+id).toPromise();
  }
  }

  deleteerpfabankaccount(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirefinanceURL + '/erpfabankaccount'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirefinanceURL + '/erpfabankaccount')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

