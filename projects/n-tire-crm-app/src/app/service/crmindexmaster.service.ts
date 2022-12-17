import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crmindexmaster } from '../model/crmindexmaster.model';
import { crmindexdetail } from '../model/crmindexdetail.model';
import { environment } from '../../environments/environment';
import { IcrmindexmasterResponse } from '../model/crmindexmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class crmindexmasterService {
  formData: crmindexmaster;
  readonly rootURL = AppConstants.baseURL;
  list: crmindexmaster[];
  crmindexdetails: crmindexdetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecrmindexmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      crmindexdetails: this.crmindexdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecrmURL + '/crmindexmaster', body);
  }
  }

  saveOrUpdatecrmindexmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/crmindexmaster', body);
  }
  }

  getcrmindexmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmindexmaster').toPromise();
  }
  }
  getListByindexid(indexid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmindexmaster'+'/indexid/'+indexid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmindexmaster'+'/param/'+key).toPromise();
  }
  }


  getcrmindexmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmindexmaster'+'/e/'+id).toPromise();
  }
  }
  getcrmindexmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmindexmaster'+'/'+id).toPromise();
  }
  }

  deletecrmindexmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/crmindexmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.crmindexdetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/crmindexmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IcrmindexmasterResponse> {
return this.http.get<IcrmindexmasterResponse>(AppConstants.ntirecrmURL+'/crmindexmaster')
.pipe(
tap((response: IcrmindexmasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(crmindexmaster => new crmindexmaster(crmindexmaster.indexid,crmindexmaster.indexname,crmindexmaster.valuenode,crmindexmaster.valuenodedesc,crmindexmaster.parentindex,crmindexmaster.value,crmindexmaster.mandatory,crmindexmaster.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(crmindexmaster => crmindexmaster.indexname.includes(filter.name))

return response;
})
);
}



}

