import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boremindermaster } from '../model/boremindermaster.model';
import { boreminderuser } from '../model/boreminderuser.model';
import { environment } from '../../environments/environment';
import { IboremindermasterResponse } from '../model/boremindermaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boremindermasterService {
  formData: boremindermaster;
  readonly rootURL = AppConstants.baseURL;
  boreminderusers: boreminderuser[]=[];
  list: boremindermaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboremindermasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      boreminderusers: this.boreminderusers.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/boremindermaster', body);
  }
  }

  saveOrUpdateboremindermastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boremindermaster', body);
  }
  }

  getboremindermastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boremindermaster').toPromise();
  }
  }
  getListByremindermasterid(remindermasterid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boremindermaster'+'/remindermasterid/'+remindermasterid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boremindermaster'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boremindermaster'+'/param/'+key).toPromise();
  }
  }


  getboremindermastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boremindermaster'+'/e/'+id).toPromise();
  }
  }
  getboremindermastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boremindermaster'+'/'+id).toPromise();
  }
  }

  deleteboremindermaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boremindermaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.boreminderusers = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boremindermaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

