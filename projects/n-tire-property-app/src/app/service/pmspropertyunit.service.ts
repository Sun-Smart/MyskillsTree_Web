import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmspropertyunit } from '../model/pmspropertyunit.model';
import { pmsdeposit } from '../model/pmsdeposit.model';
import { pmspdc } from '../model/pmspdc.model';
import { pmspropertyapplicants } from '../model/pmspropertyapplicants.model';
import { pmspropertyopexdetail } from '../model/pmspropertyopexdetail.model';
import { pmsschedule } from '../model/pmsschedule.model';
import { pmstransaction } from '../model/pmstransaction.model';
import { pmstransactionschedule } from '../model/pmstransactionschedule.model';
import { pmsunitcharges } from '../model/pmsunitcharges.model';
import { pmspropertyinsurance } from '../model/pmspropertyinsurance.model';
import { pmscharge } from '../model/pmscharge.model';
import { pmslease } from '../model/pmslease.model';
import { pmsworkorder } from '../model/pmsworkorder.model';
import { environment } from '../../environments/environment';
import { IpmspropertyunitResponse } from '../model/pmspropertyunit.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmspropertyunitService {
  formData: pmspropertyunit;
  readonly rootURL = AppConstants.baseURL;
  list: pmspropertyunit[];
  pmsdeposits: pmsdeposit[]=[];
  pmspdcs: pmspdc[]=[];
  pmspropertyapplicants: pmspropertyapplicants[]=[];
  pmspropertyopexdetails: pmspropertyopexdetail[]=[];
  pmsschedules: pmsschedule[]=[];
  pmstransactions: pmstransaction[]=[];
  pmstransactionschedules: pmstransactionschedule[]=[];
  pmsunitcharges: pmsunitcharges[]=[];
  pmspropertyinsurances: pmspropertyinsurance[]=[];
  pmscharges: pmscharge[]=[];
  pmsleases: pmslease[]=[];
  pmsworkorders: pmsworkorder[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmspropertyunits():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      pmsdeposits: this.pmsdeposits.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmspdcs: this.pmspdcs.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmspropertyapplicants: this.pmspropertyapplicants.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmspropertyopexdetails: this.pmspropertyopexdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmsschedules: this.pmsschedules.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmstransactions: this.pmstransactions.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmstransactionschedules: this.pmstransactionschedules.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmsunitcharges: this.pmsunitcharges.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmspropertyinsurances: this.pmspropertyinsurances.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmscharges: this.pmscharges.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmsleases: this.pmsleases.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmsworkorders: this.pmsworkorders.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmspropertyunit', body);
  }
  }

  saveOrUpdatepmspropertyunitsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmspropertyunit', body);
  }
  }

  getpmspropertyunitsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyunit').toPromise();
  }
  }
  getListByunitid(unitid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyunit'+'/unitid/'+unitid).toPromise();
  }
  }

  getListBypropertyid(propertyid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyunit'+'/propertyid/'+propertyid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyunit'+'/param/'+key).toPromise();
  }
  }


  getpmspropertyunitsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyunit'+'/e/'+id).toPromise();
  }
  }
  getpmspropertyunitsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyunit'+'/'+id).toPromise();
  }
  }

  deletepmspropertyunit(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmspropertyunit'+'/'+id).toPromise();
  }
  }
clearList(){
this.pmsdeposits = [];
this.pmspdcs = [];
this.pmspropertyapplicants = [];
this.pmspropertyopexdetails = [];
this.pmsschedules = [];
this.pmstransactions = [];
this.pmstransactionschedules = [];
this.pmsunitcharges = [];
this.pmspropertyinsurances = [];
this.pmscharges = [];
this.pmsleases = [];
this.pmsworkorders = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyunit')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IpmspropertyunitResponse> {
return this.http.get<IpmspropertyunitResponse>(AppConstants.ntirepropertyURL+'/pmspropertyunit')
.pipe(
tap((response: IpmspropertyunitResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(pmspropertyunit => new pmspropertyunit(pmspropertyunit.unitid,pmspropertyunit.propertyid,pmspropertyunit.propertyiddesc,pmspropertyunit.unitno,pmspropertyunit.details,pmspropertyunit.unittype,pmspropertyunit.unittypedesc,pmspropertyunit.address1,pmspropertyunit.address2,pmspropertyunit.sqft,pmspropertyunit.sizedetails,pmspropertyunit.beds,pmspropertyunit.bedsdesc,pmspropertyunit.baths,pmspropertyunit.bathsdesc,pmspropertyunit.term,pmspropertyunit.termdesc,pmspropertyunit.rent,pmspropertyunit.deposit,pmspropertyunit.notes,pmspropertyunit.assignowner,pmspropertyunit.ownernotes,pmspropertyunit.advance,pmspropertyunit.invoiceday,pmspropertyunit.hasfirstrentcommission,pmspropertyunit.firstrentcommissiontype,pmspropertyunit.firstrentcommissiontypedesc,pmspropertyunit.firstrentcommission,pmspropertyunit.hasrentcommission,pmspropertyunit.rentcommissiontype,pmspropertyunit.rentcommissiontypedesc,pmspropertyunit.rentcommission,pmspropertyunit.hasrenewalfee,pmspropertyunit.renewalfeetype,pmspropertyunit.renewalfeetypedesc,pmspropertyunit.renewalfee,pmspropertyunit.hasservicefee,pmspropertyunit.servicefeetype,pmspropertyunit.servicefeetypedesc,pmspropertyunit.servicefee,pmspropertyunit.unitstatus,pmspropertyunit.unitstatusdesc,pmspropertyunit.tenantid,pmspropertyunit.tenantiddesc,pmspropertyunit.vacateddate,pmspropertyunit.customfield,pmspropertyunit.attachment,pmspropertyunit.status,"","","","","","","","","","","",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(pmspropertyunit => pmspropertyunit.unitno.includes(filter.name))

return response;
})
);
}



}

