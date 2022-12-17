import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erptenderquotationdetail } from '../model/erptenderquotationdetail.model';
import { environment } from '../../environments/environment';
import { IerptenderquotationdetailResponse } from '../model/erptenderquotationdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erptenderquotationdetailService {
  formData: erptenderquotationdetail;
  readonly rootURL = AppConstants.baseURL;
  list: erptenderquotationdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerptenderquotationdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptenderquotationdetail', body);
  }
  }

  saveOrUpdateerptenderquotationdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptenderquotationdetail', body);
  }
  }

  geterptenderquotationdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderquotationdetail').toPromise();
  }
  }
  getListByquotationdetailid(quotationdetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderquotationdetail'+'/quotationdetailid/'+quotationdetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderquotationdetail'+'/param/'+key).toPromise();
  }
  }


  geterptenderquotationdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderquotationdetail'+'/e/'+id).toPromise();
  }
  }
  geterptenderquotationdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderquotationdetail'+'/'+id).toPromise();
  }
  }

  deleteerptenderquotationdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erptenderquotationdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erptenderquotationdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IerptenderquotationdetailResponse> {
return this.http.get<IerptenderquotationdetailResponse>(AppConstants.ntireprocurementURL+'/erptenderquotationdetail')
.pipe(
tap((response: IerptenderquotationdetailResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(erptenderquotationdetail => new erptenderquotationdetail(erptenderquotationdetail.tenderid,erptenderquotationdetail.quotationid,erptenderquotationdetail.quotationiddesc,erptenderquotationdetail.quotationdetailid,erptenderquotationdetail.itemid,erptenderquotationdetail.itemiddesc,erptenderquotationdetail.itemdescription,erptenderquotationdetail.supplierproductcode,erptenderquotationdetail.supplierproductname,erptenderquotationdetail.supplierproductdescription,erptenderquotationdetail.supplierproductbrand,erptenderquotationdetail.supplierproducturl,erptenderquotationdetail.uom,erptenderquotationdetail.uomdesc,erptenderquotationdetail.quantity,erptenderquotationdetail.currency,erptenderquotationdetail.currencydesc,erptenderquotationdetail.unitprice,erptenderquotationdetail.tax1name,erptenderquotationdetail.tax1namedesc,erptenderquotationdetail.tax1value,erptenderquotationdetail.tax2name,erptenderquotationdetail.tax2namedesc,erptenderquotationdetail.tax2value,erptenderquotationdetail.othercharges,erptenderquotationdetail.totalquotevalue,erptenderquotationdetail.basecurrency,erptenderquotationdetail.basecurrencydesc,erptenderquotationdetail.basevalue,erptenderquotationdetail.expecteddelivery,erptenderquotationdetail.paymenttermtype,erptenderquotationdetail.paymenttermtypedesc,erptenderquotationdetail.offerquantity1,erptenderquotationdetail.unitprice1,erptenderquotationdetail.totalcost1,erptenderquotationdetail.offerquantity2,erptenderquotationdetail.unitprice2,erptenderquotationdetail.totalcost2,erptenderquotationdetail.offerquantity3,erptenderquotationdetail.unitprice3,erptenderquotationdetail.totalcost3,erptenderquotationdetail.remarks,erptenderquotationdetail.customfield,erptenderquotationdetail.attachment,erptenderquotationdetail.status,erptenderquotationdetail.discountpercent))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(erptenderquotationdetail => erptenderquotationdetail.itemdescription.includes(filter.name))

return response;
})
);
}



}

