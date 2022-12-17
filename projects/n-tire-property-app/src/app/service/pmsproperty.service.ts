import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmsproperty } from '../model/pmsproperty.model';
import { pmsdeposit } from '../model/pmsdeposit.model';
import { pmspdc } from '../model/pmspdc.model';
import { pmslease } from '../model/pmslease.model';
import { pmsworkorder } from '../model/pmsworkorder.model';
import { pmspropertyapplicants } from '../model/pmspropertyapplicants.model';
import { pmsschedule } from '../model/pmsschedule.model';
import { pmstransaction } from '../model/pmstransaction.model';
import { pmstransactionschedule } from '../model/pmstransactionschedule.model';
import { pmspropertyasset } from '../model/pmspropertyasset.model';
import { pmspropertyimage } from '../model/pmspropertyimage.model';
import { pmspropertyopexdetail } from '../model/pmspropertyopexdetail.model';
import { pmspropertycontact } from '../model/pmspropertycontact.model';
import { pmspropertydocument } from '../model/pmspropertydocument.model';
import { pmsunitcharges } from '../model/pmsunitcharges.model';
import { pmspropertyunit } from '../model/pmspropertyunit.model';
import { pmscharge } from '../model/pmscharge.model';
import { pmspropertyinsurance } from '../model/pmspropertyinsurance.model';
import { environment } from '../../environments/environment';
import { IpmspropertyResponse } from '../model/pmsproperty.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmspropertyService {
  formData: pmsproperty;
  readonly rootURL = AppConstants.baseURL;
  list: pmsproperty[];
  pmsdeposits: pmsdeposit[]=[];
  pmspdcs: pmspdc[]=[];
  pmsleases: pmslease[]=[];
  pmsworkorders: pmsworkorder[]=[];
  pmspropertyapplicants: pmspropertyapplicants[]=[];
  pmsschedules: pmsschedule[]=[];
  pmstransactions: pmstransaction[]=[];
  pmstransactionschedules: pmstransactionschedule[]=[];
  pmspropertyassets: pmspropertyasset[]=[];
  pmspropertyimages: pmspropertyimage[]=[];
  pmspropertyopexdetails: pmspropertyopexdetail[]=[];
  pmspropertycontacts: pmspropertycontact[]=[];
  pmspropertydocuments: pmspropertydocument[]=[];
  pmsunitcharges: pmsunitcharges[]=[];
  pmspropertyunits: pmspropertyunit[]=[];
  pmscharges: pmscharge[]=[];
  pmspropertyinsurances: pmspropertyinsurance[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmsproperties():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      pmsdeposits: this.pmsdeposits.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmspdcs: this.pmspdcs.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmsleases: this.pmsleases.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmsworkorders: this.pmsworkorders.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmspropertyapplicants: this.pmspropertyapplicants.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmsschedules: this.pmsschedules.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmstransactions: this.pmstransactions.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmstransactionschedules: this.pmstransactionschedules.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmspropertyassets: this.pmspropertyassets.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmspropertyimages: this.pmspropertyimages.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmspropertyopexdetails: this.pmspropertyopexdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmspropertycontacts: this.pmspropertycontacts.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmspropertydocuments: this.pmspropertydocuments.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmsunitcharges: this.pmsunitcharges.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmspropertyunits: this.pmspropertyunits.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmscharges: this.pmscharges.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmspropertyinsurances: this.pmspropertyinsurances.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmsproperty', body);
  }
  }

  saveOrUpdatepmspropertiesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmsproperty', body);
  }
  }

  getpmspropertiesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsproperty').toPromise();
  }
  }
  getListBypropertyid(propertyid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsproperty'+'/propertyid/'+propertyid).toPromise();
  }
  }

  getListBypropertytype(propertytype:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsproperty'+'/propertytype/'+propertytype).toPromise();
  }
  }

  getListByrenewalfeetype(renewalfeetype:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsproperty'+'/renewalfeetype/'+renewalfeetype).toPromise();
  }
  }

  getListBystatus(status:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsproperty'+'/status/'+status).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsproperty'+'/param/'+key).toPromise();
  }
  }


  getpmspropertiesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsproperty'+'/e/'+id).toPromise();
  }
  }
  getpmspropertiesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsproperty'+'/'+id).toPromise();
  }
  }

  deletepmsproperty(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmsproperty'+'/'+id).toPromise();
  }
  }
