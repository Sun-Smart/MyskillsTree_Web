import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsinductionattendance } from '../model/hrmsinductionattendance.model';
import { environment } from '../../environments/environment';
import { IhrmsinductionattendanceResponse } from '../model/hrmsinductionattendance.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsinductionattendanceService {
  formData: hrmsinductionattendance;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsinductionattendance[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsinductionattendances():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsinductionattendance', body);
  }
  }

  saveOrUpdatehrmsinductionattendancesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsinductionattendance', body);
  }
  }

  gethrmsinductionattendancesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionattendance').toPromise();
  }
  }
  getListByattendanceid(attendanceid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionattendance'+'/attendanceid/'+attendanceid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionattendance'+'/param/'+key).toPromise();
  }
  }


  gethrmsinductionattendancesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionattendance'+'/e/'+id).toPromise();
  }
  }
  gethrmsinductionattendancesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionattendance'+'/'+id).toPromise();
  }
  }

  deletehrmsinductionattendance(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsinductionattendance'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionattendance')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

