import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { qycomplaintmaster } from '../model/qycomplaintmaster.model';
import { qyrelatedcomplaint } from '../model/qyrelatedcomplaint.model';
import { environment } from '../../environments/environment';
import { IqycomplaintmasterResponse } from '../model/qycomplaintmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class qycomplaintmasterService {
  formData: qycomplaintmaster;
  readonly rootURL = AppConstants.baseURL;
  list: qycomplaintmaster[];
  qyrelatedcomplaints: qyrelatedcomplaint[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateqycomplaintmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      qyrelatedcomplaints: this.qyrelatedcomplaints.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/qycomplaintmaster', body);
  }
  }

  saveOrUpdateqycomplaintmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/qycomplaintmaster', body);
  }
  }

  getqycomplaintmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/qycomplaintmaster').toPromise();
  }
  }
  getListBycomplaintid(complaintid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/qycomplaintmaster'+'/complaintid/'+complaintid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/qycomplaintmaster'+'/param/'+key).toPromise();
  }
  }


  getqycomplaintmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/qycomplaintmaster'+'/e/'+id).toPromise();
  }
  }
  getqycomplaintmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/qycomplaintmaster'+'/'+id).toPromise();
  }
  }

  deleteqycomplaintmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehelpdeskURL + '/qycomplaintmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.qyrelatedcomplaints = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehelpdeskURL + '/qycomplaintmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IqycomplaintmasterResponse> {
return this.http.get<IqycomplaintmasterResponse>(AppConstants.ntirehelpdeskURL+'/qycomplaintmaster')
.pipe(
tap((response: IqycomplaintmasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(qycomplaintmaster => new qycomplaintmaster(qycomplaintmaster.complaintid,qycomplaintmaster.branchid,qycomplaintmaster.reference,qycomplaintmaster.complaintdate,qycomplaintmaster.occurencedate,qycomplaintmaster.title,qycomplaintmaster.complaintsource,qycomplaintmaster.complaintsourcedesc,qycomplaintmaster.complainername,qycomplaintmaster.mobileno,qycomplaintmaster.phoneno,qycomplaintmaster.emailid,qycomplaintmaster.complaintagainst,qycomplaintmaster.complaintcategory,qycomplaintmaster.complaintcategorydesc,qycomplaintmaster.severity,qycomplaintmaster.severitydesc,qycomplaintmaster.complainttype,qycomplaintmaster.complainttypedesc,qycomplaintmaster.complaintdetails,qycomplaintmaster.methodofcontact,qycomplaintmaster.methodofcontactdesc,qycomplaintmaster.contactperson,qycomplaintmaster.actiontype,qycomplaintmaster.actiontypedesc,qycomplaintmaster.actiontakenby,qycomplaintmaster.actiontakenon,qycomplaintmaster.actionstatus,qycomplaintmaster.actionstatusdesc,qycomplaintmaster.actionremarks,qycomplaintmaster.brandname,qycomplaintmaster.part,qycomplaintmaster.modelnumber,qycomplaintmaster.complaintqty,qycomplaintmaster.catalognumber,qycomplaintmaster.serialnumber,qycomplaintmaster.uniquenumber,qycomplaintmaster.customfield,qycomplaintmaster.attachment,qycomplaintmaster.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(qycomplaintmaster => qycomplaintmaster.title.includes(filter.name))

return response;
})
);
}



}

