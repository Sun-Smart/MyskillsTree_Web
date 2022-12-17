import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeechecklist } from '../model/hrmsemployeechecklist.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeechecklistResponse } from '../model/hrmsemployeechecklist.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeechecklistService {
  formData: hrmsemployeechecklist;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeechecklist[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeechecklists():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeechecklist', body);
  }
  }

  saveOrUpdatehrmsemployeechecklistsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeechecklist', body);
  }
  }

  gethrmsemployeechecklistsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeechecklist').toPromise();
  }
  }
  getListByemployeecheckid(employeecheckid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeechecklist'+'/employeecheckid/'+employeecheckid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeechecklist'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeechecklist'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeechecklistsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeechecklist'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeechecklistsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeechecklist'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeechecklist(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeechecklist'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeechecklist')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

