import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bobranchsublocation } from '../model/bobranchsublocation.model';
import { environment } from '../../environments/environment';
import { IbobranchsublocationResponse } from '../model/bobranchsublocation.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bobranchsublocationService {
  formData: bobranchsublocation;
  readonly rootURL = AppConstants.baseURL;
  list: bobranchsublocation[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebobranchsublocations():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bobranchsublocation', body);
  }
  }

  saveOrUpdatebobranchsublocationsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bobranchsublocation', body);
  }
  }

  getbobranchsublocationsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchsublocation').toPromise();
  }
  }
  getListBysublocationid(sublocationid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchsublocation'+'/sublocationid/'+sublocationid).toPromise();
  }
  }

  getListBylocationid(locationid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchsublocation'+'/locationid/'+locationid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchsublocation'+'/param/'+key).toPromise();
  }
  }


  getbobranchsublocationsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchsublocation'+'/e/'+id).toPromise();
  }
  }
  getbobranchsublocationsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchsublocation'+'/'+id).toPromise();
  }
  }

  deletebobranchsublocation(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bobranchsublocation'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bobranchsublocation')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbobranchsublocationResponse> {
return this.http.get<IbobranchsublocationResponse>(AppConstants.ntireboURL+'/bobranchsublocation')
.pipe(
tap((response: IbobranchsublocationResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bobranchsublocation => new bobranchsublocation(bobranchsublocation.branchid,bobranchsublocation.sublocationid,bobranchsublocation.locationid,bobranchsublocation.locationiddesc,bobranchsublocation.locationname,bobranchsublocation.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bobranchsublocation => bobranchsublocation.locationname.includes(filter.name))

return response;
})
);
}



}

