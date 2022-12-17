import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erplocationmaster } from '../model/erplocationmaster.model';
import { erpbinlocationmaster } from '../model/erpbinlocationmaster.model';
import { environment } from '../../environments/environment';
import { IerplocationmasterResponse } from '../model/erplocationmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erplocationmasterService {
  formData: erplocationmaster;
  readonly rootURL = AppConstants.baseURL;
  list: erplocationmaster[];
  erpbinlocationmasters: erpbinlocationmaster[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerplocationmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpbinlocationmasters: this.erpbinlocationmasters.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erplocationmaster', body);
  }
  }

  saveOrUpdateerplocationmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erplocationmaster', body);
  }
  }

  geterplocationmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erplocationmaster').toPromise();
  }
  }
  getListBylocationid(locationid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erplocationmaster'+'/locationid/'+locationid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erplocationmaster'+'/param/'+key).toPromise();
  }
  }


  geterplocationmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erplocationmaster'+'/e/'+id).toPromise();
  }
  }
  geterplocationmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erplocationmaster'+'/'+id).toPromise();
  }
  }

  deleteerplocationmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erplocationmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpbinlocationmasters = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erplocationmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IerplocationmasterResponse> {
return this.http.get<IerplocationmasterResponse>(AppConstants.ntireprocurementURL+'/erplocationmaster')
.pipe(
tap((response: IerplocationmasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(erplocationmaster => new erplocationmaster(erplocationmaster.locationid,erplocationmaster.locationiddesc,erplocationmaster.branchid,erplocationmaster.branchiddesc,erplocationmaster.locationcode,erplocationmaster.locationname,erplocationmaster.locationtype,erplocationmaster.locationtypedesc,erplocationmaster.areasqft,erplocationmaster.contactname,erplocationmaster.designation,erplocationmaster.mobile,erplocationmaster.email,erplocationmaster.address1,erplocationmaster.address2,erplocationmaster.countryid,erplocationmaster.countryiddesc,erplocationmaster.stateid,erplocationmaster.stateiddesc,erplocationmaster.cityid,erplocationmaster.cityiddesc,erplocationmaster.pin,erplocationmaster.latlong,erplocationmaster.restrictcurrency,erplocationmaster.restrictamount,erplocationmaster.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(erplocationmaster => erplocationmaster.locationname.includes(filter.name))

return response;
})
);
}



}

