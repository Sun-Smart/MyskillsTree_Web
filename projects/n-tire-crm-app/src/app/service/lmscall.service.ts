import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmscall } from '../model/lmscall.model';
import { lmstask } from '../model/lmstask.model';
import { lmsreminder } from '../model/lmsreminder.model';
import { lmshistory } from '../model/lmshistory.model';
import { environment } from '../../environments/environment';
import { IlmscallResponse } from '../model/lmscall.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmscallService {
  formData: lmscall;
  readonly rootURL = AppConstants.baseURL;
  list: lmscall[];
  lmstasks: lmstask[]=[];
  lmsreminders: lmsreminder[]=[];
  lmshistories: lmshistory[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmscalls():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      lmstasks: this.lmstasks.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      lmsreminders: this.lmsreminders.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      lmshistories: this.lmshistories.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmscall', body);
  }
  }

  saveOrUpdatelmscallsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmscall', body);
  }
  }

  getlmscallsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscall').toPromise();
  }
  }
  getListBycallid(callid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscall'+'/callid/'+callid).toPromise();
  }
  }

  getListByactivitytype(activitytype:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscall'+'/activitytype/'+activitytype).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscall'+'/param/'+key).toPromise();
  }
  }


  getlmscallsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscall'+'/e/'+id).toPromise();
  }
  }
  getlmscallsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscall'+'/'+id).toPromise();
  }
  }

  deletelmscall(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmscall'+'/'+id).toPromise();
  }
  }
clearList(){
this.lmstasks = [];
this.lmsreminders = [];
this.lmshistories = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmscall')
.toPromise()
.then(res => this.list = res as any[]);
}
}
  getlmscallsListbyactivitytype(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscall/'+dt+'').toPromise();
  }
  }

  getlmscallsListbymonthwise(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscall/'+dt+'').toPromise();
  }
  }



}

