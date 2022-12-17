import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmskramaster } from '../model/hrmskramaster.model';
import { hrmskpimaster } from '../model/hrmskpimaster.model';
import { environment } from '../../environments/environment';
import { IhrmskramasterResponse } from '../model/hrmskramaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmskramasterService {
  formData: hrmskramaster;
  readonly rootURL = AppConstants.baseURL;
  list: hrmskramaster[];
  hrmskpimasters: hrmskpimaster[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmskramasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hrmskpimasters: this.hrmskpimasters.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmskramaster', body);
  }
  }

  saveOrUpdatehrmskramastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmskramaster', body);
  }
  }

  gethrmskramastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmskramaster').toPromise();
  }
  }
  getListBykraid(kraid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmskramaster'+'/kraid/'+kraid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmskramaster'+'/param/'+key).toPromise();
  }
  }


  gethrmskramastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmskramaster'+'/e/'+id).toPromise();
  }
  }
  gethrmskramastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmskramaster'+'/'+id).toPromise();
  }
  }

  deletehrmskramaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmskramaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.hrmskpimasters = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmskramaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IhrmskramasterResponse> {
return this.http.get<IhrmskramasterResponse>(AppConstants.ntirehrmsURL+'/hrmskramaster')
.pipe(
tap((response: IhrmskramasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(hrmskramaster => new hrmskramaster(hrmskramaster.kraid,hrmskramaster.kraname,hrmskramaster.kraweightagepercent,hrmskramaster.attachment,hrmskramaster.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(hrmskramaster => hrmskramaster.kraname.includes(filter.name))

return response;
})
);
}



}

