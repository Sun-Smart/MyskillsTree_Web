import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmstransactionschedule } from '../model/pmstransactionschedule.model';
import { environment } from '../../environments/environment';
import { IpmstransactionscheduleResponse } from '../model/pmstransactionschedule.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmstransactionscheduleService {
  formData: pmstransactionschedule;
  readonly rootURL = AppConstants.baseURL;
  list: pmstransactionschedule[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmstransactionschedules():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmstransactionschedule', body);
  }
  }

  saveOrUpdatepmstransactionschedulesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmstransactionschedule', body);
  }
  }

  getpmstransactionschedulesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmstransactionschedule').toPromise();
  }
  }
  getListBytransactionscheduleid(transactionscheduleid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmstransactionschedule'+'/transactionscheduleid/'+transactionscheduleid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmstransactionschedule'+'/param/'+key).toPromise();
  }
  }


  getpmstransactionschedulesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmstransactionschedule'+'/e/'+id).toPromise();
  }
  }
  getpmstransactionschedulesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmstransactionschedule'+'/'+id).toPromise();
  }
  }

  deletepmstransactionschedule(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmstransactionschedule'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmstransactionschedule')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

