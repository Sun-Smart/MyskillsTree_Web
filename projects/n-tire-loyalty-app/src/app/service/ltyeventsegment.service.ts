import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltyeventsegment } from '../model/ltyeventsegment.model';
import { environment } from '../../environments/environment';
import { IltyeventsegmentResponse } from '../model/ltyeventsegment.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltyeventsegmentService {
  formData: ltyeventsegment;
  readonly rootURL = AppConstants.baseURL;
  list: ltyeventsegment[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltyeventsegments():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltyeventsegment', body);
  }
  }

  saveOrUpdateltyeventsegmentsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltyeventsegment', body);
  }
  }

  getltyeventsegmentsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyeventsegment').toPromise();
  }
  }
  getListBysegmentid(segmentid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyeventsegment'+'/segmentid/'+segmentid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyeventsegment'+'/param/'+key).toPromise();
  }
  }


  getltyeventsegmentsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyeventsegment'+'/e/'+id).toPromise();
  }
  }
  getltyeventsegmentsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyeventsegment'+'/'+id).toPromise();
  }
  }

  deleteltyeventsegment(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/ltyeventsegment'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/ltyeventsegment')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

