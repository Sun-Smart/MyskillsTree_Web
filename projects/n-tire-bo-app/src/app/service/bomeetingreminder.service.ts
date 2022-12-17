import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bomeetingreminder } from '../model/bomeetingreminder.model';
import { environment } from '../../environments/environment';
import { IbomeetingreminderResponse } from '../model/bomeetingreminder.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bomeetingreminderService {
  formData: bomeetingreminder;
  readonly rootURL = AppConstants.baseURL;
  list: bomeetingreminder[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebomeetingreminders():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bomeetingreminder', body);
  }
  }

  saveOrUpdatebomeetingremindersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bomeetingreminder', body);
  }
  }

  getbomeetingremindersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomeetingreminder').toPromise();
  }
  }
  getListByreminderid(reminderid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomeetingreminder'+'/reminderid/'+reminderid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomeetingreminder'+'/param/'+key).toPromise();
  }
  }


  getbomeetingremindersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomeetingreminder'+'/e/'+id).toPromise();
  }
  }
  getbomeetingremindersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomeetingreminder'+'/'+id).toPromise();
  }
  }

  deletebomeetingreminder(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bomeetingreminder'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bomeetingreminder')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

