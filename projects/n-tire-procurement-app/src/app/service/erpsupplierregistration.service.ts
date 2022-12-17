import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsupplierregistration } from '../model/erpsupplierregistration.model';
import { erpregisteredsupplierproductcategory } from '../model/erpregisteredsupplierproductcategory.model';
import { environment } from '../../environments/environment';
import { IerpsupplierregistrationResponse } from '../model/erpsupplierregistration.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsupplierregistrationService {
  formData: erpsupplierregistration;
  readonly rootURL = AppConstants.baseURL;
  list: erpsupplierregistration[];
  erpregisteredsupplierproductcategories: erpregisteredsupplierproductcategory[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsupplierregistrations():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpregisteredsupplierproductcategories: this.erpregisteredsupplierproductcategories.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierregistration', body);
  }
  }

  saveOrUpdateerpsupplierregistrationsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierregistration', body);
  }
  }

  geterpsupplierregistrationsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierregistration').toPromise();
  }
  }
  getListByregistrationid(registrationid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierregistration'+'/registrationid/'+registrationid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierregistration'+'/param/'+key).toPromise();
  }
  }


  geterpsupplierregistrationsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierregistration'+'/e/'+id).toPromise();
  }
  }
  geterpsupplierregistrationsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierregistration'+'/'+id).toPromise();
  }
  }

  deleteerpsupplierregistration(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsupplierregistration'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpregisteredsupplierproductcategories = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierregistration')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IerpsupplierregistrationResponse> {
return this.http.get<IerpsupplierregistrationResponse>(AppConstants.ntireprocurementURL+'/erpsupplierregistration')
.pipe(
tap((response: IerpsupplierregistrationResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(erpsupplierregistration => new erpsupplierregistration(erpsupplierregistration.registrationid,erpsupplierregistration.name,erpsupplierregistration.registrationdate,erpsupplierregistration.licensed,erpsupplierregistration.licensenumber,erpsupplierregistration.licensefile,erpsupplierregistration.taxregistrationnumber,erpsupplierregistration.taxfile,erpsupplierregistration.companydetails,erpsupplierregistration.contactperson,erpsupplierregistration.designation,erpsupplierregistration.cpmobile,erpsupplierregistration.cpemail,erpsupplierregistration.establishmentyear,erpsupplierregistration.email,erpsupplierregistration.password,erpsupplierregistration.suppliertype,erpsupplierregistration.suppliertypedesc,erpsupplierregistration.language,erpsupplierregistration.languagedesc,erpsupplierregistration.address1,erpsupplierregistration.address2,erpsupplierregistration.countryid,erpsupplierregistration.countryiddesc,erpsupplierregistration.stateid,erpsupplierregistration.stateiddesc,erpsupplierregistration.cityid,erpsupplierregistration.cityiddesc,erpsupplierregistration.pin,erpsupplierregistration.directline,erpsupplierregistration.extension,erpsupplierregistration.website,erpsupplierregistration.telephone,erpsupplierregistration.products,erpsupplierregistration.services,erpsupplierregistration.servicelocations,erpsupplierregistration.insured,erpsupplierregistration.bonded,erpsupplierregistration.remarks,erpsupplierregistration.customfield,erpsupplierregistration.attachment,erpsupplierregistration.creditcardtype,erpsupplierregistration.creditcardtypedesc,erpsupplierregistration.creditcardnumber,erpsupplierregistration.expirymonth,erpsupplierregistration.expirymonthdesc,erpsupplierregistration.expiryyear,erpsupplierregistration.expiryyeardesc,erpsupplierregistration.cvv,erpsupplierregistration.registrationamount,erpsupplierregistration.status,erpsupplierregistration.statusdesc,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(erpsupplierregistration => erpsupplierregistration.name.includes(filter.name))

return response;
})
);
}



}

