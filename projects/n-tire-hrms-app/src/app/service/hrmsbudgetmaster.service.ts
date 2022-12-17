import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsbudgetmaster } from '../model/hrmsbudgetmaster.model';
import { hrmsbudgetdetail } from '../model/hrmsbudgetdetail.model';
import { environment } from '../../environments/environment';
import { IhrmsbudgetmasterResponse } from '../model/hrmsbudgetmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsbudgetmasterService {
  formData: hrmsbudgetmaster;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsbudgetmaster[];
  hrmsbudgetdetails: hrmsbudgetdetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsbudgetmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hrmsbudgetdetails: this.hrmsbudgetdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsbudgetmaster', body);
  }
  }

  saveOrUpdatehrmsbudgetmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsbudgetmaster', body);
  }
  }

  gethrmsbudgetmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsbudgetmaster').toPromise();
  }
  }
  getListBybudgetid(budgetid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsbudgetmaster'+'/budgetid/'+budgetid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsbudgetmaster'+'/param/'+key).toPromise();
  }
  }


  gethrmsbudgetmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsbudgetmaster'+'/e/'+id).toPromise();
  }
  }
  gethrmsbudgetmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsbudgetmaster'+'/'+id).toPromise();
  }
  }

  deletehrmsbudgetmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsbudgetmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.hrmsbudgetdetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsbudgetmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IhrmsbudgetmasterResponse> {
return this.http.get<IhrmsbudgetmasterResponse>(AppConstants.ntirehrmsURL+'/hrmsbudgetmaster')
.pipe(
tap((response: IhrmsbudgetmasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(hrmsbudgetmaster => new hrmsbudgetmaster(hrmsbudgetmaster.budgetid,hrmsbudgetmaster.branchid,hrmsbudgetmaster.branchiddesc,hrmsbudgetmaster.finyear,hrmsbudgetmaster.finyeardesc,hrmsbudgetmaster.revisionno,hrmsbudgetmaster.budgetcode,hrmsbudgetmaster.budgetcreatedon,hrmsbudgetmaster.department,hrmsbudgetmaster.departmentdesc,hrmsbudgetmaster.remarks,hrmsbudgetmaster.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(hrmsbudgetmaster => hrmsbudgetmaster.budgetcode.includes(filter.name))

return response;
})
);
}



}

