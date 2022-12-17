import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmstrainingfeedbacktrainee } from '../model/hrmstrainingfeedbacktrainee.model';
import { environment } from '../../environments/environment';
import { IhrmstrainingfeedbacktraineeResponse } from '../model/hrmstrainingfeedbacktrainee.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmstrainingfeedbacktraineeService {
  formData: hrmstrainingfeedbacktrainee;
  readonly rootURL = AppConstants.baseURL;
  list: hrmstrainingfeedbacktrainee[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmstrainingfeedbacktrainees():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmstrainingfeedbacktrainee', body);
  }
  }

  saveOrUpdatehrmstrainingfeedbacktraineesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmstrainingfeedbacktrainee', body);
  }
  }

  gethrmstrainingfeedbacktraineesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingfeedbacktrainee').toPromise();
  }
  }
  getListBytraineefeedbackid(traineefeedbackid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingfeedbacktrainee'+'/traineefeedbackid/'+traineefeedbackid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingfeedbacktrainee'+'/param/'+key).toPromise();
  }
  }


  gethrmstrainingfeedbacktraineesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingfeedbacktrainee'+'/e/'+id).toPromise();
  }
  }
  gethrmstrainingfeedbacktraineesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingfeedbacktrainee'+'/'+id).toPromise();
  }
  }

  deletehrmstrainingfeedbacktrainee(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmstrainingfeedbacktrainee'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingfeedbacktrainee')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

