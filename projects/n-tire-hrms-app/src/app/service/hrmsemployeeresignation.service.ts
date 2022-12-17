import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeeresignation } from '../model/hrmsemployeeresignation.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeeresignationResponse } from '../model/hrmsemployeeresignation.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeeresignationService {
  formData: hrmsemployeeresignation;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeeresignation[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeeresignations():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeresignation', body);
  }
  }

  saveOrUpdatehrmsemployeeresignationsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeresignation', body);
  }
  }

  gethrmsemployeeresignationsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeresignation').toPromise();
  }
  }
  getListByresignationid(resignationid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeresignation'+'/resignationid/'+resignationid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeresignation'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeeresignationsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeresignation'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeeresignationsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeresignation'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeeresignation(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeeresignation'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeresignation')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

