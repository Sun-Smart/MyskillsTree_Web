import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltyproductsegment } from '../model/ltyproductsegment.model';
import { environment } from '../../environments/environment';
import { IltyproductsegmentResponse } from '../model/ltyproductsegment.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltyproductsegmentService {
  formData: ltyproductsegment;
  readonly rootURL = AppConstants.baseURL;
  list: ltyproductsegment[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltyproductsegments():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltyproductsegment', body);
  }
  }

  saveOrUpdateltyproductsegmentsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltyproductsegment', body);
  }
  }

  getltyproductsegmentsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyproductsegment').toPromise();
  }
  }
  getListBysegmentid(segmentid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyproductsegment'+'/segmentid/'+segmentid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyproductsegment'+'/param/'+key).toPromise();
  }
  }


  getltyproductsegmentsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyproductsegment'+'/e/'+id).toPromise();
  }
  }
  getltyproductsegmentsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltyproductsegment'+'/'+id).toPromise();
  }
  }

  deleteltyproductsegment(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/ltyproductsegment'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/ltyproductsegment')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

