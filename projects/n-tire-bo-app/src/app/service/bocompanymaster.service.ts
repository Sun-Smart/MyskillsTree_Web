import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bocompanymaster } from '../model/bocompanymaster.model';
import { bocompanyholiday } from '../model/bocompanyholiday.model';
import { bofinancialyear } from '../model/bofinancialyear.model';
import { environment } from '../../environments/environment';
import { IbocompanymasterResponse } from '../model/bocompanymaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bocompanymasterService {
  formData: bocompanymaster;
  readonly rootURL = AppConstants.baseURL;
  list: bocompanymaster[];
  bocompanyholidays: bocompanyholiday[]=[];
  bofinancialyears: bofinancialyear[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebocompanymasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bocompanyholidays: this.bocompanyholidays.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      bofinancialyears: this.bofinancialyears.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/bocompanymaster', body);
  }
  }

  saveOrUpdatebocompanymastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bocompanymaster', body);
  }
  }

  getbocompanymastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocompanymaster').toPromise();
  }
  }
  getListBycompanyid(companyid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocompanymaster'+'/companyid/'+companyid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocompanymaster'+'/param/'+key).toPromise();
  }
  }


  getbocompanymastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocompanymaster'+'/e/'+id).toPromise();
  }
  }
  getbocompanymastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocompanymaster'+'/'+id).toPromise();
  }
  }

  deletebocompanymaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bocompanymaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.bocompanyholidays = [];
this.bofinancialyears = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bocompanymaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbocompanymasterResponse> {
return this.http.get<IbocompanymasterResponse>(AppConstants.ntireboURL+'/bocompanymaster')
.pipe(
tap((response: IbocompanymasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bocompanymaster => new bocompanymaster(bocompanymaster.companyid,bocompanymaster.code,bocompanymaster.companyname,bocompanymaster.registrationnumber,bocompanymaster.companytype,bocompanymaster.companytypedesc,bocompanymaster.companylogo,bocompanymaster.letterhead,bocompanymaster.incorporationdate,bocompanymaster.businesssegment,bocompanymaster.businesssegmentdesc,bocompanymaster.details,bocompanymaster.services,bocompanymaster.brandname,bocompanymaster.mailingemailaddress,bocompanymaster.mailingsendername,bocompanymaster.localization,bocompanymaster.localizationdesc,bocompanymaster.timezone,bocompanymaster.timezonedesc,bocompanymaster.pointvalue,bocompanymaster.financialstrength,bocompanymaster.reputation,bocompanymaster.socialresponsibility,bocompanymaster.environmentalpolicy,bocompanymaster.website,bocompanymaster.phone,bocompanymaster.email,bocompanymaster.address1,bocompanymaster.address2,bocompanymaster.countryid,bocompanymaster.countryiddesc,bocompanymaster.stateid,bocompanymaster.stateiddesc,bocompanymaster.cityid,bocompanymaster.cityiddesc,bocompanymaster.locationid,bocompanymaster.locationiddesc,bocompanymaster.pincode,bocompanymaster.startdate,bocompanymaster.enddate,bocompanymaster.bankid,bocompanymaster.chartofaccounts,bocompanymaster.shippingaddress1,bocompanymaster.shippingaddress2,bocompanymaster.shippingcountryid,bocompanymaster.shippingcountryiddesc,bocompanymaster.shippingstateid,bocompanymaster.shippingstateiddesc,bocompanymaster.shippingcityid,bocompanymaster.shippingcityiddesc,bocompanymaster.shippingpincode,bocompanymaster.contactname,bocompanymaster.designation,bocompanymaster.designationdesc,bocompanymaster.cpphone,bocompanymaster.cpemail,bocompanymaster.basecurrency,bocompanymaster.basecurrencydesc,bocompanymaster.gstregistrationtype,bocompanymaster.gstregistrationtypedesc,bocompanymaster.gstinnumber,bocompanymaster.pannumber,bocompanymaster.trnnumber,bocompanymaster.tan,bocompanymaster.cst,bocompanymaster.salestax,bocompanymaster.servicetax,bocompanymaster.tin,bocompanymaster.localtax,bocompanymaster.accountstartdate,bocompanymaster.numberofusers,bocompanymaster.starttime,bocompanymaster.endtime,bocompanymaster.weekoff1,bocompanymaster.weekoff1desc,bocompanymaster.weekoff2,bocompanymaster.weekoff2desc,bocompanymaster.facebookaccountname,bocompanymaster.facebookaccounturl,bocompanymaster.twitteraccountname,bocompanymaster.twitteraccounturl,bocompanymaster.linkedinaccountname,bocompanymaster.linkedinaccounturl,bocompanymaster.instagramaccountname,bocompanymaster.instagramaccounturl,bocompanymaster.customfield,bocompanymaster.attachment,bocompanymaster.erp,bocompanymaster.cams,bocompanymaster.crm,bocompanymaster.procurement,bocompanymaster.legal,bocompanymaster.hrms,bocompanymaster.status,"",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bocompanymaster => bocompanymaster.companyname.includes(filter.name))

return response;
})
);
}



}

