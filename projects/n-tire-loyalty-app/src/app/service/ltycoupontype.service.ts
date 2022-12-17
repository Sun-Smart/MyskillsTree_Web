import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltycoupontype } from '../model/ltycoupontype.model';
import { environment } from '../../environments/environment';
import { IltycoupontypeResponse } from '../model/ltycoupontype.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltycoupontypeService {
  formData: ltycoupontype;
  readonly rootURL = AppConstants.baseURL;
  list: ltycoupontype[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltycoupontypes():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltycoupontype', body);
  }
  }

  saveOrUpdateltycoupontypesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltycoupontype', body);
  }
  }

  getltycoupontypesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycoupontype').toPromise();
  }
  }
  getListBycoupontypeid(coupontypeid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycoupontype'+'/coupontypeid/'+coupontypeid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycoupontype'+'/param/'+key).toPromise();
  }
  }


  getltycoupontypesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycoupontype'+'/e/'+id).toPromise();
  }
  }
  getltycoupontypesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycoupontype'+'/'+id).toPromise();
  }
  }

  deleteltycoupontype(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/ltycoupontype'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/ltycoupontype')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

