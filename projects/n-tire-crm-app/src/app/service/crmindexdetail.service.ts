import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crmindexdetail } from '../model/crmindexdetail.model';
import { environment } from '../../environments/environment';
import { IcrmindexdetailResponse } from '../model/crmindexdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class crmindexdetailService {
  formData: crmindexdetail;
  readonly rootURL = AppConstants.baseURL;
  list: crmindexdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecrmindexdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/crmindexdetail', body);
  }
  }

  saveOrUpdatecrmindexdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/crmindexdetail', body);
  }
  }

  getcrmindexdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmindexdetail').toPromise();
  }
  }
  getListByindexdetailid(indexdetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmindexdetail'+'/indexdetailid/'+indexdetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmindexdetail'+'/param/'+key).toPromise();
  }
  }


  getcrmindexdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmindexdetail'+'/e/'+id).toPromise();
  }
  }
  getcrmindexdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmindexdetail'+'/'+id).toPromise();
  }
  }

  deletecrmindexdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/crmindexdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/crmindexdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IcrmindexdetailResponse> {
return this.http.get<IcrmindexdetailResponse>(AppConstants.ntirecrmURL+'/crmindexdetail')
.pipe(
tap((response: IcrmindexdetailResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(crmindexdetail => new crmindexdetail(crmindexdetail.indexid,crmindexdetail.indexdetailid,crmindexdetail.value,crmindexdetail.parentindexdetail,crmindexdetail.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(crmindexdetail => crmindexdetail.value.includes(filter.name))

return response;
})
);
}



}

