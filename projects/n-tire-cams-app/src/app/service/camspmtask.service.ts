import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camspmtask } from '../model/camspmtask.model';
import { environment } from '../../environments/environment';
import { IcamspmtaskResponse } from '../model/camspmtask.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camspmtaskService {
  formData: camspmtask;
  readonly rootURL = AppConstants.baseURL;
  list: camspmtask[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamspmtasks():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspmtask', body);
  }
  }

  saveOrUpdatecamspmtasksList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspmtask', body);
  }
  }

  getcamspmtasksList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmtask').toPromise();
  }
  }
  getListBypmtaskid(pmtaskid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmtask'+'/pmtaskid/'+pmtaskid).toPromise();
  }
  }

  getListBypmid(pmid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmtask'+'/pmid/'+pmid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmtask'+'/param/'+key).toPromise();
  }
  }


  getcamspmtasksByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmtask'+'/e/'+id).toPromise();
  }
  }
  getcamspmtasksByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmtask'+'/'+id).toPromise();
  }
  }

  deletecamspmtask(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camspmtask'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camspmtask')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

