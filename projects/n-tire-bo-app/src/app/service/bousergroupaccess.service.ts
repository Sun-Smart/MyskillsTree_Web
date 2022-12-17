import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bousergroupaccess } from '../model/bousergroupaccess.model';
import { environment } from '../../environments/environment';
import { IbousergroupaccessResponse } from '../model/bousergroupaccess.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bousergroupaccessService {
  formData: bousergroupaccess;
  readonly rootURL = AppConstants.baseURL;
  list: bousergroupaccess[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebousergroupaccesses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bousergroupaccess', body);
  }
  }

  saveOrUpdatebousergroupaccessesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bousergroupaccess', body);
  }
  }

  getbousergroupaccessesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousergroupaccess').toPromise();
  }
  }
  getListByaccessid(accessid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousergroupaccess'+'/accessid/'+accessid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousergroupaccess'+'/param/'+key).toPromise();
  }
  }


  getbousergroupaccessesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousergroupaccess'+'/e/'+id).toPromise();
  }
  }
  getbousergroupaccessesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousergroupaccess'+'/'+id).toPromise();
  }
  }

  deletebousergroupaccess(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bousergroupaccess'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bousergroupaccess')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

