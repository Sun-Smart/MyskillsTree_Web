import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeeshift } from '../model/hrmsemployeeshift.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeeshiftResponse } from '../model/hrmsemployeeshift.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeeshiftService {
  formData: hrmsemployeeshift;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeeshift[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeeshifts():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeshift', body);
  }
  }

  saveOrUpdatehrmsemployeeshiftsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeshift', body);
  }
  }

  gethrmsemployeeshiftsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeshift').toPromise();
  }
  }
  getListBytxnid(txnid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeshift'+'/txnid/'+txnid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeshift'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeeshiftsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeshift'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeeshiftsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeshift'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeeshift(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeeshift'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeshift')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

