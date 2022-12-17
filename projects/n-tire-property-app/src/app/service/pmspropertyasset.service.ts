import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmspropertyasset } from '../model/pmspropertyasset.model';
import { environment } from '../../environments/environment';
import { IpmspropertyassetResponse } from '../model/pmspropertyasset.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmspropertyassetService {
  formData: pmspropertyasset;
  readonly rootURL = AppConstants.baseURL;
  list: pmspropertyasset[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmspropertyassets():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmspropertyasset', body);
  }
  }

  saveOrUpdatepmspropertyassetsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmspropertyasset', body);
  }
  }

  getpmspropertyassetsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyasset').toPromise();
  }
  }
  getListBypropertyassetid(propertyassetid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyasset'+'/propertyassetid/'+propertyassetid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyasset'+'/param/'+key).toPromise();
  }
  }


  getpmspropertyassetsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyasset'+'/e/'+id).toPromise();
  }
  }
  getpmspropertyassetsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyasset'+'/'+id).toPromise();
  }
  }

  deletepmspropertyasset(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmspropertyasset'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyasset')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

