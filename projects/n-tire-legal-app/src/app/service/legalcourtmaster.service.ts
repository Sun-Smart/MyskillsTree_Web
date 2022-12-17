import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalcourtmaster } from '../model/legalcourtmaster.model';
import { legalcourtbranchmaster } from '../model/legalcourtbranchmaster.model';
import { environment } from '../../environments/environment';
import { IlegalcourtmasterResponse } from '../model/legalcourtmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalcourtmasterService {
  formData: legalcourtmaster;
  readonly rootURL = AppConstants.baseURL;
  list: legalcourtmaster[];
  legalcourtbranchmasters: legalcourtbranchmaster[]=[];
  Insertlegalcourtbranchmasters: legalcourtbranchmaster[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalcourtmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      legalcourtbranchmasters: this.Insertlegalcourtbranchmasters.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcourtmaster', body);
  }
  }

  saveOrUpdatelegalcourtmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcourtmaster', body);
  }
  }

  getlegalcourtmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcourtmaster').toPromise();
  }
  }
  getListBycourtid(courtid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcourtmaster'+'/courtid/'+courtid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcourtmaster'+'/param/'+key).toPromise();
  }
  }


  getlegalcourtmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcourtmaster'+'/e/'+id).toPromise();
  }
  }
  getlegalcourtmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcourtmaster'+'/'+id).toPromise();
  }
  }

  deletelegalcourtmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalcourtmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.legalcourtbranchmasters = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalcourtmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IlegalcourtmasterResponse> {
return this.http.get<IlegalcourtmasterResponse>(AppConstants.ntirelegalURL+'/legalcourtmaster')
.pipe(
tap((response: IlegalcourtmasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(legalcourtmaster => new legalcourtmaster(legalcourtmaster.courtid,legalcourtmaster.courtcategory,legalcourtmaster.courtcategorydesc,legalcourtmaster.courtname,legalcourtmaster.lawyers,legalcourtmaster.benches,legalcourtmaster.address1,legalcourtmaster.address2,legalcourtmaster.district,legalcourtmaster.districtdesc,legalcourtmaster.countryid,legalcourtmaster.countryiddesc,legalcourtmaster.stateid,legalcourtmaster.stateiddesc,legalcourtmaster.cityid,legalcourtmaster.cityiddesc,legalcourtmaster.pin,legalcourtmaster.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(legalcourtmaster => legalcourtmaster.courtname.includes(filter.name))

return response;
})
);
}



}

