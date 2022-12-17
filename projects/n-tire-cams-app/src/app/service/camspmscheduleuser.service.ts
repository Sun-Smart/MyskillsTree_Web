import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camspmscheduleuser } from '../model/camspmscheduleuser.model';
import { environment } from '../../environments/environment';
import { IcamspmscheduleuserResponse } from '../model/camspmscheduleuser.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camspmscheduleuserService {
  formData: camspmscheduleuser;
  readonly rootURL = AppConstants.baseURL;
  list: camspmscheduleuser[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamspmscheduleusers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspmscheduleuser', body);
  }
  }

  saveOrUpdatecamspmscheduleusersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspmscheduleuser', body);
  }
  }

  getcamspmscheduleusersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmscheduleuser').toPromise();
  }
  }
  getListByscheduleuserid(scheduleuserid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmscheduleuser'+'/scheduleuserid/'+scheduleuserid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmscheduleuser'+'/param/'+key).toPromise();
  }
  }


  getcamspmscheduleusersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmscheduleuser'+'/e/'+id).toPromise();
  }
  }
  getcamspmscheduleusersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmscheduleuser'+'/'+id).toPromise();
  }
  }

  deletecamspmscheduleuser(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camspmscheduleuser'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camspmscheduleuser')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

