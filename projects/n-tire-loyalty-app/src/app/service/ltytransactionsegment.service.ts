import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltytransactionsegment } from '../model/ltytransactionsegment.model';
import { environment } from '../../environments/environment';
import { IltytransactionsegmentResponse } from '../model/ltytransactionsegment.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltytransactionsegmentService {
  formData: ltytransactionsegment;
  readonly rootURL = AppConstants.baseURL;
  list: ltytransactionsegment[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltytransactionsegments():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltytransactionsegment', body);
  }
  }

  saveOrUpdateltytransactionsegmentsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltytransactionsegment', body);
  }
  }

  getltytransactionsegmentsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltytransactionsegment').toPromise();
  }
  }
  getListBysegmentid(segmentid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltytransactionsegment'+'/segmentid/'+segmentid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltytransactionsegment'+'/param/'+key).toPromise();
  }
  }


  getltytransactionsegmentsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltytransactionsegment'+'/e/'+id).toPromise();
  }
  }
  getltytransactionsegmentsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltytransactionsegment'+'/'+id).toPromise();
  }
  }

  deleteltytransactionsegment(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/ltytransactionsegment'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/ltytransactionsegment')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

