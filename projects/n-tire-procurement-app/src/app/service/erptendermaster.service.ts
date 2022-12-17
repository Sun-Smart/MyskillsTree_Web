import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erptendermaster } from '../model/erptendermaster.model';
import { erptendercompliance } from '../model/erptendercompliance.model';
import { erptenderquotationmaster } from '../model/erptenderquotationmaster.model';
import { erptendersupplierresponse } from '../model/erptendersupplierresponse.model';
import { erptenderaccess } from '../model/erptenderaccess.model';
import { erptendercorrigendum } from '../model/erptendercorrigendum.model';
import { erptenderdetail } from '../model/erptenderdetail.model';
import { erptenderquestion } from '../model/erptenderquestion.model';
import { environment } from '../../environments/environment';
import { IerptendermasterResponse } from '../model/erptendermaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erptendermasterService {
  formData: erptendermaster;
  readonly rootURL = AppConstants.baseURL;
  list: erptendermaster[];
  erptendercompliances: erptendercompliance[]=[];
  erptenderquotationmasters: erptenderquotationmaster[]=[];
  erptendersupplierresponses: erptendersupplierresponse[]=[];
  erptenderaccesses: erptenderaccess[]=[];
  Inserterptenderaccesses: erptenderaccess[]=[];
  erptendercorrigendums: erptendercorrigendum[]=[];
  erptenderdetails: erptenderdetail[]=[];
  erptenderquestions: erptenderquestion[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerptendermasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erptendercompliances: this.erptendercompliances.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erptenderquotationmasters: this.erptenderquotationmasters.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erptendersupplierresponses: this.erptendersupplierresponses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erptenderaccesses: this.Inserterptenderaccesses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erptendercorrigendums: this.erptendercorrigendums.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erptenderdetails: this.erptenderdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erptenderquestions: this.erptenderquestions.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptendermaster', body);
  }
  }

  saveOrUpdateerptendermastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptendermaster', body);
  }
  }

  geterptendermastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendermaster').toPromise();
  }
  }
  getListBytenderid(tenderid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendermaster'+'/tenderid/'+tenderid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendermaster'+'/param/'+key).toPromise();
  }
  }


  geterptendermastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendermaster'+'/e/'+id).toPromise();
  }
  }
  geterptendermastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendermaster'+'/'+id).toPromise();
  }
  }

  deleteerptendermaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erptendermaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.erptendercompliances = [];
this.erptenderquotationmasters = [];
this.erptendersupplierresponses = [];
this.erptenderaccesses = [];
this.erptendercorrigendums = [];
this.erptenderdetails = [];
this.erptenderquestions = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erptendermaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IerptendermasterResponse> {
return this.http.get<IerptendermasterResponse>(AppConstants.ntireprocurementURL+'/erptendermaster')
.pipe(
tap((response: IerptendermasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(erptendermaster => new erptendermaster(erptendermaster.tenderid,erptendermaster.tenderdate,erptendermaster.title,erptendermaster.biddingtype,erptendermaster.biddingtypedesc,erptendermaster.tendercategory,erptendermaster.tendercategorydesc,erptendermaster.tendertype,erptendermaster.tendertypedesc,erptendermaster.biddingsystem,erptendermaster.biddingsystemdesc,erptendermaster.details,erptendermaster.startdate,erptendermaster.enddate,erptendermaster.tenderuploaddate,erptendermaster.prebid,erptendermaster.prebiddate,erptendermaster.tendervalue,erptendermaster.earnestmoney,erptendermaster.documentcost,erptendermaster.offervaliditydays,erptendermaster.completionperiod,erptendermaster.completionperiodunit,erptendermaster.completionperiodunitdesc,erptendermaster.department,erptendermaster.departmentdesc,erptendermaster.biddingstyle,erptendermaster.biddingstyledesc,erptendermaster.biddingunit,erptendermaster.biddingunitdesc,erptendermaster.contracttype,erptendermaster.contracttypedesc,erptendermaster.jvallowed,erptendermaster.deliverytime,erptendermaster.deliverytimedesc,erptendermaster.deliveryterms,erptendermaster.deliverytermsdesc,erptendermaster.minbidvalue,erptendermaster.bidrankingorder,erptendermaster.bidrankingorderdesc,erptendermaster.responsiblebranchid,erptendermaster.responsiblebranchiddesc,erptendermaster.deliverybranchid,erptendermaster.deliverybranchiddesc,erptendermaster.assignedto,erptendermaster.visibleall,erptendermaster.instructions,erptendermaster.conditions,erptendermaster.prepaidfreight,erptendermaster.shipcarrier,erptendermaster.internalnotes,erptendermaster.suppliernotes,erptendermaster.autoeliminationrule,erptendermaster.minimumincrement,erptendermaster.initialcoolingoffperiod,erptendermaster.subsequentcoolingoffperiod,erptendermaster.supplierid,erptendermaster.supplieriddesc,erptendermaster.l1,erptendermaster.l2,erptendermaster.l3,erptendermaster.customfield,erptendermaster.attachment,erptendermaster.status,"","","","","","",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(erptendermaster => erptendermaster.title.includes(filter.name))

return response;
})
);
}



}

