import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeemonthlyattendance } from '../model/hrmsemployeemonthlyattendance.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeemonthlyattendanceResponse } from '../model/hrmsemployeemonthlyattendance.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeemonthlyattendanceService {
  formData: hrmsemployeemonthlyattendance;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeemonthlyattendance[];
DeletedhrmsemployeemonthlyattendanceIDs:string="";

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeemonthlyattendances():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyattendance', body);
  }
  }

  saveOrUpdatehrmsemployeemonthlyattendancesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
DeletedhrmsemployeemonthlyattendanceIDs:this.DeletedhrmsemployeemonthlyattendanceIDs,    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyattendance', body);
  }
  }

  gethrmsemployeemonthlyattendancesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyattendance').toPromise();
  }
  }
  getListByattendanceid(attendanceid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyattendance'+'/attendanceid/'+attendanceid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyattendance'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeemonthlyattendancesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyattendance'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeemonthlyattendancesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyattendance'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeemonthlyattendance(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyattendance'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyattendance')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

