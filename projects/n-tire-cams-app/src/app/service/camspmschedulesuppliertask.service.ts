import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camspmschedulesuppliertask } from '../model/camspmschedulesuppliertask.model';
import { environment } from '../../environments/environment';
import { IcamspmschedulesuppliertaskResponse } from '../model/camspmschedulesuppliertask.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camspmschedulesuppliertaskService {
  formData: camspmschedulesuppliertask;
  readonly rootURL = AppConstants.baseURL;
  list: camspmschedulesuppliertask[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamspmschedulesuppliertasks():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspmschedulesuppliertask', body);
  }
  }

  saveOrUpdatecamspmschedulesuppliertasksList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspmschedulesuppliertask', body);
  }
  }

  getcamspmschedulesuppliertasksList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmschedulesuppliertask').toPromise();
  }
  }
  getListByschedulesupplierid(schedulesupplierid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmschedulesuppliertask'+'/schedulesupplierid/'+schedulesupplierid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmschedulesuppliertask'+'/param/'+key).toPromise();
  }
  }


  getcamspmschedulesuppliertasksByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmschedulesuppliertask'+'/e/'+id).toPromise();
  }
  }
  getcamspmschedulesuppliertasksByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmschedulesuppliertask'+'/'+id).toPromise();
  }
  }

  deletecamspmschedulesuppliertask(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camspmschedulesuppliertask'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camspmschedulesuppliertask')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

