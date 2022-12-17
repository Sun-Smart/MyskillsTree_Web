import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpfaaccountperiodmaster } from '../model/erpfaaccountperiodmaster.model';
import { environment } from '../../environments/environment';
import { IerpfaaccountperiodmasterResponse } from '../model/erpfaaccountperiodmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpfaaccountperiodmasterService {
  formData: erpfaaccountperiodmaster;
  readonly rootURL = AppConstants.ntirefinanceURL;
  list: erpfaaccountperiodmaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpfaaccountperiodmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfaaccountperiodmaster', body);
  }
  }

  saveOrUpdateerpfaaccountperiodmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfaaccountperiodmaster', body);
  }
  }

  geterpfaaccountperiodmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountperiodmaster').toPromise();
  }
  }
  getListByfinyear(finyear:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountperiodmaster'+'/finyear/'+finyear).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountperiodmaster'+'/param/'+key).toPromise();
  }
  }


  geterpfaaccountperiodmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountperiodmaster'+'/e/'+id).toPromise();
  }
  }
  geterpfaaccountperiodmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountperiodmaster'+'/'+id).toPromise();
  }
  }

  deleteerpfaaccountperiodmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirefinanceURL + '/erpfaaccountperiodmaster'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountperiodmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IerpfaaccountperiodmasterResponse> {
return this.http.get<IerpfaaccountperiodmasterResponse>(AppConstants.ntirefinanceURL+'/erpfaaccountperiodmaster')
.pipe(
tap((response: IerpfaaccountperiodmasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(erpfaaccountperiodmaster => new erpfaaccountperiodmaster(erpfaaccountperiodmaster.periodid,erpfaaccountperiodmaster.finyear,erpfaaccountperiodmaster.finyeardesc,erpfaaccountperiodmaster.periodname,erpfaaccountperiodmaster.startdate,erpfaaccountperiodmaster.enddate,erpfaaccountperiodmaster.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(erpfaaccountperiodmaster => erpfaaccountperiodmaster.periodname.includes(filter.name))

return response;
})
);
}



}

