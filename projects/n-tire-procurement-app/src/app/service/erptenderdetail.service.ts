import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erptenderdetail } from '../model/erptenderdetail.model';
import { environment } from '../../environments/environment';
import { IerptenderdetailResponse } from '../model/erptenderdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erptenderdetailService {
  formData: erptenderdetail;
  readonly rootURL = AppConstants.baseURL;
  list: erptenderdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerptenderdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptenderdetail', body);
  }
  }

  saveOrUpdateerptenderdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptenderdetail', body);
  }
  }

  geterptenderdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderdetail').toPromise();
  }
  }
  getListBytenderdetailid(tenderdetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderdetail'+'/tenderdetailid/'+tenderdetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderdetail'+'/param/'+key).toPromise();
  }
  }


  geterptenderdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderdetail'+'/e/'+id).toPromise();
  }
  }
  geterptenderdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderdetail'+'/'+id).toPromise();
  }
  }

  deleteerptenderdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erptenderdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erptenderdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IerptenderdetailResponse> {
return this.http.get<IerptenderdetailResponse>(AppConstants.ntireprocurementURL+'/erptenderdetail')
.pipe(
tap((response: IerptenderdetailResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(erptenderdetail => new erptenderdetail(erptenderdetail.tenderdetailid,erptenderdetail.tenderid,erptenderdetail.tenderiddesc,erptenderdetail.itemid,erptenderdetail.itemiddesc,erptenderdetail.description,erptenderdetail.details,erptenderdetail.quantity,erptenderdetail.uom,erptenderdetail.uomdesc,erptenderdetail.currency,erptenderdetail.currencydesc,erptenderdetail.estimatedvalue,erptenderdetail.finalsupplierid,erptenderdetail.finalsupplieriddesc,erptenderdetail.finalquantity,erptenderdetail.finalunitprice,erptenderdetail.finalcost,erptenderdetail.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(erptenderdetail => erptenderdetail.description.includes(filter.name))

return response;
})
);
}



}

