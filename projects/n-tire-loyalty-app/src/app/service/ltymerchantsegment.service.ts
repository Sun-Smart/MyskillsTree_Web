import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltymerchantsegment } from '../model/ltymerchantsegment.model';
import { environment } from '../../environments/environment';
import { IltymerchantsegmentResponse } from '../model/ltymerchantsegment.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltymerchantsegmentService {
  formData: ltymerchantsegment;
  readonly rootURL = AppConstants.baseURL;
  list: ltymerchantsegment[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltymerchantsegments():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltymerchantsegment', body);
  }
  }

  saveOrUpdateltymerchantsegmentsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltymerchantsegment', body);
  }
  }

  getltymerchantsegmentsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltymerchantsegment').toPromise();
  }
  }
  getListBysegmentid(segmentid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltymerchantsegment'+'/segmentid/'+segmentid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltymerchantsegment'+'/param/'+key).toPromise();
  }
  }


  getltymerchantsegmentsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltymerchantsegment'+'/e/'+id).toPromise();
  }
  }
  getltymerchantsegmentsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltymerchantsegment'+'/'+id).toPromise();
  }
  }

  deleteltymerchantsegment(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/ltymerchantsegment'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/ltymerchantsegment')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

