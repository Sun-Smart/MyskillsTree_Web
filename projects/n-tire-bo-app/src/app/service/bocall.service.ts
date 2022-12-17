import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bocall } from '../model/bocall.model';
import { bocallinvite } from '../model/bocallinvite.model';
import { bocallreminder } from '../model/bocallreminder.model';
import { environment } from '../../environments/environment';
import { IbocallResponse } from '../model/bocall.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bocallService {
  formData: bocall;
  readonly rootURL = AppConstants.baseURL;
  bocallinvitees: bocallinvite[]=[];
  bocallreminders: bocallreminder[]=[];
  list: bocall[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebocalls():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bocallinvitees: this.bocallinvitees.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      bocallreminders: this.bocallreminders.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/bocall', body);
  }
  }

  saveOrUpdatebocallsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bocall', body);
  }
  }

  getbocallsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocall').toPromise();
  }
  }
  getListBycallid(callid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocall'+'/callid/'+callid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocall'+'/param/'+key).toPromise();
  }
  }


  getbocallsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocall'+'/e/'+id).toPromise();
  }
  }
  getbocallsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocall'+'/'+id).toPromise();
  }
  }

  deletebocall(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bocall'+'/'+id).toPromise();
  }
  }
clearList(){
this.bocallinvitees = [];
this.bocallreminders = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bocall')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

