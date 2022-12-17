import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmselectemployees } from '../model/pmselectemployees.model';
import { environment } from '../../environments/environment';
import { IpmselectemployeesResponse } from '../model/pmselectemployees.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmselectemployeesService {
  formData: pmselectemployees;
  readonly rootURL = AppConstants.baseURL;
  list: pmselectemployees[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmemployeekpis():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprojectURL + '/pmselectemployees', body);
  }
  }

  saveOrUpdatepmemployeekpisList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprojectURL + '/pmselectemployees', body);
  }
  }

  getpmemployeekpisList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/pmselectemployees').toPromise();
  }
  }
  getListBykpidetailid(kpidetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/pmselectemployees'+'/kpidetailid/'+kpidetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/pmselectemployees'+'/param/'+key).toPromise();
  }
  }


  getpmemployeekpisByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/pmselectemployees'+'/e/'+id).toPromise();
  }
  }
  getpmemployeekpisByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/pmselectemployees'+'/'+id).toPromise();
  }
  }

  deletepmemployeekpi(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprojectURL + '/pmselectemployees'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprojectURL + '/pmemployeekpi')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

