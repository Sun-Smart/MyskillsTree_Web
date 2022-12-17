import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmskpimaster } from '../model/hrmskpimaster.model';
import { environment } from '../../environments/environment';
import { IhrmskpimasterResponse } from '../model/hrmskpimaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmskpimasterService {
  formData: hrmskpimaster;
  readonly rootURL = AppConstants.baseURL;
  list: hrmskpimaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmskpimasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmskpimaster', body);
  }
  }

  saveOrUpdatehrmskpimastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmskpimaster', body);
  }
  }

  gethrmskpimastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmskpimaster').toPromise();
  }
  }
  getListBykpiid(kpiid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmskpimaster'+'/kpiid/'+kpiid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmskpimaster'+'/param/'+key).toPromise();
  }
  }


  gethrmskpimastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmskpimaster'+'/e/'+id).toPromise();
  }
  }
  gethrmskpimastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmskpimaster'+'/'+id).toPromise();
  }
  }

  deletehrmskpimaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmskpimaster'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmskpimaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IhrmskpimasterResponse> {
return this.http.get<IhrmskpimasterResponse>(AppConstants.ntirehrmsURL+'/hrmskpimaster')
.pipe(
tap((response: IhrmskpimasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(hrmskpimaster => new hrmskpimaster(hrmskpimaster.kraid,hrmskpimaster.kpiid,hrmskpimaster.kpidescription,hrmskpimaster.weightagepercent,hrmskpimaster.expectedvalue,hrmskpimaster.attachment,hrmskpimaster.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(hrmskpimaster => hrmskpimaster.kpidescription.includes(filter.name))

return response;
})
);
}



}

