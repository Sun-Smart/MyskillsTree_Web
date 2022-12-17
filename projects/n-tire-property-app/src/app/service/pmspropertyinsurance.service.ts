import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmspropertyinsurance } from '../model/pmspropertyinsurance.model';
import { environment } from '../../environments/environment';
import { IpmspropertyinsuranceResponse } from '../model/pmspropertyinsurance.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmspropertyinsuranceService {
  formData: pmspropertyinsurance;
  readonly rootURL = AppConstants.baseURL;
  list: pmspropertyinsurance[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmspropertyinsurances():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmspropertyinsurance', body);
  }
  }

  saveOrUpdatepmspropertyinsurancesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmspropertyinsurance', body);
  }
  }

  getpmspropertyinsurancesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyinsurance').toPromise();
  }
  }
  getListByinsuranceid(insuranceid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyinsurance'+'/insuranceid/'+insuranceid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyinsurance'+'/param/'+key).toPromise();
  }
  }


  getpmspropertyinsurancesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyinsurance'+'/e/'+id).toPromise();
  }
  }
  getpmspropertyinsurancesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyinsurance'+'/'+id).toPromise();
  }
  }

  deletepmspropertyinsurance(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmspropertyinsurance'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmspropertyinsurance')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IpmspropertyinsuranceResponse> {
return this.http.get<IpmspropertyinsuranceResponse>(AppConstants.ntirepropertyURL+'/pmspropertyinsurance')
.pipe(
tap((response: IpmspropertyinsuranceResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(pmspropertyinsurance => new pmspropertyinsurance(pmspropertyinsurance.insuranceid,pmspropertyinsurance.propertyid,pmspropertyinsurance.propertyiddesc,pmspropertyinsurance.unitid,pmspropertyinsurance.unitiddesc,pmspropertyinsurance.tenantid,pmspropertyinsurance.tenantiddesc,pmspropertyinsurance.insurancecompany,pmspropertyinsurance.policyid,pmspropertyinsurance.referenceno,pmspropertyinsurance.startdate,pmspropertyinsurance.expireddate,pmspropertyinsurance.coverageamount,pmspropertyinsurance.remarks,pmspropertyinsurance.paymentreference,pmspropertyinsurance.attachment,pmspropertyinsurance.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(pmspropertyinsurance => pmspropertyinsurance.insurancecompany.includes(filter.name))

return response;
})
);
}



}

