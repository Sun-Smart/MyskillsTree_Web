import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crmcustomermaster } from '../model/crmcustomermaster.model';
import { crmcustomeraccountmaster } from '../model/crmcustomeraccountmaster.model';
import { ltycustomerreward } from '../../../../n-tire-loyalty-app/src/app/model/ltycustomerreward.model';
import { ecmcustomerbasket } from '../../../../n-tire-commerce-app/src/app/model/ecmcustomerbasket.model';
import { boauditevents } from '../../../../n-tire-bo-app/src/app/model/boauditevents.model';
import { crmcustomerkycmaster } from '../model/crmcustomerkycmaster.model';
import { ecmreview } from '../../../../n-tire-commerce-app/src/app/model/ecmreview.model';
import { environment } from '../../environments/environment';
import { IcrmcustomermasterResponse } from '../model/crmcustomermaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class crmcustomermasterService {
  formData: crmcustomermaster;
  readonly rootURL = AppConstants.baseURL;
  list: crmcustomermaster[];
  crmcustomeraccountmasters: crmcustomeraccountmaster[]=[];
  ltycustomerrewards: ltycustomerreward[]=[];
  ecmcustomerbaskets: ecmcustomerbasket[]=[];
  boauditevents: boauditevents[]=[];
  crmcustomerkycmasters: crmcustomerkycmaster[]=[];
  ecmreviews: ecmreview[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecrmcustomermasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      crmcustomeraccountmasters: this.crmcustomeraccountmasters.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      ltycustomerrewards: this.ltycustomerrewards.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      ecmcustomerbaskets: this.ecmcustomerbaskets.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      boauditevents: this.boauditevents.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      crmcustomerkycmasters: this.crmcustomerkycmasters.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      ecmreviews: this.ecmreviews.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecrmURL + '/crmcustomermaster', body);
  }
  }

  saveOrUpdatecrmcustomermastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/crmcustomermaster', body);
  }
  }

  getcrmcustomermastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomermaster').toPromise();
  }
  }
  getListBycustomerid(customerid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomermaster'+'/customerid/'+customerid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomermaster'+'/param/'+key).toPromise();
  }
  }


  getcrmcustomermastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomermaster'+'/e/'+id).toPromise();
  }
  }
  getcrmcustomermastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomermaster'+'/'+id).toPromise();
  }
  }

  deletecrmcustomermaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/crmcustomermaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.crmcustomeraccountmasters = [];
this.ltycustomerrewards = [];
this.ecmcustomerbaskets = [];
this.boauditevents = [];
this.crmcustomerkycmasters = [];
this.ecmreviews = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/crmcustomermaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IcrmcustomermasterResponse> {
return this.http.get<IcrmcustomermasterResponse>(AppConstants.ntirecrmURL+'/crmcustomermaster')
.pipe(
tap((response: IcrmcustomermasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(crmcustomermaster => new crmcustomermaster(crmcustomermaster.customerid,crmcustomermaster.basebranchid,crmcustomermaster.basebranchiddesc,crmcustomermaster.customertype,crmcustomermaster.customertypedesc,crmcustomermaster.customergroup,crmcustomermaster.customergroupdesc,crmcustomermaster.categoryid,crmcustomermaster.categoryiddesc,crmcustomermaster.subcategoryid,crmcustomermaster.subcategoryiddesc,crmcustomermaster.territory,crmcustomermaster.territorydesc,crmcustomermaster.customercode,crmcustomermaster.companyname,crmcustomermaster.companytype,crmcustomermaster.companytypedesc,crmcustomermaster.incorporationdate,crmcustomermaster.businesssegment,crmcustomermaster.businesssegmentdesc,crmcustomermaster.companylogo,crmcustomermaster.thumbnail,crmcustomermaster.website,crmcustomermaster.mobilenumber,crmcustomermaster.officephone,crmcustomermaster.email,crmcustomermaster.metatags,crmcustomermaster.firstname,crmcustomermaster.lastname,crmcustomermaster.gender,crmcustomermaster.genderdesc,crmcustomermaster.dob,crmcustomermaster.emailid,crmcustomermaster.residencephone,crmcustomermaster.relationshipmanager,crmcustomermaster.relationshipmanagerdesc,crmcustomermaster.address,crmcustomermaster.shippingaddress,crmcustomermaster.billingcurrency,crmcustomermaster.billingcurrencydesc,crmcustomermaster.openingbalance,crmcustomermaster.asondate,crmcustomermaster.creditdays,crmcustomermaster.creditlimit,crmcustomermaster.accountstartfrom,crmcustomermaster.servicelevel,crmcustomermaster.slastartdate,crmcustomermaster.slaenddate,crmcustomermaster.gstregistrationtype,crmcustomermaster.gstregistrationtypedesc,crmcustomermaster.gstinnumber,crmcustomermaster.pannumber,crmcustomermaster.trnnumber,crmcustomermaster.tan,crmcustomermaster.cst,crmcustomermaster.salestax,crmcustomermaster.servicetax,crmcustomermaster.tin,crmcustomermaster.localtax,crmcustomermaster.itfilings,crmcustomermaster.lifetimevalue,crmcustomermaster.averageordervalue,crmcustomermaster.totalorders,crmcustomermaster.totalordervalue,crmcustomermaster.lastorderdate,crmcustomermaster.lastordervalue,crmcustomermaster.loyaltynumber,crmcustomermaster.pointsearned,crmcustomermaster.activepoints,crmcustomermaster.usedpoints,crmcustomermaster.expiredpoints,crmcustomermaster.lockedpoints,crmcustomermaster.blockedpoints,crmcustomermaster.pointsearnedincurrency,crmcustomermaster.activepointsincurrency,crmcustomermaster.usedpointsincurrency,crmcustomermaster.expiredpointsincurrency,crmcustomermaster.lockedpointsincurrency,crmcustomermaster.blockedpointsincurrency,crmcustomermaster.allocationmethod,crmcustomermaster.allocationmethoddesc,crmcustomermaster.customfield,crmcustomermaster.attachment,crmcustomermaster.cifnumber,crmcustomermaster.outstandingamt,crmcustomermaster.status,"","","","","",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(crmcustomermaster => crmcustomermaster.lastname.includes(filter.name))

return response;
})
);
}



}

