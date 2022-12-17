import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalinterdepartmentqueryresponse } from '../model/legalinterdepartmentqueryresponse.model';
import { environment } from '../../environments/environment';
import { IlegalinterdepartmentqueryresponseResponse } from '../model/legalinterdepartmentqueryresponse.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalinterdepartmentqueryresponseService {
  formData: legalinterdepartmentqueryresponse;
  readonly rootURL = AppConstants.baseURL;
  list: legalinterdepartmentqueryresponse[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalinterdepartmentqueryresponses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalinterdepartmentqueryresponse', body);
  }
  }

  saveOrUpdatelegalinterdepartmentqueryresponsesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalinterdepartmentqueryresponse', body);
  }
  }

  getlegalinterdepartmentqueryresponsesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalinterdepartmentqueryresponse').toPromise();
  }
  }
  getListByidqresponseid(idqresponseid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalinterdepartmentqueryresponse'+'/idqresponseid/'+idqresponseid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalinterdepartmentqueryresponse'+'/param/'+key).toPromise();
  }
  }


  getlegalinterdepartmentqueryresponsesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalinterdepartmentqueryresponse'+'/e/'+id).toPromise();
  }
  }
  getlegalinterdepartmentqueryresponsesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalinterdepartmentqueryresponse'+'/'+id).toPromise();
  }
  }

  deletelegalinterdepartmentqueryresponse(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalinterdepartmentqueryresponse'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalinterdepartmentqueryresponse')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

