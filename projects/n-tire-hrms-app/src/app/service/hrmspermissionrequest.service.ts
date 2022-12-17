import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmspermissionrequest } from '../model/hrmspermissionrequest.model';
import { environment } from '../../environments/environment';
import { IhrmspermissionrequestResponse } from '../model/hrmspermissionrequest.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmspermissionrequestService {
  formData: hrmspermissionrequest;
  readonly rootURL = AppConstants.baseURL;
  list: hrmspermissionrequest[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmspermissionrequests():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmspermissionrequest', body);
  }
  }

  saveOrUpdatehrmspermissionrequestsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmspermissionrequest', body);
  }
  }

  gethrmspermissionrequestsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmspermissionrequest').toPromise();
  }
  }
  getListBypermissionid(permissionid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmspermissionrequest'+'/permissionid/'+permissionid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmspermissionrequest'+'/param/'+key).toPromise();
  }
  }


  gethrmspermissionrequestsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmspermissionrequest'+'/e/'+id).toPromise();
  }
  }
  gethrmspermissionrequestsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmspermissionrequest'+'/'+id).toPromise();
  }
  }

  deletehrmspermissionrequest(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmspermissionrequest'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmspermissionrequest')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

