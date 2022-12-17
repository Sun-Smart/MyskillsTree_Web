import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boreminderuser } from '../model/boreminderuser.model';
import { environment } from '../../environments/environment';
import { IboreminderuserResponse } from '../model/boreminderuser.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boreminderuserService {
  formData: boreminderuser;
  readonly rootURL = AppConstants.baseURL;
  list: boreminderuser[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboreminderusers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/boreminderuser', body);
  }
  }

  saveOrUpdateboreminderusersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boreminderuser', body);
  }
  }

  getboreminderusersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreminderuser').toPromise();
  }
  }
  getListByreminderuserid(reminderuserid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreminderuser'+'/reminderuserid/'+reminderuserid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreminderuser'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreminderuser'+'/param/'+key).toPromise();
  }
  }


  getboreminderusersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreminderuser'+'/e/'+id).toPromise();
  }
  }
  getboreminderusersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreminderuser'+'/'+id).toPromise();
  }
  }

  deleteboreminderuser(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boreminderuser'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boreminderuser')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

