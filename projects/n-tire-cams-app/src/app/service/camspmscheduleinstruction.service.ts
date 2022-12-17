import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camspmscheduleinstruction } from '../model/camspmscheduleinstruction.model';
import { environment } from '../../environments/environment';
import { IcamspmscheduleinstructionResponse } from '../model/camspmscheduleinstruction.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camspmscheduleinstructionService {
  formData: camspmscheduleinstruction;
  readonly rootURL = AppConstants.baseURL;
  list: camspmscheduleinstruction[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamspmscheduleinstructions():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspmscheduleinstruction', body);
  }
  }

  saveOrUpdatecamspmscheduleinstructionsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspmscheduleinstruction', body);
  }
  }

  getcamspmscheduleinstructionsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmscheduleinstruction').toPromise();
  }
  }
  getListByscheduleinstructionid(scheduleinstructionid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmscheduleinstruction'+'/scheduleinstructionid/'+scheduleinstructionid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmscheduleinstruction'+'/param/'+key).toPromise();
  }
  }


  getcamspmscheduleinstructionsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmscheduleinstruction'+'/e/'+id).toPromise();
  }
  }
  getcamspmscheduleinstructionsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmscheduleinstruction'+'/'+id).toPromise();
  }
  }

  deletecamspmscheduleinstruction(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camspmscheduleinstruction'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camspmscheduleinstruction')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

