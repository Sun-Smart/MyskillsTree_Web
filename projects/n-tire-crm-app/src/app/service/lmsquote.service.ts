import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsquote } from '../model/lmsquote.model';
import { lmsquotedetail } from '../model/lmsquotedetail.model';
import { lmsquotepaymentterm } from '../model/lmsquotepaymentterm.model';
import { environment } from '../../environments/environment';
import { IlmsquoteResponse } from '../model/lmsquote.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsquoteService {
  formData: lmsquote;
  readonly rootURL = AppConstants.baseURL;
  list: lmsquote[];
  lmsquotedetails: lmsquotedetail[]=[];
  lmsquotepaymentterms: lmsquotepaymentterm[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmsquotes():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      lmsquotedetails: this.lmsquotedetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      lmsquotepaymentterms: this.lmsquotepaymentterms.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsquote', body);
  }
  }

  saveOrUpdatelmsquotesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsquote', body);
  }
  }

  getlmsquotesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquote').toPromise();
  }
  }
  getListByquoteid(quoteid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquote'+'/quoteid/'+quoteid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquote'+'/param/'+key).toPromise();
  }
  }


  getlmsquotesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquote'+'/e/'+id).toPromise();
  }
  }
  getlmsquotesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquote'+'/'+id).toPromise();
  }
  }

  deletelmsquote(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmsquote'+'/'+id).toPromise();
  }
  }
clearList(){
this.lmsquotedetails = [];
this.lmsquotepaymentterms = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmsquote')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IlmsquoteResponse> {
return this.http.get<IlmsquoteResponse>(AppConstants.ntirecrmURL+'/lmsquote')
.pipe(
tap((response: IlmsquoteResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(lmsquote => new lmsquote(lmsquote.branchid,lmsquote.leadid,lmsquote.opportunityid,lmsquote.opportunityiddesc,lmsquote.quoteid,lmsquote.reference,lmsquote.quotedate,lmsquote.details,lmsquote.assignedto,lmsquote.quoteamount,lmsquote.currency,lmsquote.currencydesc,lmsquote.expirationdate,lmsquote.taxid,lmsquote.taxiddesc,lmsquote.shippingruleid,lmsquote.totalamount,lmsquote.taxamount,lmsquote.charges,lmsquote.paymenttermid,lmsquote.paymenttermiddesc,lmsquote.termid,lmsquote.termiddesc,lmsquote.terms,lmsquote.comments,lmsquote.campaignid,lmsquote.leadsource,lmsquote.leadsourcedesc,lmsquote.supplierquotationid,lmsquote.customfield,lmsquote.attachment,lmsquote.quotestatus,lmsquote.quotestatusdesc,lmsquote.status,"",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(lmsquote => lmsquote.details.includes(filter.name))

return response;
})
);
}



}

