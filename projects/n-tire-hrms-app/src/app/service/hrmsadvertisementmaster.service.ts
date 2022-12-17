import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsadvertisementmaster } from '../model/hrmsadvertisementmaster.model';
import { hrmsadvertisementdetail } from '../model/hrmsadvertisementdetail.model';
import { environment } from '../../environments/environment';
import { IhrmsadvertisementmasterResponse } from '../model/hrmsadvertisementmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsadvertisementmasterService {
  formData: hrmsadvertisementmaster;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsadvertisementmaster[];
  hrmsadvertisementdetails: hrmsadvertisementdetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsadvertisementmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hrmsadvertisementdetails: this.hrmsadvertisementdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsadvertisementmaster', body);
  }
  }

  saveOrUpdatehrmsadvertisementmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsadvertisementmaster', body);
  }
  }

  gethrmsadvertisementmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsadvertisementmaster').toPromise();
  }
  }
  getListByadvertisementid(advertisementid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsadvertisementmaster'+'/advertisementid/'+advertisementid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsadvertisementmaster'+'/param/'+key).toPromise();
  }
  }


  gethrmsadvertisementmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsadvertisementmaster'+'/e/'+id).toPromise();
  }
  }
  gethrmsadvertisementmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsadvertisementmaster'+'/'+id).toPromise();
  }
  }

  deletehrmsadvertisementmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsadvertisementmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.hrmsadvertisementdetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsadvertisementmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IhrmsadvertisementmasterResponse> {
return this.http.get<IhrmsadvertisementmasterResponse>(AppConstants.ntirehrmsURL+'/hrmsadvertisementmaster')
.pipe(
tap((response: IhrmsadvertisementmasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(hrmsadvertisementmaster => new hrmsadvertisementmaster(hrmsadvertisementmaster.advertisementid,hrmsadvertisementmaster.advertisementcode,hrmsadvertisementmaster.releasedate,hrmsadvertisementmaster.remarks,hrmsadvertisementmaster.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(hrmsadvertisementmaster => hrmsadvertisementmaster.advertisementcode.includes(filter.name))

return response;
})
);
}



}

