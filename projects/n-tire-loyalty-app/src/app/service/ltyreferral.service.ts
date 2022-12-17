import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltyreferral } from '../model/ltyreferral.model';
import { environment } from '../../environments/environment';
import { IltyreferralResponse } from '../model/ltyreferral.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltyreferralService {
  formData: ltyreferral;
  readonly rootURL = AppConstants.baseURL;
  list: ltyreferral[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltyreferrals():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltyreferral', body);
  }
  }

  saveOrUpdateltyreferralsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltyreferral', body);
  }
  }

  getltyreferralsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyreferral').toPromise();
  }
  }
  getListByreferralid(referralid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyreferral'+'/referralid/'+referralid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyreferral'+'/param/'+key).toPromise();
  }
  }


  getltyreferralsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyreferral'+'/e/'+id).toPromise();
  }
  }
  getltyreferralsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyreferral'+'/'+id).toPromise();
  }
  }

  deleteltyreferral(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/ltyreferral'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/ltyreferral')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

