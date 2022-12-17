import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camspmschedule } from '../model/camspmschedule.model';
import { camspmscheduletask } from '../model/camspmscheduletask.model';
import { camspmscheduleinstruction } from '../model/camspmscheduleinstruction.model';
import { camspmscheduleitem } from '../model/camspmscheduleitem.model';
import { camspmschedulesuppliertask } from '../model/camspmschedulesuppliertask.model';
import { camspmscheduleuser } from '../model/camspmscheduleuser.model';
import { environment } from '../../environments/environment';
import { IcamspmscheduleResponse } from '../model/camspmschedule.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camspmscheduleService {
  formData: camspmschedule;
  readonly rootURL = AppConstants.baseURL;
  list: camspmschedule[];
  camspmscheduletasks: camspmscheduletask[]=[];
  camspmscheduleinstructions: camspmscheduleinstruction[]=[];
  camspmscheduleitems: camspmscheduleitem[]=[];
  camspmschedulesuppliertasks: camspmschedulesuppliertask[]=[];
  camspmscheduleusers: camspmscheduleuser[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamspmschedules():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      camspmscheduletasks: this.camspmscheduletasks.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      camspmscheduleinstructions: this.camspmscheduleinstructions.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      camspmscheduleitems: this.camspmscheduleitems.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      camspmschedulesuppliertasks: this.camspmschedulesuppliertasks.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      camspmscheduleusers: this.camspmscheduleusers.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspmschedule', body);
  }
  }

  saveOrUpdatecamspmschedulesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspmschedule', body);
  }
  }

  getcamspmschedulesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmschedule').toPromise();
  }
  }
  getListByscheduleid(scheduleid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmschedule'+'/scheduleid/'+scheduleid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmschedule'+'/param/'+key).toPromise();
  }
  }


  getcamspmschedulesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmschedule'+'/e/'+id).toPromise();
  }
  }
  getcamspmschedulesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmschedule'+'/'+id).toPromise();
  }
  }

  deletecamspmschedule(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camspmschedule'+'/'+id).toPromise();
  }
  }
clearList(){
this.camspmscheduletasks = [];
this.camspmscheduleinstructions = [];
this.camspmscheduleitems = [];
this.camspmschedulesuppliertasks = [];
this.camspmscheduleusers = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camspmschedule')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

