import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltycustomerreward } from '../model/ltycustomerreward.model';
import { environment } from '../../environments/environment';
import { IltycustomerrewardResponse } from '../model/ltycustomerreward.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltycustomerrewardService {
  formData: ltycustomerreward;
  readonly rootURL = AppConstants.baseURL;
  list: ltycustomerreward[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltycustomerrewards():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltycustomerreward', body);
  }
  }

  saveOrUpdateltycustomerrewardsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltycustomerreward', body);
  }
  }

  getltycustomerrewardsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomerreward').toPromise();
  }
  }
  getListBycustomerrewardid(customerrewardid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomerreward'+'/customerrewardid/'+customerrewardid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomerreward'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomerreward'+'/param/'+key).toPromise();
  }
  }


  getltycustomerrewardsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomerreward'+'/e/'+id).toPromise();
  }
  }
  getltycustomerrewardsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomerreward'+'/'+id).toPromise();
  }
  }

  deleteltycustomerreward(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/ltycustomerreward'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomerreward')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

