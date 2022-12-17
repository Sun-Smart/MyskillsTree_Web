import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltytransactiondetail } from '../model/ltytransactiondetail.model';
import { environment } from '../../environments/environment';
import { IltytransactiondetailResponse } from '../model/ltytransactiondetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltytransactiondetailService {
  formData: ltytransactiondetail;
  readonly rootURL = AppConstants.baseURL;
  list: ltytransactiondetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltytransactiondetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltytransactiondetail', body);
  }
  }

  saveOrUpdateltytransactiondetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltytransactiondetail', body);
  }
  }

  getltytransactiondetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltytransactiondetail').toPromise();
  }
  }
  getListBytransactiondetailid(transactiondetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltytransactiondetail'+'/transactiondetailid/'+transactiondetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltytransactiondetail'+'/param/'+key).toPromise();
  }
  }


  getltytransactiondetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltytransactiondetail'+'/e/'+id).toPromise();
  }
  }
  getltytransactiondetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltytransactiondetail'+'/'+id).toPromise();
  }
  }

  deleteltytransactiondetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/ltytransactiondetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/ltytransactiondetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

