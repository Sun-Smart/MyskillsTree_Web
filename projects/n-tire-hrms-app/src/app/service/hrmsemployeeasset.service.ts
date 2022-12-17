import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeeasset } from '../model/hrmsemployeeasset.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeeassetResponse } from '../model/hrmsemployeeasset.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeeassetService {
  formData: hrmsemployeeasset;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeeasset[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeeassets():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeasset', body);
  }
  }

  saveOrUpdatehrmsemployeeassetsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeasset', body);
  }
  }

  gethrmsemployeeassetsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeasset').toPromise();
  }
  }
  getListByemployeeassetid(employeeassetid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeasset'+'/employeeassetid/'+employeeassetid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeasset'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeeassetsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeasset'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeeassetsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeasset'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeeasset(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeeasset'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeasset')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

