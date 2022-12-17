import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjprojectdeliverable } from '../model/prjprojectdeliverable.model';
import { prjprojecttask } from '../model/prjprojecttask.model';
import { bofact } from '../../../../n-tire-bo-app/src/app/model/bofact.model';
import { environment } from '../../environments/environment';
import { IprjprojectdeliverableResponse } from '../model/prjprojectdeliverable.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjprojectdeliverableService {
  formData: prjprojectdeliverable;
  readonly rootURL = AppConstants.baseURL;
  list: prjprojectdeliverable[];
  prjprojecttasks: prjprojecttask[]=[];
  bofacts: bofact[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateprjprojectdeliverables():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      prjprojecttasks: this.prjprojecttasks.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      bofacts: this.bofacts.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprojectURL + '/prjprojectdeliverable', body);
  }
  }

  saveOrUpdateprjprojectdeliverablesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprojectURL + '/prjprojectdeliverable', body);
  }
  }

  getprjprojectdeliverablesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectdeliverable').toPromise();
  }
  }
  getListBydeliverableid(deliverableid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectdeliverable'+'/deliverableid/'+deliverableid).toPromise();
  }
  }

  getListByprojectid(projectid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectdeliverable'+'/projectid/'+projectid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectdeliverable'+'/param/'+key).toPromise();
  }
  }


  getprjprojectdeliverablesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectdeliverable'+'/e/'+id).toPromise();
  }
  }
  getprjprojectdeliverablesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectdeliverable'+'/'+id).toPromise();
  }
  }

  deleteprjprojectdeliverable(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprojectURL + '/prjprojectdeliverable'+'/'+id).toPromise();
  }
  }
clearList(){
this.prjprojecttasks = [];
this.bofacts = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprojectURL + '/prjprojectdeliverable')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IprjprojectdeliverableResponse> {
return this.http.get<IprjprojectdeliverableResponse>(AppConstants.ntireprojectURL+'/prjprojectdeliverable')
.pipe(
tap((response: IprjprojectdeliverableResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(prjprojectdeliverable => new prjprojectdeliverable(prjprojectdeliverable.projectid,prjprojectdeliverable.deliverableid,prjprojectdeliverable.deliverablename,prjprojectdeliverable.targetshare,prjprojectdeliverable.targetdate,prjprojectdeliverable.sequence,prjprojectdeliverable.notes,prjprojectdeliverable.customfield,prjprojectdeliverable.attachment,prjprojectdeliverable.status,prjprojectdeliverable.draft,"",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(prjprojectdeliverable => prjprojectdeliverable.deliverablename.includes(filter.name))

return response;
})
);
}



}

