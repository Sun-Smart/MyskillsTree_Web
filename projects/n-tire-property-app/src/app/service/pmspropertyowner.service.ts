import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmspropertyowner } from '../model/pmspropertyowner.model';
import { pmslease } from '../model/pmslease.model';
import { pmsworkorder } from '../model/pmsworkorder.model';
import { pmscharge } from '../model/pmscharge.model';
import { pmsdeposit } from '../model/pmsdeposit.model';
import { pmspdc } from '../model/pmspdc.model';
import { pmspropertyopexdetail } from '../model/pmspropertyopexdetail.model';
import { pmsschedule } from '../model/pmsschedule.model';
import { pmstransaction } from '../model/pmstransaction.model';
import { pmstransactionschedule } from '../model/pmstransactionschedule.model';
import { pmsownerkycdetail } from '../model/pmsownerkycdetail.model';
import { pmspropertyunitowner } from '../model/pmspropertyunitowner.model';
import { pmsunitcharges } from '../model/pmsunitcharges.model';
import { environment } from '../../environments/environment';
import { IpmspropertyownerResponse } from '../model/pmspropertyowner.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmspropertyownerService {
  formData: pmspropertyowner;
  readonly rootURL = AppConstants.baseURL;
  list: pmspropertyowner[];
  pmsleases: pmslease[]=[];
  pmsworkorders: pmsworkorder[]=[];
  pmscharges: pmscharge[]=[];
  pmsdeposits: pmsdeposit[]=[];
  pmspdcs: pmspdc[]=[];
  pmspropertyopexdetails: pmspropertyopexdetail[]=[];
  pmsschedules: pmsschedule[]=[];
  pmstransactions: pmstransaction[]=[];
  pmstransactionschedules: pmstransactionschedule[]=[];
  pmsownerkycdetails: pmsownerkycdetail[]=[];
  pmspropertyunitowners: pmspropertyunitowner[]=[];
  pmsunitcharges: pmsunitcharges[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmspropertyowners():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      pmsleases: this.pmsleases.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmsworkorders: this.pmsworkorders.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmscharges: this.pmscharges.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmsdeposits: this.pmsdeposits.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmspdcs: this.pmspdcs.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmspropertyopexdetails: this.pmspropertyopexdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmsschedules: this.pmsschedules.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmstransactions: this.pmstransactions.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmstransactionschedules: this.pmstransactionschedules.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmsownerkycdetails: this.pmsownerkycdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmspropertyunitowners: this.pmspropertyunitowners.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmsunitcharges: this.pmsunitcharges.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmspropertyowner', body);
  }
  }

  saveOrUpdatepmspropertyownersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmspropertyowner', body);
  }
  }

  getpmspropertyownersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyowner').toPromise();
  }
  }
  getListByownerid(ownerid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyowner'+'/ownerid/'+ownerid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyowner'+'/param/'+key).toPromise();
  }
  }


  getpmspropertyownersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyowner'+'/e/'+id).toPromise();
  }
  }
  getpmspropertyownersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyowner'+'/'+id).toPromise();
  }
  }

  deletepmspropertyowner(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmspropertyowner'+'/'+id).toPromise();
  }
  }
clearList(){
this.pmsleases = [];
this.pmsworkorders = [];
this.pmscharges = [];
this.pmsdeposits = [];
this.pmspdcs = [];
this.pmspropertyopexdetails = [];
this.pmsschedules = [];
this.pmstransactions = [];
this.pmstransactionschedules = [];
this.pmsownerkycdetails = [];
this.pmspropertyunitowners = [];
this.pmsunitcharges = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyowner')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IpmspropertyownerResponse> {
return this.http.get<IpmspropertyownerResponse>(AppConstants.ntirepropertyURL+'/pmspropertyowner')
.pipe(
tap((response: IpmspropertyownerResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(pmspropertyowner => new pmspropertyowner(pmspropertyowner.ownerid,pmspropertyowner.firstname,pmspropertyowner.lastname,pmspropertyowner.iscompany,pmspropertyowner.companyname,pmspropertyowner.thumbnail,pmspropertyowner.emailid,pmspropertyowner.mobileno,pmspropertyowner.housecontactno,pmspropertyowner.officecontactno,pmspropertyowner.address1,pmspropertyowner.address2,pmspropertyowner.countryid,pmspropertyowner.countryiddesc,pmspropertyowner.stateid,pmspropertyowner.stateiddesc,pmspropertyowner.cityid,pmspropertyowner.cityiddesc,pmspropertyowner.bankname,pmspropertyowner.bankaccount,pmspropertyowner.iban,pmspropertyowner.nationalitynumber,pmspropertyowner.status,"","","","","","","","","","","",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(pmspropertyowner => pmspropertyowner.lastname.includes(filter.name))

return response;
})
);
}



}

