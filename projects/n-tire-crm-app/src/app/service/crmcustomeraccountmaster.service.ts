import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crmcustomeraccountmaster } from '../model/crmcustomeraccountmaster.model';
import { crmcustomeraccounttransaction } from '../model/crmcustomeraccounttransaction.model';
import { environment } from '../../environments/environment';
import { IcrmcustomeraccountmasterResponse } from '../model/crmcustomeraccountmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class crmcustomeraccountmasterService {
  formData: crmcustomeraccountmaster;
  readonly rootURL = AppConstants.baseURL;
  list: crmcustomeraccountmaster[];
  crmcustomeraccounttransactions: crmcustomeraccounttransaction[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecrmcustomeraccountmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      crmcustomeraccounttransactions: this.crmcustomeraccounttransactions.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecrmURL + '/crmcustomeraccountmaster', body);
  }
  }

  saveOrUpdatecrmcustomeraccountmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/crmcustomeraccountmaster', body);
  }
  }

  getcrmcustomeraccountmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomeraccountmaster').toPromise();
  }
  }
  getListByaccountid(accountid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomeraccountmaster'+'/accountid/'+accountid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomeraccountmaster'+'/param/'+key).toPromise();
  }
  }


  getcrmcustomeraccountmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomeraccountmaster'+'/e/'+id).toPromise();
  }
  }
  getcrmcustomeraccountmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomeraccountmaster'+'/'+id).toPromise();
  }
  }

  deletecrmcustomeraccountmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/crmcustomeraccountmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.crmcustomeraccounttransactions = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/crmcustomeraccountmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IcrmcustomeraccountmasterResponse> {
return this.http.get<IcrmcustomeraccountmasterResponse>(AppConstants.ntirecrmURL+'/crmcustomeraccountmaster')
.pipe(
tap((response: IcrmcustomeraccountmasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(crmcustomeraccountmaster => new crmcustomeraccountmaster(crmcustomeraccountmaster.accountid,crmcustomeraccountmaster.customerid,crmcustomeraccountmaster.customeriddesc,crmcustomeraccountmaster.cifnumber,crmcustomeraccountmaster.accountnumber,crmcustomeraccountmaster.productid,crmcustomeraccountmaster.productiddesc,crmcustomeraccountmaster.accountopendate,crmcustomeraccountmaster.holdingtype,crmcustomeraccountmaster.holdingtypedesc,crmcustomeraccountmaster.customerholding,crmcustomeraccountmaster.customerholdingdesc,crmcustomeraccountmaster.customfield,crmcustomeraccountmaster.attachment,crmcustomeraccountmaster.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(crmcustomeraccountmaster => crmcustomeraccountmaster.accountnumber.includes(filter.name))

return response;
})
);
}



}

