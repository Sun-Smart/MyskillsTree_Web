import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmstenant } from '../model/pmstenant.model';
import { pmspropertyinsurance } from '../model/pmspropertyinsurance.model';
import { pmsdeposit } from '../model/pmsdeposit.model';
import { pmscharge } from '../model/pmscharge.model';
import { pmsschedule } from '../model/pmsschedule.model';
import { pmspdc } from '../model/pmspdc.model';
import { pmskycdetail } from '../model/pmskycdetail.model';
import { pmslease } from '../model/pmslease.model';
import { pmsworkorder } from '../model/pmsworkorder.model';
import { pmspropertyunit } from '../model/pmspropertyunit.model';
import { environment } from '../../environments/environment';
import { IpmstenantResponse } from '../model/pmstenant.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmstenantService {
  formData: pmstenant;
  readonly rootURL = AppConstants.baseURL;
  list: pmstenant[];
  pmspropertyinsurances: pmspropertyinsurance[]=[];
  pmsdeposits: pmsdeposit[]=[];
  pmscharges: pmscharge[]=[];
  pmsschedules: pmsschedule[]=[];
  pmspdcs: pmspdc[]=[];
  pmskycdetails: pmskycdetail[]=[];
  pmsleases: pmslease[]=[];
  pmsworkorders: pmsworkorder[]=[];
  pmspropertyunits: pmspropertyunit[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmstenants():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      pmspropertyinsurances: this.pmspropertyinsurances.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmsdeposits: this.pmsdeposits.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmscharges: this.pmscharges.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmsschedules: this.pmsschedules.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmspdcs: this.pmspdcs.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmskycdetails: this.pmskycdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmsleases: this.pmsleases.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmsworkorders: this.pmsworkorders.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmspropertyunits: this.pmspropertyunits.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmstenant', body);
  }
  }

  saveOrUpdatepmstenantsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmstenant', body);
  }
  }

  getpmstenantsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmstenant').toPromise();
  }
  }
  getListBytenantid(tenantid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmstenant'+'/tenantid/'+tenantid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmstenant'+'/param/'+key).toPromise();
  }
  }


  getpmstenantsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmstenant'+'/e/'+id).toPromise();
  }
  }
  getpmstenantsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmstenant'+'/'+id).toPromise();
  }
  }

  deletepmstenant(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmstenant'+'/'+id).toPromise();
  }
  }
clearList(){
this.pmspropertyinsurances = [];
this.pmsdeposits = [];
this.pmscharges = [];
this.pmsschedules = [];
this.pmspdcs = [];
this.pmskycdetails = [];
this.pmsleases = [];
this.pmsworkorders = [];
this.pmspropertyunits = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmstenant')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IpmstenantResponse> {
return this.http.get<IpmstenantResponse>(AppConstants.ntirepropertyURL+'/pmstenant')
.pipe(
tap((response: IpmstenantResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(pmstenant => new pmstenant(pmstenant.tenantid,pmstenant.tenantiddesc,pmstenant.firstname,pmstenant.lastname,pmstenant.iscompany,pmstenant.companyname,pmstenant.thumbnail,pmstenant.propertyid,pmstenant.propertyiddesc,pmstenant.unitid,pmstenant.unitiddesc,pmstenant.datesigned,pmstenant.movein,pmstenant.moveout,pmstenant.memberscount,pmstenant.identityno,pmstenant.dateofbirth,pmstenant.age,pmstenant.gender,pmstenant.genderdesc,pmstenant.emailid,pmstenant.mobileno,pmstenant.housecontactno,pmstenant.officecontactno,pmstenant.employer,pmstenant.address1,pmstenant.address2,pmstenant.countryid,pmstenant.countryiddesc,pmstenant.stateid,pmstenant.stateiddesc,pmstenant.cityid,pmstenant.cityiddesc,pmstenant.bankname,pmstenant.bankaccount,pmstenant.iban,pmstenant.petdetails,pmstenant.vehicledetails,pmstenant.firstname1,pmstenant.lastname1,pmstenant.identityno1,pmstenant.dateofbirth1,pmstenant.age1,pmstenant.gender1,pmstenant.gender1desc,pmstenant.emailid1,pmstenant.mobileno1,pmstenant.housecontactno1,pmstenant.officecontactno1,pmstenant.employer1,pmstenant.notes,pmstenant.balancedue,pmstenant.lastpaymentdate,pmstenant.status,"","","","","","","","",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(pmstenant => pmstenant.lastname.includes(filter.name))

return response;
})
);
}



}

