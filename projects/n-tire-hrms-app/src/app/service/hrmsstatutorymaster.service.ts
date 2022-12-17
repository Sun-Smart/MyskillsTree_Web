import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsstatutorymaster } from '../model/hrmsstatutorymaster.model';
import { hrmsstatutorydetail } from '../model/hrmsstatutorydetail.model';
import { hrmsstatutoryrole } from '../model/hrmsstatutoryrole.model';
import { environment } from '../../environments/environment';
import { IhrmsstatutorymasterResponse } from '../model/hrmsstatutorymaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsstatutorymasterService {
  formData: hrmsstatutorymaster;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsstatutorymaster[];
  hrmsstatutorydetails: hrmsstatutorydetail[]=[];
  hrmsstatutoryroles: hrmsstatutoryrole[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsstatutorymasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hrmsstatutorydetails: this.hrmsstatutorydetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsstatutoryroles: this.hrmsstatutoryroles.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsstatutorymaster', body);
  }
  }

  saveOrUpdatehrmsstatutorymastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsstatutorymaster', body);
  }
  }

  gethrmsstatutorymastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsstatutorymaster').toPromise();
  }
  }
  getListBystatutoryid(statutoryid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsstatutorymaster'+'/statutoryid/'+statutoryid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsstatutorymaster'+'/param/'+key).toPromise();
  }
  }


  gethrmsstatutorymastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsstatutorymaster'+'/e/'+id).toPromise();
  }
  }
  gethrmsstatutorymastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsstatutorymaster'+'/'+id).toPromise();
  }
  }

  deletehrmsstatutorymaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsstatutorymaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.hrmsstatutorydetails = [];
this.hrmsstatutoryroles = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsstatutorymaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IhrmsstatutorymasterResponse> {
return this.http.get<IhrmsstatutorymasterResponse>(AppConstants.ntirehrmsURL+'/hrmsstatutorymaster')
.pipe(
tap((response: IhrmsstatutorymasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(hrmsstatutorymaster => new hrmsstatutorymaster(hrmsstatutorymaster.statutoryid,hrmsstatutorymaster.statutorycode,hrmsstatutorymaster.statutoryname,hrmsstatutorymaster.status,"",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(hrmsstatutorymaster => hrmsstatutorymaster.statutoryname.includes(filter.name))

return response;
})
);
}



}

