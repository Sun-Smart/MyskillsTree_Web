import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmsproperties1 } from '../model/pmsproperties1.model';
import { environment } from '../../environments/environment';
import { Ipmsproperties1Response } from '../model/pmsproperties1.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmsproperties1Service {
  formData: pmsproperties1;
  readonly rootURL = AppConstants.baseURL;
  list: pmsproperties1[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatedelpmsproperties1():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmsproperties1', body);
  }
  }

  saveOrUpdatedelpmsproperties1List():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmsproperties1', body);
  }
  }

  getdelpmsproperties1List():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsproperties1').toPromise();
  }
  }
  getListBypropertyid(propertyid:):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsproperties1'+'/propertyid/'+propertyid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsproperties1'+'/param/'+key).toPromise();
  }
  }


  getdelpmsproperties1ByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsproperties1'+'/e/'+id).toPromise();
  }
  }
  getdelpmsproperties1ByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsproperties1'+'/'+id).toPromise();
  }
  }

  deletepmsproperties1(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmsproperties1'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmsproperties1')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<Ipmsproperties1Response> {
return this.http.get<Ipmsproperties1Response>(AppConstants.ntirepropertyURL+'/pmsproperties1')
.pipe(
tap((response: Ipmsproperties1Response) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(pmsproperties1 => new pmsproperties1())
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(pmsproperties1 => pmsproperties1.title.includes(filter.name))

return response;
})
);
}



}

