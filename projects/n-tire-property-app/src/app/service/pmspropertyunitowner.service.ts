import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmspropertyunitowner } from '../model/pmspropertyunitowner.model';
import { environment } from '../../environments/environment';
import { IpmspropertyunitownerResponse } from '../model/pmspropertyunitowner.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmspropertyunitownerService {
  formData: pmspropertyunitowner;
  readonly rootURL = AppConstants.baseURL;
  list: pmspropertyunitowner[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmspropertyunitowners():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmspropertyunitowner', body);
  }
  }

  saveOrUpdatepmspropertyunitownersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmspropertyunitowner', body);
  }
  }

  getpmspropertyunitownersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyunitowner').toPromise();
  }
  }
  getListBypropertyownerid(propertyownerid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyunitowner'+'/propertyownerid/'+propertyownerid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyunitowner'+'/param/'+key).toPromise();
  }
  }


  getpmspropertyunitownersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyunitowner'+'/e/'+id).toPromise();
  }
  }
  getpmspropertyunitownersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyunitowner'+'/'+id).toPromise();
  }
  }

  deletepmspropertyunitowner(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmspropertyunitowner'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyunitowner')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

