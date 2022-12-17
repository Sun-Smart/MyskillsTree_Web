import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmseosrole } from '../model/hrmseosrole.model';
import { environment } from '../../environments/environment';
import { IhrmseosroleResponse } from '../model/hrmseosrole.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmseosroleService {
  formData: hrmseosrole;
  readonly rootURL = AppConstants.baseURL;
  list: hrmseosrole[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmseosroles():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmseosrole', body);
  }
  }

  saveOrUpdatehrmseosrolesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmseosrole', body);
  }
  }

  gethrmseosrolesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmseosrole').toPromise();
  }
  }
  getListByeosroleid(eosroleid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmseosrole'+'/eosroleid/'+eosroleid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmseosrole'+'/param/'+key).toPromise();
  }
  }


  gethrmseosrolesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmseosrole'+'/e/'+id).toPromise();
  }
  }
  gethrmseosrolesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmseosrole'+'/'+id).toPromise();
  }
  }

  deletehrmseosrole(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmseosrole'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmseosrole')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

