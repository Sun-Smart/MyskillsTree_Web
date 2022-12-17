import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsreminder } from '../model/lmsreminder.model';
import { environment } from '../../environments/environment';
import { IlmsreminderResponse } from '../model/lmsreminder.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsreminderService {
  formData: lmsreminder;
  readonly rootURL = AppConstants.baseURL;
  list: lmsreminder[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmsreminders():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsreminder', body);
  }
  }

  saveOrUpdatelmsremindersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsreminder', body);
  }
  }

  getlmsremindersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsreminder').toPromise();
  }
  }
  getListByreminderid(reminderid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsreminder'+'/reminderid/'+reminderid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsreminder'+'/param/'+key).toPromise();
  }
  }


  getlmsremindersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsreminder'+'/e/'+id).toPromise();
  }
  }
  getlmsremindersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsreminder'+'/'+id).toPromise();
  }
  }

  deletelmsreminder(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmsreminder'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmsreminder')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

