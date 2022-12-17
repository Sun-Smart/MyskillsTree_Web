import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmspadecisionmanagement } from '../model/hrmspadecisionmanagement.model';
import { environment } from '../../environments/environment';
import { IhrmspadecisionmanagementResponse } from '../model/hrmspadecisionmanagement.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmspadecisionmanagementService {
  formData: hrmspadecisionmanagement;
  readonly rootURL = AppConstants.baseURL;
  list: hrmspadecisionmanagement[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmspadecisionmanagements():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmspadecisionmanagement', body);
  }
  }

  saveOrUpdatehrmspadecisionmanagementsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmspadecisionmanagement', body);
  }
  }

  gethrmspadecisionmanagementsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmspadecisionmanagement').toPromise();
  }
  }
  getListByappraisaldecisionid(appraisaldecisionid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmspadecisionmanagement'+'/appraisaldecisionid/'+appraisaldecisionid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmspadecisionmanagement'+'/param/'+key).toPromise();
  }
  }


  gethrmspadecisionmanagementsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmspadecisionmanagement'+'/e/'+id).toPromise();
  }
  }
  gethrmspadecisionmanagementsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmspadecisionmanagement'+'/'+id).toPromise();
  }
  }

  deletehrmspadecisionmanagement(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmspadecisionmanagement'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmspadecisionmanagement')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

