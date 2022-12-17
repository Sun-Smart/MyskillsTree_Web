import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bocallreminder } from '../model/bocallreminder.model';
import { environment } from '../../environments/environment';
import { IbocallreminderResponse } from '../model/bocallreminder.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bocallreminderService {
  formData: bocallreminder;
  readonly rootURL = AppConstants.baseURL;
  list: bocallreminder[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebocallreminders():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bocallreminder', body);
  }
  }

  saveOrUpdatebocallremindersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bocallreminder', body);
  }
  }

  getbocallremindersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocallreminder').toPromise();
  }
  }
  getListByreminderid(reminderid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocallreminder'+'/reminderid/'+reminderid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocallreminder'+'/param/'+key).toPromise();
  }
  }


  getbocallremindersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocallreminder'+'/e/'+id).toPromise();
  }
  }
  getbocallremindersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocallreminder'+'/'+id).toPromise();
  }
  }

  deletebocallreminder(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bocallreminder'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bocallreminder')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

