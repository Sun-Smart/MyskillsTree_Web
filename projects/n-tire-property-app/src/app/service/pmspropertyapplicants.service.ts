import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmspropertyapplicants } from '../model/pmspropertyapplicants.model';
import { environment } from '../../environments/environment';
import { IpmspropertyapplicantsResponse } from '../model/pmspropertyapplicants.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmspropertyapplicantsService {
  formData: pmspropertyapplicants;
  readonly rootURL = AppConstants.baseURL;
  list: pmspropertyapplicants[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmspropertyapplicants():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmspropertyapplicants', body);
  }
  }

  saveOrUpdatepmspropertyapplicantsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmspropertyapplicants', body);
  }
  }

  getpmspropertyapplicantsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyapplicants').toPromise();
  }
  }
  getListByapplicantid(applicantid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyapplicants'+'/applicantid/'+applicantid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyapplicants'+'/param/'+key).toPromise();
  }
  }


  getpmspropertyapplicantsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyapplicants'+'/e/'+id).toPromise();
  }
  }
  getpmspropertyapplicantsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyapplicants'+'/'+id).toPromise();
  }
  }

  deletepmspropertyapplicants(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmspropertyapplicants'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyapplicants')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

