import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmstask } from '../model/lmstask.model';
import { lmstaskresponse } from '../model/lmstaskresponse.model';
import { environment } from '../../environments/environment';
import { IlmstaskResponse } from '../model/lmstask.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmstaskService {
  formData: lmstask;
  readonly rootURL = AppConstants.baseURL;
  list: lmstask[];
  lmstaskresponses: lmstaskresponse[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmstasks():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      lmstaskresponses: this.lmstaskresponses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmstask', body);
  }
  }

  saveOrUpdatelmstasksList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmstask', body);
  }
  }

  getlmstasksList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstask').toPromise();
  }
  }
  getListBytaskid(taskid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstask'+'/taskid/'+taskid).toPromise();
  }
  }

  getListBytaskstatus(taskstatus:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstask'+'/taskstatus/'+taskstatus).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstask'+'/param/'+key).toPromise();
  }
  }


  getlmstasksByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstask'+'/e/'+id).toPromise();
  }
  }
  getlmstasksByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstask'+'/'+id).toPromise();
  }
  }

  deletelmstask(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmstask'+'/'+id).toPromise();
  }
  }
clearList(){
this.lmstaskresponses = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmstask')
.toPromise()
.then(res => this.list = res as any[]);
}
}
  getlmstasksListbytaskstatus(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstask/'+dt+'').toPromise();
  }
  }

  getlmstasksListbymonthwise(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstask/'+dt+'').toPromise();
  }
  }



}

