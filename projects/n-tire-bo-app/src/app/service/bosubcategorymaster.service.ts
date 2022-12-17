import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bosubcategorymaster } from '../model/bosubcategorymaster.model';
import { environment } from '../../environments/environment';
import { IbosubcategorymasterResponse } from '../model/bosubcategorymaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bosubcategorymasterService {
  formData: bosubcategorymaster;
  readonly rootURL = AppConstants.baseURL;
  list: bosubcategorymaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebosubcategorymasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bosubcategorymaster', body);
  }
  }

  saveOrUpdatebosubcategorymastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bosubcategorymaster', body);
  }
  }

  getbosubcategorymastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bosubcategorymaster').toPromise();
  }
  }
  getListBysubcategoryid(subcategoryid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bosubcategorymaster'+'/subcategoryid/'+subcategoryid).toPromise();
  }
  }

  getListBycategoryid(categoryid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bosubcategorymaster'+'/categoryid/'+categoryid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bosubcategorymaster'+'/param/'+key).toPromise();
  }
  }


  getbosubcategorymastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bosubcategorymaster'+'/e/'+id).toPromise();
  }
  }
  getbosubcategorymastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bosubcategorymaster'+'/'+id).toPromise();
  }
  }

  deletebosubcategorymaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bosubcategorymaster'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bosubcategorymaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbosubcategorymasterResponse> {
return this.http.get<IbosubcategorymasterResponse>(AppConstants.ntireboURL+'/bosubcategorymaster')
.pipe(
tap((response: IbosubcategorymasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bosubcategorymaster => new bosubcategorymaster(bosubcategorymaster.subcategoryid,bosubcategorymaster.categoryid,bosubcategorymaster.subcategoryname,bosubcategorymaster.orderno,bosubcategorymaster.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bosubcategorymaster => bosubcategorymaster.masterdatadescription.includes(filter.name))

return response;
})
);
}



}

