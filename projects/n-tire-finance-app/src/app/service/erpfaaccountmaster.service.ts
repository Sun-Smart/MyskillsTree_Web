import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpfaaccountmaster } from '../model/erpfaaccountmaster.model';
import { environment } from '../../environments/environment';
import { IerpfaaccountmasterResponse } from '../model/erpfaaccountmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpfaaccountmasterService {
  formData: erpfaaccountmaster;
  readonly rootURL = AppConstants.baseURL;
  list: erpfaaccountmaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpfaaccountmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfaaccountmaster', body);
  }
  }

  saveOrUpdateerpfaaccountmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfaaccountmaster', body);
  }
  }

  geterpfaaccountmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountmaster').toPromise();
  }
  }
  getListByaccountid(accountid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountmaster'+'/accountid/'+accountid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountmaster'+'/param/'+key).toPromise();
  }
  }


  geterpfaaccountmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountmaster'+'/e/'+id).toPromise();
  }
  }
  geterpfaaccountmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountmaster'+'/'+id).toPromise();
  }
  }

  deleteerpfaaccountmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirefinanceURL + '/erpfaaccountmaster'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IerpfaaccountmasterResponse> {
return this.http.get<IerpfaaccountmasterResponse>(AppConstants.ntirefinanceURL+'/erpfaaccountmaster')
.pipe(
tap((response: IerpfaaccountmasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(erpfaaccountmaster => new erpfaaccountmaster(erpfaaccountmaster.accountid,erpfaaccountmaster.accountcode,erpfaaccountmaster.accountname,erpfaaccountmaster.parentaccount,erpfaaccountmaster.accounttype,erpfaaccountmaster.accounttypedesc,erpfaaccountmaster.transactionlimit,erpfaaccountmaster.remarks,erpfaaccountmaster.bankaccount,erpfaaccountmaster.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(erpfaaccountmaster => erpfaaccountmaster.accountname.includes(filter.name))

return response;
})
);
}



}

