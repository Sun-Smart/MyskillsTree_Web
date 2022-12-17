import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camspmscheduletask } from '../model/camspmscheduletask.model';
import { environment } from '../../environments/environment';
import { IcamspmscheduletaskResponse } from '../model/camspmscheduletask.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camspmscheduletaskService {
  formData: camspmscheduletask;
  readonly rootURL = AppConstants.baseURL;
  list: camspmscheduletask[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamspmscheduletasks():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspmscheduletask', body);
  }
  }

  saveOrUpdatecamspmscheduletasksList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspmscheduletask', body);
  }
  }

  getcamspmscheduletasksList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmscheduletask').toPromise();
  }
  }
  getListByscheduletaskid(scheduletaskid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmscheduletask'+'/scheduletaskid/'+scheduletaskid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmscheduletask'+'/param/'+key).toPromise();
  }
  }


  getcamspmscheduletasksByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmscheduletask'+'/e/'+id).toPromise();
  }
  }
  getcamspmscheduletasksByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmscheduletask'+'/'+id).toPromise();
  }
  }

  deletecamspmscheduletask(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camspmscheduletask'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camspmscheduletask')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

