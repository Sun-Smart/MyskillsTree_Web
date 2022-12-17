import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpcontractorderdetail } from '../model/erpcontractorderdetail.model';
import { environment } from '../../environments/environment';
import { IerpcontractorderdetailResponse } from '../model/erpcontractorderdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpcontractorderdetailService {
  formData: erpcontractorderdetail;
  readonly rootURL = AppConstants.baseURL;
  list: erpcontractorderdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpcontractorderdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpcontractorderdetail', body);
  }
  }

  saveOrUpdateerpcontractorderdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpcontractorderdetail', body);
  }
  }

  geterpcontractorderdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderdetail').toPromise();
  }
  }
  getListBycontractdetailid(contractdetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderdetail'+'/contractdetailid/'+contractdetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderdetail'+'/param/'+key).toPromise();
  }
  }


  geterpcontractorderdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderdetail'+'/e/'+id).toPromise();
  }
  }
  geterpcontractorderdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderdetail'+'/'+id).toPromise();
  }
  }

  deleteerpcontractorderdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpcontractorderdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IerpcontractorderdetailResponse> {
return this.http.get<IerpcontractorderdetailResponse>(AppConstants.ntireprocurementURL+'/erpcontractorderdetail')
.pipe(
tap((response: IerpcontractorderdetailResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(erpcontractorderdetail => new erpcontractorderdetail(erpcontractorderdetail.contractid,erpcontractorderdetail.contractiddesc,erpcontractorderdetail.supplierid,erpcontractorderdetail.supplieriddesc,erpcontractorderdetail.versionnumber,erpcontractorderdetail.contractdetailid,erpcontractorderdetail.detailtype,erpcontractorderdetail.detailtypedesc,erpcontractorderdetail.itemid,erpcontractorderdetail.itemiddesc,erpcontractorderdetail.service,erpcontractorderdetail.quantity,erpcontractorderdetail.uom,erpcontractorderdetail.uomdesc,erpcontractorderdetail.currency,erpcontractorderdetail.currencydesc,erpcontractorderdetail.unitprice,erpcontractorderdetail.discountpercent,erpcontractorderdetail.discounttype,erpcontractorderdetail.discounttypedesc,erpcontractorderdetail.saleprice,erpcontractorderdetail.tax1name,erpcontractorderdetail.tax1namedesc,erpcontractorderdetail.tax1value,erpcontractorderdetail.tax2name,erpcontractorderdetail.tax2namedesc,erpcontractorderdetail.tax2value,erpcontractorderdetail.othercharges,erpcontractorderdetail.totalquotevalue,erpcontractorderdetail.basecurrency,erpcontractorderdetail.basecurrencydesc,erpcontractorderdetail.basevalue,erpcontractorderdetail.size,erpcontractorderdetail.color,erpcontractorderdetail.weight,erpcontractorderdetail.expecteddelivery,erpcontractorderdetail.paymenttermtype,erpcontractorderdetail.paymenttermtypedesc,erpcontractorderdetail.notes,erpcontractorderdetail.remarks,erpcontractorderdetail.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(erpcontractorderdetail => erpcontractorderdetail.service.includes(filter.name))

return response;
})
);
}



}

