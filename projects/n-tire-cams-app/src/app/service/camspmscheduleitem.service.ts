import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camspmscheduleitem } from '../model/camspmscheduleitem.model';
import { environment } from '../../environments/environment';
import { IcamspmscheduleitemResponse } from '../model/camspmscheduleitem.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camspmscheduleitemService {
  formData: camspmscheduleitem;
  readonly rootURL = AppConstants.baseURL;
  list: camspmscheduleitem[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamspmscheduleitems():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspmscheduleitem', body);
  }
  }

  saveOrUpdatecamspmscheduleitemsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspmscheduleitem', body);
  }
  }

  getcamspmscheduleitemsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmscheduleitem').toPromise();
  }
  }
  getListByscheduleitemid(scheduleitemid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmscheduleitem'+'/scheduleitemid/'+scheduleitemid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmscheduleitem'+'/param/'+key).toPromise();
  }
  }


  getcamspmscheduleitemsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmscheduleitem'+'/e/'+id).toPromise();
  }
  }
  getcamspmscheduleitemsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmscheduleitem'+'/'+id).toPromise();
  }
  }

  deletecamspmscheduleitem(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camspmscheduleitem'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camspmscheduleitem')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

