import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpcontractordermaster } from '../model/erpcontractordermaster.model';
import { erpcontractorderterm } from '../model/erpcontractorderterm.model';
import { erpcontractorderdetail } from '../model/erpcontractorderdetail.model';
import { erpcontractorderclause } from '../model/erpcontractorderclause.model';
import { environment } from '../../environments/environment';
import { IerpcontractordermasterResponse } from '../model/erpcontractordermaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpcontractordermasterService {
  formData: erpcontractordermaster;
  readonly rootURL = AppConstants.baseURL;
  list: erpcontractordermaster[];
  erpcontractorderterms: erpcontractorderterm[]=[];
  erpcontractorderdetails: erpcontractorderdetail[]=[];
  erpcontractorderclauses: erpcontractorderclause[]=[];
  Inserterpcontractorderclauses: erpcontractorderclause[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpcontractordermasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpcontractorderterms: this.erpcontractorderterms.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erpcontractorderdetails: this.erpcontractorderdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erpcontractorderclauses: this.Inserterpcontractorderclauses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpcontractordermaster', body);
  }
  }

  saveOrUpdateerpcontractordermastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpcontractordermaster', body);
  }
  }

  geterpcontractordermastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractordermaster').toPromise();
  }
  }
  getListBycontractid(contractid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractordermaster'+'/contractid/'+contractid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractordermaster'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getListBycontracttype(contracttype:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractordermaster'+'/contracttype/'+contracttype).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractordermaster'+'/param/'+key).toPromise();
  }
  }


  geterpcontractordermastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractordermaster'+'/e/'+id).toPromise();
  }
  }
  geterpcontractordermastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractordermaster'+'/'+id).toPromise();
  }
  }

  deleteerpcontractordermaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpcontractordermaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpcontractorderterms = [];
this.erpcontractorderdetails = [];
this.erpcontractorderclauses = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpcontractordermaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
  geterpcontractordermastersListbyassignedto(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractordermaster/'+dt+'').toPromise();
  }
  }

  geterpcontractordermastersListbycontracttype(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractordermaster/'+dt+'').toPromise();
  }
  }

  geterpcontractordermastersListbymonthwise(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractordermaster/'+dt+'').toPromise();
  }
  }

search(filter: {name: string} = {name: ''}, page = 1): Observable<IerpcontractordermasterResponse> {
return this.http.get<IerpcontractordermasterResponse>(AppConstants.ntireprocurementURL+'/erpcontractordermaster')
.pipe(
tap((response: IerpcontractordermasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(erpcontractordermaster => new erpcontractordermaster(erpcontractordermaster.contractid,erpcontractordermaster.branchid,erpcontractordermaster.branchiddesc,erpcontractordermaster.contractname,erpcontractordermaster.contractnumber,erpcontractordermaster.versionnumber,erpcontractordermaster.contractdate,erpcontractordermaster.contracttype,erpcontractordermaster.contracttypedesc,erpcontractordermaster.contractstage,erpcontractordermaster.departmentid,erpcontractordermaster.departmentiddesc,erpcontractordermaster.templatetype,erpcontractordermaster.templatetypedesc,erpcontractordermaster.details,erpcontractordermaster.supportdetails,erpcontractordermaster.parentid,erpcontractordermaster.parentiddesc,erpcontractordermaster.deliverables,erpcontractordermaster.contractvalue,erpcontractordermaster.priority,erpcontractordermaster.prioritydesc,erpcontractordermaster.contracthealth,erpcontractordermaster.contracthealthdesc,erpcontractordermaster.assignedto,erpcontractordermaster.owner,erpcontractordermaster.ownerdesc,erpcontractordermaster.sourcefield,erpcontractordermaster.sourcereference,erpcontractordermaster.sourcereferencedesc,erpcontractordermaster.contactid,erpcontractordermaster.contactiddesc,erpcontractordermaster.effectivedate,erpcontractordermaster.expirationdate,erpcontractordermaster.extensionoptions,erpcontractordermaster.extensionoptionsdesc,erpcontractordermaster.terminationoption,erpcontractordermaster.automaticrenewal,erpcontractordermaster.automaticexpiration,erpcontractordermaster.renewalreminderdate,erpcontractordermaster.contracttemplateid,erpcontractordermaster.terms,erpcontractordermaster.totallistprice,erpcontractordermaster.discount,erpcontractordermaster.total,erpcontractordermaster.shippingcharges,erpcontractordermaster.shippingtax,erpcontractordermaster.shippingtaxamount,erpcontractordermaster.tax,erpcontractordermaster.finalamount,erpcontractordermaster.projectid,erpcontractordermaster.projectiddesc,erpcontractordermaster.liabilitycap,erpcontractordermaster.governinglaw,erpcontractordermaster.terminationforconvenience,erpcontractordermaster.closedsamemonth,erpcontractordermaster.notes,erpcontractordermaster.authorizedby,erpcontractordermaster.overdue,erpcontractordermaster.expirynotification,erpcontractordermaster.alarm,erpcontractordermaster.alarmdesc,erpcontractordermaster.signername,erpcontractordermaster.signeremail,erpcontractordermaster.supplierid,erpcontractordermaster.supplieriddesc,erpcontractordermaster.customfield,erpcontractordermaster.attachment,erpcontractordermaster.status,"","",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(erpcontractordermaster => erpcontractordermaster.contractname.includes(filter.name))

return response;
})
);
}



}

