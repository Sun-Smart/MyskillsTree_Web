import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camsworkrequest } from '../model/camsworkrequest.model';
import { environment } from '../../environments/environment';
import { IcamsworkrequestResponse } from '../model/camsworkrequest.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camsworkrequestService {
  formData: camsworkrequest;
  readonly rootURL = AppConstants.baseURL;
  list: camsworkrequest[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamsworkrequests():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsworkrequest', body);
  }
  }

  saveOrUpdatecamsworkrequestsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsworkrequest', body);
  }
  }

  getcamsworkrequestsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkrequest').toPromise();
  }
  }
  getListByrequestid(requestid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkrequest'+'/requestid/'+requestid).toPromise();
  }
  }

  getListByrequesttype(requesttype:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkrequest'+'/requesttype/'+requesttype).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkrequest'+'/param/'+key).toPromise();
  }
  }


  getcamsworkrequestsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkrequest'+'/e/'+id).toPromise();
  }
  }
  getcamsworkrequestsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkrequest'+'/'+id).toPromise();
  }
  }

  deletecamsworkrequest(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camsworkrequest'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camsworkrequest')
.toPromise()
.then(res => this.list = res as any[]);
}
}
  getcamsworkrequestsListbyrequesttype(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkrequest/'+dt+'').toPromise();
  }
  }

  getcamsworkrequestsListbymonthwise(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkrequest/'+dt+'').toPromise();
  }
  }



}

