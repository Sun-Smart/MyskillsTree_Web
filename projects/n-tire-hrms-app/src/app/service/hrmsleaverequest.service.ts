import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsleaverequest } from '../model/hrmsleaverequest.model';
import { environment } from '../../environments/environment';
import { IhrmsleaverequestResponse } from '../model/hrmsleaverequest.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsleaverequestService {
  formData: hrmsleaverequest;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsleaverequest[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsleaverequests():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsleaverequest', body);
  }
  }

  saveOrUpdatehrmsleaverequestsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsleaverequest', body);
  }
  }

  gethrmsleaverequestsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsleaverequest').toPromise();
  }
  }
  getListByleaverequestid(leaverequestid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsleaverequest'+'/leaverequestid/'+leaverequestid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsleaverequest'+'/param/'+key).toPromise();
  }
  }


  gethrmsleaverequestsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsleaverequest'+'/e/'+id).toPromise();
  }
  }
  gethrmsleaverequestsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsleaverequest'+'/'+id).toPromise();
  }
  }

  deletehrmsleaverequest(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsleaverequest'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsleaverequest')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

