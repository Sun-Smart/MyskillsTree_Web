import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crmcustomeraccounttransaction } from '../model/crmcustomeraccounttransaction.model';
import { environment } from '../../environments/environment';
import { IcrmcustomeraccounttransactionResponse } from '../model/crmcustomeraccounttransaction.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class crmcustomeraccounttransactionService {
  formData: crmcustomeraccounttransaction;
  readonly rootURL = AppConstants.baseURL;
  list: crmcustomeraccounttransaction[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecrmcustomeraccounttransactions():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/crmcustomeraccounttransaction', body);
  }
  }

  saveOrUpdatecrmcustomeraccounttransactionsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/crmcustomeraccounttransaction', body);
  }
  }

  getcrmcustomeraccounttransactionsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomeraccounttransaction').toPromise();
  }
  }
  getListBytransactionid(transactionid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomeraccounttransaction'+'/transactionid/'+transactionid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomeraccounttransaction'+'/param/'+key).toPromise();
  }
  }


  getcrmcustomeraccounttransactionsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomeraccounttransaction'+'/e/'+id).toPromise();
  }
  }
  getcrmcustomeraccounttransactionsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomeraccounttransaction'+'/'+id).toPromise();
  }
  }

  deletecrmcustomeraccounttransaction(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/crmcustomeraccounttransaction'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/crmcustomeraccounttransaction')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IcrmcustomeraccounttransactionResponse> {
return this.http.get<IcrmcustomeraccounttransactionResponse>(AppConstants.ntirecrmURL+'/crmcustomeraccounttransaction')
.pipe(
tap((response: IcrmcustomeraccounttransactionResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(crmcustomeraccounttransaction => new crmcustomeraccounttransaction(crmcustomeraccounttransaction.transactionid,crmcustomeraccounttransaction.accountid,crmcustomeraccounttransaction.accountiddesc,crmcustomeraccounttransaction.customerid,crmcustomeraccounttransaction.customeriddesc,crmcustomeraccounttransaction.cifnumber,crmcustomeraccounttransaction.accountnumber,crmcustomeraccounttransaction.date,crmcustomeraccounttransaction.description,crmcustomeraccounttransaction.amount,crmcustomeraccounttransaction.transactiontype,crmcustomeraccounttransaction.transactiontypedesc,crmcustomeraccounttransaction.closingbalance,crmcustomeraccounttransaction.customfield,crmcustomeraccounttransaction.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(crmcustomeraccounttransaction => crmcustomeraccounttransaction.description.includes(filter.name))

return response;
})
);
}



}

