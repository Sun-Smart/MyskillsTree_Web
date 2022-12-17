import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeedailyattendance } from '../model/hrmsemployeedailyattendance.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeedailyattendanceResponse } from '../model/hrmsemployeedailyattendance.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeedailyattendanceService {
  formData: hrmsemployeedailyattendance;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeedailyattendance[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeedailyattendances():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeedailyattendance', body);
  }
  }

  saveOrUpdatehrmsemployeedailyattendancesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeedailyattendance', body);
  }
  }

  gethrmsemployeedailyattendancesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedailyattendance').toPromise();
  }
  }
  getListByattendanceid(attendanceid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedailyattendance'+'/attendanceid/'+attendanceid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedailyattendance'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeedailyattendancesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedailyattendance'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeedailyattendancesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedailyattendance'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeedailyattendance(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeedailyattendance'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedailyattendance')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

