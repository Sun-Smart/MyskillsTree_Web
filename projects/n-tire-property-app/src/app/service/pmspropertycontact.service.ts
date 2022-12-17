import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmspropertycontact } from '../model/pmspropertycontact.model';
import { environment } from '../../environments/environment';
import { IpmspropertycontactResponse } from '../model/pmspropertycontact.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmspropertycontactService {
  formData: pmspropertycontact;
  readonly rootURL = AppConstants.baseURL;
  list: pmspropertycontact[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmspropertycontacts():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmspropertycontact', body);
  }
  }

  saveOrUpdatepmspropertycontactsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmspropertycontact', body);
  }
  }

  getpmspropertycontactsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertycontact').toPromise();
  }
  }
  getListBycontactid(contactid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertycontact'+'/contactid/'+contactid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertycontact'+'/param/'+key).toPromise();
  }
  }


  getpmspropertycontactsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertycontact'+'/e/'+id).toPromise();
  }
  }
  getpmspropertycontactsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertycontact'+'/'+id).toPromise();
  }
  }

  deletepmspropertycontact(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmspropertycontact'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmspropertycontact')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

