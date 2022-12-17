import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeeattendance } from '../model/hrmsemployeeattendance.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeeattendanceResponse } from '../model/hrmsemployeeattendance.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeeattendanceService {
  formData: hrmsemployeeattendance;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeeattendance[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeeattendances():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeattendance', body);
  }
  }

  saveOrUpdatehrmsemployeeattendancesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeattendance', body);
  }
  }

  gethrmsemployeeattendancesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeattendance').toPromise();
  }
  }
  getListBytxnid(txnid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeattendance'+'/txnid/'+txnid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeattendance'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeeattendancesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeattendance'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeeattendancesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeattendance'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeeattendance(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeeattendance'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeattendance')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

