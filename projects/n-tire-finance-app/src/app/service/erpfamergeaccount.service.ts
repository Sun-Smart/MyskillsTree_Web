import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpfamergeaccount } from '../model/erpfamergeaccount.model';
import { environment } from '../../environments/environment';
import { IerpfamergeaccountResponse } from '../model/erpfamergeaccount.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpfamergeaccountService {
  formData: erpfamergeaccount;
  readonly rootURL = AppConstants.ntirefinanceURL;
  list: erpfamergeaccount[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpfamergeaccounts():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfamergeaccount', body);
  }
  }

  saveOrUpdateerpfamergeaccountsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfamergeaccount', body);
  }
  }

  geterpfamergeaccountsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfamergeaccount').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfamergeaccount'+'/param/'+key).toPromise();
  }
  }


  geterpfamergeaccountsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfamergeaccount'+'/e/'+id).toPromise();
  }
  }
  geterpfamergeaccountsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfamergeaccount'+'/'+id).toPromise();
  }
  }

  deleteerpfamergeaccount(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirefinanceURL + '/erpfamergeaccount'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirefinanceURL + '/erpfamergeaccount')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

