import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { qygrievancemaster } from '../model/qygrievancemaster.model';
import { qyrelatedgrievance } from '../model/qyrelatedgrievance.model';
import { environment } from '../../environments/environment';
import { IqygrievancemasterResponse } from '../model/qygrievancemaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class qygrievancemasterService {
  formData: qygrievancemaster;
  readonly rootURL = AppConstants.baseURL;
  list: qygrievancemaster[];
  qyrelatedgrievances: qyrelatedgrievance[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateqygrievancemasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      qyrelatedgrievances: this.qyrelatedgrievances.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/qygrievancemaster', body);
  }
  }

  saveOrUpdateqygrievancemastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/qygrievancemaster', body);
  }
  }

  getqygrievancemastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/qygrievancemaster').toPromise();
  }
  }
  getListBygrievanceid(grievanceid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/qygrievancemaster'+'/grievanceid/'+grievanceid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/qygrievancemaster'+'/param/'+key).toPromise();
  }
  }


  getqygrievancemastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/qygrievancemaster'+'/e/'+id).toPromise();
  }
  }
  getqygrievancemastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/qygrievancemaster'+'/'+id).toPromise();
  }
  }

  deleteqygrievancemaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehelpdeskURL + '/qygrievancemaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.qyrelatedgrievances = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehelpdeskURL + '/qygrievancemaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IqygrievancemasterResponse> {
return this.http.get<IqygrievancemasterResponse>(AppConstants.ntirehelpdeskURL+'/qygrievancemaster')
.pipe(
tap((response: IqygrievancemasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(qygrievancemaster => new qygrievancemaster(qygrievancemaster.grievanceid,qygrievancemaster.branchid,qygrievancemaster.reference,qygrievancemaster.grievancedate,qygrievancemaster.occurencedate,qygrievancemaster.title,qygrievancemaster.grievancesource,qygrievancemaster.grievancesourcedesc,qygrievancemaster.grievanceby,qygrievancemaster.complainantname,qygrievancemaster.gender,qygrievancemaster.genderdesc,qygrievancemaster.relationship,qygrievancemaster.relationshipdesc,qygrievancemaster.mobileno,qygrievancemaster.phoneno,qygrievancemaster.emailid,qygrievancemaster.complainantaddress,qygrievancemaster.grievanceagainst,qygrievancemaster.defendantaddress,qygrievancemaster.onbehalf,qygrievancemaster.grievancecategory,qygrievancemaster.grievancecategorydesc,qygrievancemaster.severity,qygrievancemaster.severitydesc,qygrievancemaster.grievancetype,qygrievancemaster.grievancetypedesc,qygrievancemaster.grievancedetails,qygrievancemaster.methodofcontact,qygrievancemaster.contactperson,qygrievancemaster.comments,qygrievancemaster.allcomments,qygrievancemaster.actiontype,qygrievancemaster.actiontakenby,qygrievancemaster.actiontakenon,qygrievancemaster.actionstatus,qygrievancemaster.actionstatusdesc,qygrievancemaster.actionremarks,qygrievancemaster.customfield,qygrievancemaster.attachment,qygrievancemaster.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(qygrievancemaster => qygrievancemaster.complainantname.includes(filter.name))

return response;
})
);
}



}

