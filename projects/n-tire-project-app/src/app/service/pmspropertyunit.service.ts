import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmspropertyunit } from '../model/pmspropertyunit.model';
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

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmspropertyunits():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprojectURL + '/pmspropertyunit', body);
  }
  }

  saveOrUpdatepmspropertyunitsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprojectURL + '/pmspropertyunit', body);
  }
  }

  getpmspropertyunitsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/pmspropertyunit').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/pmspropertyunit'+'/param/'+key).toPromise();
  }
  }


  getpmspropertyunitsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/pmspropertyunit'+'/e/'+id).toPromise();
  }
  }
  getpmspropertyunitsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/pmspropertyunit'+'/'+id).toPromise();
  }
  }

  deletepmspropertyunit(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprojectURL + '/pmspropertyunit'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprojectURL + '/pmspropertyunit')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IpmspropertyunitResponse> {
return this.http.get<IpmspropertyunitResponse>(AppConstants.ntireprojectURL+'/pmspropertyunit')
.pipe(
tap((response: IpmspropertyunitResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(pmspropertyunit => new pmspropertyunit(pmspropertyunit.unitid,pmspropertyunit.propertyid,pmspropertyunit.unitno,pmspropertyunit.details,pmspropertyunit.unittype,pmspropertyunit.unittypedesc,pmspropertyunit.address1,pmspropertyunit.address2,pmspropertyunit.sqft,pmspropertyunit.sizedetails,pmspropertyunit.beds,pmspropertyunit.bedsdesc,pmspropertyunit.baths,pmspropertyunit.bathsdesc,pmspropertyunit.term,pmspropertyunit.rent,pmspropertyunit.deposit,pmspropertyunit.notes,pmspropertyunit.assignowner,pmspropertyunit.ownernotes,pmspropertyunit.advance,pmspropertyunit.invoiceday,pmspropertyunit.hasfirstrentcommission,pmspropertyunit.firstrentcommissiontype,pmspropertyunit.firstrentcommissiontypedesc,pmspropertyunit.firstrentcommission,pmspropertyunit.hasrentcommission,pmspropertyunit.rentcommissiontype,pmspropertyunit.rentcommissiontypedesc,pmspropertyunit.rentcommission,pmspropertyunit.hasrenewalfee,pmspropertyunit.renewalfeetype,pmspropertyunit.renewalfeetypedesc,pmspropertyunit.renewalfee,pmspropertyunit.hasservicefee,pmspropertyunit.servicefeetype,pmspropertyunit.servicefeetypedesc,pmspropertyunit.servicefee,pmspropertyunit.customfield,pmspropertyunit.attachment,pmspropertyunit.unitstatus,pmspropertyunit.lasttenantid,pmspropertyunit.vacateddate,pmspropertyunit.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(pmspropertyunit => pmspropertyunit.unitno.includes(filter.name))

return response;
})
);
}



}

