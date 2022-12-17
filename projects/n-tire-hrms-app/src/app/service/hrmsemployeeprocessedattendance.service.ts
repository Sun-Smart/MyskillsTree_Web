import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeeprocessedattendance } from '../model/hrmsemployeeprocessedattendance.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeeprocessedattendanceResponse } from '../model/hrmsemployeeprocessedattendance.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeeprocessedattendanceService {
  formData: hrmsemployeeprocessedattendance;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeeprocessedattendance[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeeprocessedattendances():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeprocessedattendance', body);
  }
  }

  saveOrUpdatehrmsemployeeprocessedattendancesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeprocessedattendance', body);
  }
  }

  gethrmsemployeeprocessedattendancesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeprocessedattendance').toPromise();
  }
  }
  getListBytxnid(txnid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeprocessedattendance'+'/txnid/'+txnid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeprocessedattendance'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeeprocessedattendancesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeprocessedattendance'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeeprocessedattendancesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeprocessedattendance'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeeprocessedattendance(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeeprocessedattendance'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeprocessedattendance')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

