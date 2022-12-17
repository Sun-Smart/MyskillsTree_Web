import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalcustomermaster } from '../model/legalcustomermaster.model';
import { bocontact } from '../../../../n-tire-bo-app/src/app/model/bocontact.model';
import { legalopponentmaster } from '../model/legalopponentmaster.model';
import { environment } from '../../environments/environment';
import { IlegalcustomermasterResponse } from '../model/legalcustomermaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalcustomermasterService {
  formData: legalcustomermaster;
  readonly rootURL = AppConstants.baseURL;
  list: legalcustomermaster[];
  bocontacts: bocontact[]=[];
  legalopponentmasters: legalopponentmaster[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalcustomermasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bocontacts: this.bocontacts.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      legalopponentmasters: this.legalopponentmasters.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcustomermaster', body);
  }
  }

  saveOrUpdatelegalcustomermastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcustomermaster', body);
  }
  }

  getlegalcustomermastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcustomermaster').toPromise();
  }
  }
  getListBycustomerid(customerid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcustomermaster'+'/customerid/'+customerid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcustomermaster'+'/param/'+key).toPromise();
  }
  }


  getlegalcustomermastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcustomermaster'+'/e/'+id).toPromise();
  }
  }
  getlegalcustomermastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcustomermaster'+'/'+id).toPromise();
  }
  }

  deletelegalcustomermaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalcustomermaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.bocontacts = [];
this.legalopponentmasters = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalcustomermaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IlegalcustomermasterResponse> {
return this.http.get<IlegalcustomermasterResponse>(AppConstants.ntirelegalURL+'/legalcustomermaster')
.pipe(
tap((response: IlegalcustomermasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(legalcustomermaster => new legalcustomermaster(legalcustomermaster.branchid,legalcustomermaster.branchiddesc,legalcustomermaster.customerid,legalcustomermaster.customercode,legalcustomermaster.customername,legalcustomermaster.thumbnail,legalcustomermaster.customertypeid,legalcustomermaster.customertypeiddesc,legalcustomermaster.categoryid,legalcustomermaster.categoryiddesc,legalcustomermaster.subcategoryid,legalcustomermaster.subcategoryiddesc,legalcustomermaster.groupname,legalcustomermaster.groupnamedesc,legalcustomermaster.website,legalcustomermaster.phone,legalcustomermaster.mobilenumber,legalcustomermaster.emailid,legalcustomermaster.address,legalcustomermaster.customfield,legalcustomermaster.attachment,legalcustomermaster.status,"",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(legalcustomermaster => legalcustomermaster.customername.includes(filter.name))

return response;
})
);
}



}

