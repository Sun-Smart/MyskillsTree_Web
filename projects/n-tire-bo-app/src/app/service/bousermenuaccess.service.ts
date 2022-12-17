import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bousermenuaccess } from '../model/bousermenuaccess.model';
import { environment } from '../../environments/environment';
import { IbousermenuaccessResponse } from '../model/bousermenuaccess.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bousermenuaccessService {
  formData: bousermenuaccess;
  readonly rootURL = AppConstants.baseURL;
  list: bousermenuaccess[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebousermenuaccesses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bousermenuaccess', body);
  }
  }

  saveOrUpdatebousermenuaccessesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bousermenuaccess', body);
  }
  }

  getbousermenuaccessesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousermenuaccess').toPromise();
  }
  }
  getListByusermenuaccessid(usermenuaccessid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousermenuaccess'+'/usermenuaccessid/'+usermenuaccessid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousermenuaccess'+'/param/'+key).toPromise();
  }
  }


  getbousermenuaccessesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousermenuaccess'+'/e/'+id).toPromise();
  }
  }
  getbousermenuaccessesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousermenuaccess'+'/'+id).toPromise();
  }
  }

  deletebousermenuaccess(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bousermenuaccess'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bousermenuaccess')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbousermenuaccessResponse> {
return this.http.get<IbousermenuaccessResponse>(AppConstants.ntireboURL+'/bousermenuaccess')
.pipe(
tap((response: IbousermenuaccessResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bousermenuaccess => new bousermenuaccess(bousermenuaccess.usermenuaccessid,bousermenuaccess.userid,bousermenuaccess.menuid,bousermenuaccess.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bousermenuaccess => bousermenuaccess.menudescription.includes(filter.name))

return response;
})
);
}



}

