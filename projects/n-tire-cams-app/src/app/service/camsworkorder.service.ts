import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camsworkorder } from '../model/camsworkorder.model';
import { camsworkdetail } from '../model/camsworkdetail.model';
import { camsmisccost } from '../model/camsmisccost.model';
import { environment } from '../../environments/environment';
import { IcamsworkorderResponse } from '../model/camsworkorder.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camsworkorderService {
  formData: camsworkorder;
  readonly rootURL = AppConstants.baseURL;
  list: camsworkorder[];
  camsworkdetails: camsworkdetail[]=[];
  camsmisccosts: camsmisccost[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamsworkorders():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      camsworkdetails: this.camsworkdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      camsmisccosts: this.camsmisccosts.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsworkorder', body);
  }
  }

  saveOrUpdatecamsworkordersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsworkorder', body);
  }
  }

  getcamsworkordersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkorder').toPromise();
  }
  }
  getListByworkorderid(workorderid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkorder'+'/workorderid/'+workorderid).toPromise();
  }
  }

  getListByrequesttype(requesttype:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkorder'+'/requesttype/'+requesttype).toPromise();
  }
  }

  getListBycriticality(criticality:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkorder'+'/criticality/'+criticality).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkorder'+'/param/'+key).toPromise();
  }
  }


  getcamsworkordersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkorder'+'/e/'+id).toPromise();
  }
  }
  getcamsworkordersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkorder'+'/'+id).toPromise();
  }
  }

  deletecamsworkorder(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camsworkorder'+'/'+id).toPromise();
  }
  }
clearList(){
this.camsworkdetails = [];
this.camsmisccosts = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camsworkorder')
.toPromise()
.then(res => this.list = res as any[]);
}
}
  getcamsworkordersListbyorderstatus(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkorder/'+dt+'').toPromise();
  }
  }

  getcamsworkordersListbyrequesttype(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkorder/'+dt+'').toPromise();
  }
  }

  getcamsworkordersListbycriticality(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkorder/'+dt+'').toPromise();
  }
  }

  getcamsworkordersListbymonthwise(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkorder/'+dt+'').toPromise();
  }
  }



}