clearList(){
this.pmsdeposits = [];
this.pmspdcs = [];
this.pmsleases = [];
this.pmsworkorders = [];
this.pmspropertyapplicants = [];
this.pmsschedules = [];
this.pmstransactions = [];
this.pmstransactionschedules = [];
this.pmspropertyassets = [];
this.pmspropertyimages = [];
this.pmspropertyopexdetails = [];
this.pmspropertycontacts = [];
this.pmspropertydocuments = [];
this.pmsunitcharges = [];
this.pmspropertyunits = [];
this.pmscharges = [];
this.pmspropertyinsurances = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmsproperty')
.toPromise()
.then(res => this.list = res as any[]);
}
}
  getpmspropertiesListbystatus(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsproperty/'+dt+'').toPromise();
  }
  }

  getpmspropertiesListbypropertytype(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsproperty/'+dt+'').toPromise();
  }
  }

  getpmspropertiesListbyrenewalfeetype(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsproperty/'+dt+'').toPromise();
  }
  }

  getpmspropertiesListbymonthwise(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsproperty/'+dt+'').toPromise();
  }
  }

search(filter: {name: string} = {name: ''}, page = 1): Observable<IpmspropertyResponse> {
return this.http.get<IpmspropertyResponse>(AppConstants.ntirepropertyURL+'/pmsproperty')
.pipe(
tap((response: IpmspropertyResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(pmsproperty => new pmsproperty(pmsproperty.propertyid,pmsproperty.propertyiddesc,pmsproperty.propertycode,pmsproperty.title,pmsproperty.details,pmsproperty.propertytype,pmsproperty.propertytypedesc,pmsproperty.thumbnail,pmsproperty.datecreated,pmsproperty.rating,pmsproperty.metatag,pmsproperty.address1,pmsproperty.address2,pmsproperty.countryid,pmsproperty.countryiddesc,pmsproperty.stateid,pmsproperty.stateiddesc,pmsproperty.cityid,pmsproperty.cityiddesc,pmsproperty.pincode,pmsproperty.ownerid,pmsproperty.owneriddesc,pmsproperty.bankaccountid,pmsproperty.bankaccountiddesc,pmsproperty.currency,pmsproperty.currencydesc,pmsproperty.reserveamount,pmsproperty.responsibleid,pmsproperty.responsibleiddesc,pmsproperty.yearbuilt,pmsproperty.propertylife,pmsproperty.latitude,pmsproperty.longitude,pmsproperty.contactperson,pmsproperty.phone1,pmsproperty.phone2,pmsproperty.email,pmsproperty.website,pmsproperty.unitno,pmsproperty.unittype,pmsproperty.unittypedesc,pmsproperty.sqft,pmsproperty.sizedetails,pmsproperty.rooms,pmsproperty.roomsdesc,pmsproperty.beds,pmsproperty.bedsdesc,pmsproperty.baths,pmsproperty.bathsdesc,pmsproperty.rent,pmsproperty.notes,pmsproperty.assignowner,pmsproperty.ownership,pmsproperty.ownershipdesc,pmsproperty.ownernotes,pmsproperty.occupancytype,pmsproperty.occupancytypedesc,pmsproperty.deposit,pmsproperty.advance,pmsproperty.invoiceday,pmsproperty.hasfirstrentcommission,pmsproperty.firstrentcommissiontype,pmsproperty.firstrentcommissiontypedesc,pmsproperty.firstrentcommission,pmsproperty.hasrentcommission,pmsproperty.rentcommissiontype,pmsproperty.rentcommissiontypedesc,pmsproperty.rentcommission,pmsproperty.hasrenewalfee,pmsproperty.renewalfeetype,pmsproperty.renewalfeetypedesc,pmsproperty.renewalfee,pmsproperty.hasservicefee,pmsproperty.servicefeetype,pmsproperty.servicefeetypedesc,pmsproperty.servicefee,pmsproperty.facebook,pmsproperty.googleplus,pmsproperty.twitter,pmsproperty.instagram,pmsproperty.pinterest,pmsproperty.linkedin,pmsproperty.status,pmsproperty.customfield,pmsproperty.attachment,"","","","","","","","","","","","","","","","",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(pmsproperty => pmsproperty.title.includes(filter.name))

return response;
})
);
}



}

