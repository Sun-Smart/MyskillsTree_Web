import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsinductionemployee } from '../model/hrmsinductionemployee.model';
import { environment } from '../../environments/environment';
import { IhrmsinductionemployeeResponse } from '../model/hrmsinductionemployee.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsinductionemployeeService {
  formData: hrmsinductionemployee;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsinductionemployee[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsinductionemployees():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsinductionemployee', body);
  }
  }

  saveOrUpdatehrmsinductionemployeesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsinductionemployee', body);
  }
  }

  gethrmsinductionemployeesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionemployee').toPromise();
  }
  }
  getListByemployeeinductionid(employeeinductionid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionemployee'+'/employeeinductionid/'+employeeinductionid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionemployee'+'/param/'+key).toPromise();
  }
  }


  gethrmsinductionemployeesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionemployee'+'/e/'+id).toPromise();
  }
  }
  gethrmsinductionemployeesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionemployee'+'/'+id).toPromise();
  }
  }

  deletehrmsinductionemployee(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsinductionemployee'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionemployee')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

