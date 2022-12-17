import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmseosmaster } from '../model/hrmseosmaster.model';
import { hrmseosrole } from '../model/hrmseosrole.model';
import { hrmseosdetail } from '../model/hrmseosdetail.model';
import { environment } from '../../environments/environment';
import { IhrmseosmasterResponse } from '../model/hrmseosmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmseosmasterService {
  formData: hrmseosmaster;
  readonly rootURL = AppConstants.baseURL;
  list: hrmseosmaster[];
  hrmseosroles: hrmseosrole[]=[];
  hrmseosdetails: hrmseosdetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmseosmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hrmseosroles: this.hrmseosroles.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmseosdetails: this.hrmseosdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmseosmaster', body);
  }
  }

  saveOrUpdatehrmseosmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmseosmaster', body);
  }
  }

  gethrmseosmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmseosmaster').toPromise();
  }
  }
  getListByeosd(eosd:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmseosmaster'+'/eosd/'+eosd).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmseosmaster'+'/param/'+key).toPromise();
  }
  }


  gethrmseosmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmseosmaster'+'/e/'+id).toPromise();
  }
  }
  gethrmseosmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmseosmaster'+'/'+id).toPromise();
  }
  }

  deletehrmseosmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmseosmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.hrmseosroles = [];
this.hrmseosdetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmseosmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IhrmseosmasterResponse> {
return this.http.get<IhrmseosmasterResponse>(AppConstants.ntirehrmsURL+'/hrmseosmaster')
.pipe(
tap((response: IhrmseosmasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(hrmseosmaster => new hrmseosmaster(hrmseosmaster.eosd,hrmseosmaster.eoscode,hrmseosmaster.eosname,hrmseosmaster.status,"",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(hrmseosmaster => hrmseosmaster.eosname.includes(filter.name))

return response;
})
);
}



}

