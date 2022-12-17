import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltycustomersegment } from '../model/ltycustomersegment.model';
import { environment } from '../../environments/environment';
import { IltycustomersegmentResponse } from '../model/ltycustomersegment.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltycustomersegmentService {
  formData: ltycustomersegment;
  readonly rootURL = AppConstants.baseURL;
  list: ltycustomersegment[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltycustomersegments():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltycustomersegment', body);
  }
  }

  saveOrUpdateltycustomersegmentsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltycustomersegment', body);
  }
  }

  getltycustomersegmentsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomersegment').toPromise();
  }
  }
  getListBysegmentid(segmentid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomersegment'+'/segmentid/'+segmentid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomersegment'+'/param/'+key).toPromise();
  }
  }


  getltycustomersegmentsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomersegment'+'/e/'+id).toPromise();
  }
  }
  getltycustomersegmentsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomersegment'+'/'+id).toPromise();
  }
  }

  deleteltycustomersegment(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/ltycustomersegment'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomersegment')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

