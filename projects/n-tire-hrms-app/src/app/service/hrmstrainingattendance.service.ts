import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmstrainingattendance } from '../model/hrmstrainingattendance.model';
import { environment } from '../../environments/environment';
import { IhrmstrainingattendanceResponse } from '../model/hrmstrainingattendance.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmstrainingattendanceService {
  formData: hrmstrainingattendance;
  readonly rootURL = AppConstants.baseURL;
  list: hrmstrainingattendance[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmstrainingattendances():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmstrainingattendance', body);
  }
  }

  saveOrUpdatehrmstrainingattendancesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmstrainingattendance', body);
  }
  }

  gethrmstrainingattendancesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingattendance').toPromise();
  }
  }
  getListByattendanceid(attendanceid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingattendance'+'/attendanceid/'+attendanceid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingattendance'+'/param/'+key).toPromise();
  }
  }


  gethrmstrainingattendancesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingattendance'+'/e/'+id).toPromise();
  }
  }
  gethrmstrainingattendancesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingattendance'+'/'+id).toPromise();
  }
  }

  deletehrmstrainingattendance(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmstrainingattendance'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingattendance')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

