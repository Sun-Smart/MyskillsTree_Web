import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalcase } from '../model/legalcase.model';
import { legalcaselawyer } from '../model/legalcaselawyer.model';
import { legalcasepartydetail } from '../model/legalcasepartydetail.model';
import { legalcaseprocessdetail } from '../model/legalcaseprocessdetail.model';
import { legalcaseinterimorder } from '../model/legalcaseinterimorder.model';
import { legalcasereferredcase } from '../model/legalcasereferredcase.model';
import { legalcasekb } from '../model/legalcasekb.model';
import { legaltaskmaster } from '../model/legaltaskmaster.model';
import { boexpense } from '../../../../n-tire-bo-app/src/app/model/boexpense.model';
import { legalfreenote } from '../model/legalfreenote.model';
import { legalcommunicationdetail } from '../model/legalcommunicationdetail.model';
import { legalcaseagainstemployee } from '../model/legalcaseagainstemployee.model';
import { legalcasehearing } from '../model/legalcasehearing.model';
import { environment } from '../../environments/environment';
import { IlegalcaseResponse } from '../model/legalcase.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalcaseService {
  formData: legalcase;
  readonly rootURL = AppConstants.baseURL;
  list: legalcase[];
  legalcaselawyers: legalcaselawyer[]=[];
  legalcasepartydetails: legalcasepartydetail[]=[];
  legalcaseprocessdetails: legalcaseprocessdetail[]=[];
  legalcaseinterimorders: legalcaseinterimorder[]=[];
  legalcasereferredcases: legalcasereferredcase[]=[];
  Insertlegalcasereferredcases: legalcasereferredcase[]=[];
  legalcasekbs: legalcasekb[]=[];
  Insertlegalcasekbs: legalcasekb[]=[];
  legaltaskmasters: legaltaskmaster[]=[];
  boexpenses: boexpense[]=[];
  legalfreenotes: legalfreenote[]=[];
  legalcommunicationdetails: legalcommunicationdetail[]=[];
  legalcaseagainstemployees: legalcaseagainstemployee[]=[];
  legalcasehearings: legalcasehearing[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalcases():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      legalcaselawyers: this.legalcaselawyers.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      legalcasepartydetails: this.legalcasepartydetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      legalcaseprocessdetails: this.legalcaseprocessdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      legalcaseinterimorders: this.legalcaseinterimorders.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      legalcasereferredcases: this.Insertlegalcasereferredcases.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      legalcasekbs: this.Insertlegalcasekbs.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      legaltaskmasters: this.legaltaskmasters.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      boexpenses: this.boexpenses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      legalfreenotes: this.legalfreenotes.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      legalcommunicationdetails: this.legalcommunicationdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      legalcaseagainstemployees: this.legalcaseagainstemployees.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      legalcasehearings: this.legalcasehearings.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcase', body);
  }
  }

  saveOrUpdatelegalcasesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcase', body);
  }
  }

  getlegalcasesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcase').toPromise();
  }
  }
  getListBycaseid(caseid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcase'+'/caseid/'+caseid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcase'+'/param/'+key).toPromise();
  }
  }


  getlegalcasesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcase'+'/e/'+id).toPromise();
  }
  }
  getlegalcasesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcase'+'/'+id).toPromise();
  }
  }

  deletelegalcase(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalcase'+'/'+id).toPromise();
  }
  }
clearList(){
this.legalcaselawyers = [];
this.legalcasepartydetails = [];
this.legalcaseprocessdetails = [];
this.legalcaseinterimorders = [];
this.legalcasereferredcases = [];
this.legalcasekbs = [];
this.legaltaskmasters = [];
this.boexpenses = [];
this.legalfreenotes = [];
this.legalcommunicationdetails = [];
this.legalcaseagainstemployees = [];
this.legalcasehearings = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalcase')
.toPromise()
.then(res => this.list = res as any[]);
}
}
  getlegalcasesListbytype(dt:string,casetype:string,subtype:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcase/'+dt+'/'+casetype+'/'+subtype+'').toPromise();
  }
  }

  getlegalcasesListbystatus(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcase/'+dt+'').toPromise();
  }
  }

  getlegalcasesListbycourtid(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcase/'+dt+'').toPromise();
  }
  }

  getlegalcasesListbyjudgementoutcome(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcase/'+dt+'').toPromise();
  }
  }

  getlegalcasesListbycasestage(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcase/'+dt+'').toPromise();
  }
  }

  getlegalcasesListbyassignedby(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcase/'+dt+'').toPromise();
  }
  }

  getlegalcasesListbylawyer(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcase/'+dt+'').toPromise();
  }
  }

  getlegalcasesListbymonthwise(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcase/'+dt+'').toPromise();
  }
  }

search(filter: {name: string} = {name: ''}, page = 1): Observable<IlegalcaseResponse> {
return this.http.get<IlegalcaseResponse>(AppConstants.ntirelegalURL+'/legalcase')
.pipe(
tap((response: IlegalcaseResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(legalcase => new legalcase(legalcase.caseid,legalcase.casecode,legalcase.casenumber,legalcase.internalreferencenumber,legalcase.courtid,legalcase.courtiddesc,legalcase.petitiontype,legalcase.petitiontypedesc,legalcase.customerid,legalcase.customeriddesc,legalcase.customerposition,legalcase.customerpositiondesc,legalcase.opponentid,legalcase.opponentiddesc,legalcase.opponentposition,legalcase.opponentpositiondesc,legalcase.casedate,legalcase.casereceiveddate,legalcase.duedate,legalcase.noticedate,legalcase.fileddate,legalcase.previouscasenumber,legalcase.previouscasenumberdesc,legalcase.caseowner,legalcase.requestedby,legalcase.requestedbydesc,legalcase.assignedby,legalcase.assignedbydesc,legalcase.casemode,legalcase.casemodedesc,legalcase.casetype,legalcase.casetypedesc,legalcase.casesubtype,legalcase.casesubtypedesc,legalcase.casetitle,legalcase.casedetails,legalcase.firstdateofhearing,legalcase.date1,legalcase.notes1,legalcase.date2,legalcase.notes2,legalcase.date3,legalcase.notes3,legalcase.category,legalcase.categorydesc,legalcase.nature,legalcase.naturedesc,legalcase.complexity,legalcase.complexitydesc,legalcase.priority,legalcase.prioritydesc,legalcase.timeline,legalcase.timelinedesc,legalcase.amountinvolved,legalcase.judgementvalue,legalcase.amountreceived,legalcase.customfield,legalcase.attachment,legalcase.judgementdate,legalcase.judgementinfavour,legalcase.judgementoutcome,legalcase.judgementoutcomedesc,legalcase.judgementdescription,legalcase.actiontobetaken,legalcase.actionby,legalcase.actionbydesc,legalcase.actionimplemented,legalcase.contestfurther,legalcase.closeddate,legalcase.casestage,legalcase.casestagedesc,legalcase.casestatus,legalcase.casestatusdesc,legalcase.lawyer,legalcase.lawyerdesc,legalcase.lastprocess,legalcase.currentprocess,legalcase.nexthearingdate,legalcase.casetag,legalcase.notes,legalcase.status,"","","","","","","","","","","",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(legalcase => legalcase.casenumber.includes(filter.name))

return response;
})
);
}



}

