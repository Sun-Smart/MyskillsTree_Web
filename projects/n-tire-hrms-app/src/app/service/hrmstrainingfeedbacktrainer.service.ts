import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmstrainingfeedbacktrainer } from '../model/hrmstrainingfeedbacktrainer.model';
import { environment } from '../../environments/environment';
import { IhrmstrainingfeedbacktrainerResponse } from '../model/hrmstrainingfeedbacktrainer.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmstrainingfeedbacktrainerService {
  formData: hrmstrainingfeedbacktrainer;
  readonly rootURL = AppConstants.baseURL;
  list: hrmstrainingfeedbacktrainer[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmstrainingfeedbacktrainers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmstrainingfeedbacktrainer', body);
  }
  }

  saveOrUpdatehrmstrainingfeedbacktrainersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmstrainingfeedbacktrainer', body);
  }
  }

  gethrmstrainingfeedbacktrainersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingfeedbacktrainer').toPromise();
  }
  }
  getListBytrainerfeedbackid(trainerfeedbackid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingfeedbacktrainer'+'/trainerfeedbackid/'+trainerfeedbackid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingfeedbacktrainer'+'/param/'+key).toPromise();
  }
  }


  gethrmstrainingfeedbacktrainersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingfeedbacktrainer'+'/e/'+id).toPromise();
  }
  }
  gethrmstrainingfeedbacktrainersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingfeedbacktrainer'+'/'+id).toPromise();
  }
  }

  deletehrmstrainingfeedbacktrainer(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmstrainingfeedbacktrainer'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingfeedbacktrainer')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

