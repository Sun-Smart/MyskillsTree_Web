import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camsdepreciationschedule } from '../model/camsdepreciationschedule.model';
import { environment } from '../../environments/environment';
import { IcamsdepreciationscheduleResponse } from '../model/camsdepreciationschedule.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camsdepreciationscheduleService {
  formData: camsdepreciationschedule;
  readonly rootURL = AppConstants.baseURL;
  list: camsdepreciationschedule[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamsdepreciationschedules():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsdepreciationschedule', body);
  }
  }

  saveOrUpdatecamsdepreciationschedulesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsdepreciationschedule', body);
  }
  }

  getcamsdepreciationschedulesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsdepreciationschedule').toPromise();
  }
  }
  getListByscheduleid(scheduleid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsdepreciationschedule'+'/scheduleid/'+scheduleid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsdepreciationschedule'+'/param/'+key).toPromise();
  }
  }


  getcamsdepreciationschedulesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsdepreciationschedule'+'/e/'+id).toPromise();
  }
  }
  getcamsdepreciationschedulesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsdepreciationschedule'+'/'+id).toPromise();
  }
  }

  deletecamsdepreciationschedule(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camsdepreciationschedule'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camsdepreciationschedule')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

