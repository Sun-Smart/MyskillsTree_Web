import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vmsworkplace } from '../model/vmsworkplace.model';
import { environment } from '../../environments/environment';
import { IvmsworkplaceResponse } from '../model/vmsworkplace.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class vmsworkplaceService {
  formData: vmsworkplace;
  readonly rootURL = AppConstants.baseURL;
  list: vmsworkplace[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatevmsworkplaces():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirevisitorURL + '/vmsworkplace', body);
  }
  }

  saveOrUpdatevmsworkplacesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirevisitorURL + '/vmsworkplace', body);
  }
  }

  getvmsworkplacesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsworkplace').toPromise();
  }
  }
  getListByworkplaceid(workplaceid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsworkplace'+'/workplaceid/'+workplaceid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsworkplace'+'/param/'+key).toPromise();
  }
  }


  getvmsworkplacesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsworkplace'+'/e/'+id).toPromise();
  }
  }
  getvmsworkplacesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsworkplace'+'/'+id).toPromise();
  }
  }

  deletevmsworkplace(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirevisitorURL + '/vmsworkplace'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirevisitorURL + '/vmsworkplace')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IvmsworkplaceResponse> {
return this.http.get<IvmsworkplaceResponse>(AppConstants.ntirevisitorURL+'/vmsworkplace')
.pipe(
tap((response: IvmsworkplaceResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(vmsworkplace => new vmsworkplace(vmsworkplace.workplaceid,vmsworkplace.workplace,vmsworkplace.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(vmsworkplace => vmsworkplace.workplace.includes(filter.name))

return response;
})
);
}



}

