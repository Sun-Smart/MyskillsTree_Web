import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsinductionschedule } from '../model/hrmsinductionschedule.model';
import { environment } from '../../environments/environment';
import { IhrmsinductionscheduleResponse } from '../model/hrmsinductionschedule.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsinductionscheduleService {
  formData: hrmsinductionschedule;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsinductionschedule[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsinductionschedules():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsinductionschedule', body);
  }
  }

  saveOrUpdatehrmsinductionschedulesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsinductionschedule', body);
  }
  }

  gethrmsinductionschedulesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionschedule').toPromise();
  }
  }
  getListByscheduleid(scheduleid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionschedule'+'/scheduleid/'+scheduleid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionschedule'+'/param/'+key).toPromise();
  }
  }


  gethrmsinductionschedulesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionschedule'+'/e/'+id).toPromise();
  }
  }
  gethrmsinductionschedulesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionschedule'+'/'+id).toPromise();
  }
  }

  deletehrmsinductionschedule(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsinductionschedule'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionschedule')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

