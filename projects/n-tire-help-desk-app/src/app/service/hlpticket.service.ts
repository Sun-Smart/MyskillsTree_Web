import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hlpticket } from '../model/hlpticket.model';
import { hlpplannedaction } from '../model/hlpplannedaction.model';
import { hlpticketdetail } from '../model/hlpticketdetail.model';
import { environment } from '../../environments/environment';
import { IhlpticketResponse } from '../model/hlpticket.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hlpticketService {
  formData: hlpticket;
  readonly rootURL = AppConstants.baseURL;
  list: hlpticket[];
  hlpplannedactions: hlpplannedaction[]=[];
  hlpticketdetails: hlpticketdetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehlptickets():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hlpplannedactions: this.hlpplannedactions.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hlpticketdetails: this.hlpticketdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpticket', body);
  }
  }

  saveOrUpdatehlpticketsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpticket', body);
  }
  }

  gethlpticketsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticket').toPromise();
  }
  }
  getListByticketid(ticketid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticket'+'/ticketid/'+ticketid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticket'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getListBycriticality(criticality:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticket'+'/criticality/'+criticality).toPromise();
  }
  }

  getListBysource(source:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticket'+'/source/'+source).toPromise();
  }
  }

  getListBycategory(category:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticket'+'/category/'+category).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticket'+'/param/'+key).toPromise();
  }
  }


  gethlpticketsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticket'+'/e/'+id).toPromise();
  }
  }
  gethlpticketsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticket'+'/'+id).toPromise();
  }
  }

  deletehlpticket(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehelpdeskURL + '/hlpticket'+'/'+id).toPromise();
  }
  }
clearList(){
this.hlpplannedactions = [];
this.hlpticketdetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticket')
.toPromise()
.then(res => this.list = res as any[]);
}
}
  gethlpticketsListbycriticality(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticket/'+dt+'').toPromise();
  }
  }

  gethlpticketsListbystatus(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticket/'+dt+'').toPromise();
  }
  }

  gethlpticketsListbycategory(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticket/'+dt+'').toPromise();
  }
  }

  gethlpticketsListbytickettype(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticket/'+dt+'').toPromise();
  }
  }

  gethlpticketsListbymonthwise(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticket/'+dt+'').toPromise();
  }
  }

search(filter: {name: string} = {name: ''}, page = 1): Observable<IhlpticketResponse> {
return this.http.get<IhlpticketResponse>(AppConstants.ntirehelpdeskURL+'/hlpticket')
.pipe(
tap((response: IhlpticketResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(hlpticket => new hlpticket(hlpticket.ticketid,hlpticket.sourcefield,hlpticket.sourcefielddesc,hlpticket.sourcereference,hlpticket.branchid,hlpticket.branchiddesc,hlpticket.departmentid,hlpticket.departmentiddesc,hlpticket.requestortype,hlpticket.requestortypedesc,hlpticket.requestor,hlpticket.requestordesc,hlpticket.item,hlpticket.ticketdate,hlpticket.incidentdate,hlpticket.incidenttime,hlpticket.incidentduration,hlpticket.duedate,hlpticket.assignedto,hlpticket.tickettype,hlpticket.tickettypedesc,hlpticket.priority,hlpticket.prioritydesc,hlpticket.criticality,hlpticket.criticalitydesc,hlpticket.impact,hlpticket.impactdesc,hlpticket.risk,hlpticket.riskdesc,hlpticket.sla,hlpticket.sladesc,hlpticket.slabreached,hlpticket.source,hlpticket.sourcedesc,hlpticket.ticketreference,hlpticket.category,hlpticket.categorydesc,hlpticket.subcategory,hlpticket.subcategorydesc,hlpticket.tags,hlpticket.subject,hlpticket.ticketdetails,hlpticket.impacteditems,hlpticket.impactedservices,hlpticket.impactedproducts,hlpticket.impactdetails,hlpticket.remarks,hlpticket.stage,hlpticket.stagedesc,hlpticket.completedby,hlpticket.completedbydesc,hlpticket.linkedtickets,hlpticket.rca,hlpticket.rcadesc,hlpticket.rcadetails,hlpticket.solution,hlpticket.solutiondesc,hlpticket.solutiondetails,hlpticket.solutiongivenon,hlpticket.startdate,hlpticket.completeddate,hlpticket.lessonslearned,hlpticket.history,hlpticket.customfield,hlpticket.attachment,hlpticket.status,"",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(hlpticket => hlpticket.subject.includes(filter.name))

return response;
})
);
}



}

