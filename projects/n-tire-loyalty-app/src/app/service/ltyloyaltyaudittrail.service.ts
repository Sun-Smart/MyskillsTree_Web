import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltyloyaltyaudittrail } from '../model/ltyloyaltyaudittrail.model';
import { environment } from '../../environments/environment';
import { IltyloyaltyaudittrailResponse } from '../model/ltyloyaltyaudittrail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltyloyaltyaudittrailService {
  formData: ltyloyaltyaudittrail;
  readonly rootURL = AppConstants.baseURL;
  list: ltyloyaltyaudittrail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltyloyaltyaudittrails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltyloyaltyaudittrail', body);
  }
  }

  saveOrUpdateltyloyaltyaudittrailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltyloyaltyaudittrail', body);
  }
  }

  getltyloyaltyaudittrailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyloyaltyaudittrail').toPromise();
  }
  }
  getListBytransactionid(transactionid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyloyaltyaudittrail'+'/transactionid/'+transactionid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyloyaltyaudittrail'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyloyaltyaudittrail'+'/param/'+key).toPromise();
  }
  }


  getltyloyaltyaudittrailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyloyaltyaudittrail'+'/e/'+id).toPromise();
  }
  }
  getltyloyaltyaudittrailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyloyaltyaudittrail'+'/'+id).toPromise();
  }
  }

  deleteltyloyaltyaudittrail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/ltyloyaltyaudittrail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/ltyloyaltyaudittrail')
.toPromise()
.then(res => this.list = res as any[]);
}
}
  getltyloyaltyaudittrailsListbymonthwise(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyloyaltyaudittrail/'+dt+'').toPromise();
  }
  }



}

