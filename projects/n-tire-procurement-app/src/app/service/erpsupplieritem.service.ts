import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsupplieritem } from '../model/erpsupplieritem.model';
import { erpsupplieritemfeature } from '../model/erpsupplieritemfeature.model';
import { erpsupplierpaymentterm } from '../model/erpsupplierpaymentterm.model';
import { environment } from '../../environments/environment';
import { IerpsupplieritemResponse } from '../model/erpsupplieritem.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsupplieritemService {
  formData: erpsupplieritem;
  readonly rootURL = AppConstants.baseURL;
  list: erpsupplieritem[];
  erpsupplieritemfeatures: erpsupplieritemfeature[]=[];
  erpsupplierpaymentterms: erpsupplierpaymentterm[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsupplieritems():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpsupplieritemfeatures: this.erpsupplieritemfeatures.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erpsupplierpaymentterms: this.erpsupplierpaymentterms.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplieritem', body);
  }
  }

  saveOrUpdateerpsupplieritemsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplieritem', body);
  }
  }

  geterpsupplieritemsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplieritem').toPromise();
  }
  }
  getListBysupplieritemid(supplieritemid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplieritem'+'/supplieritemid/'+supplieritemid).toPromise();
  }
  }

  getListBysupplierid(supplierid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplieritem'+'/supplierid/'+supplierid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplieritem'+'/param/'+key).toPromise();
  }
  }


  geterpsupplieritemsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplieritem'+'/e/'+id).toPromise();
  }
  }
  geterpsupplieritemsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplieritem'+'/'+id).toPromise();
  }
  }

  deleteerpsupplieritem(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsupplieritem'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpsupplieritemfeatures = [];
this.erpsupplierpaymentterms = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsupplieritem')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IerpsupplieritemResponse> {
return this.http.get<IerpsupplieritemResponse>(AppConstants.ntireprocurementURL+'/erpsupplieritem')
.pipe(
tap((response: IerpsupplieritemResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(erpsupplieritem => new erpsupplieritem(erpsupplieritem.supplierid,erpsupplieritem.supplieriddesc,erpsupplieritem.supplieritemid,erpsupplieritem.supplieritemiddesc,erpsupplieritem.itemcategoryid,erpsupplieritem.itemcategoryiddesc,erpsupplieritem.itemsubcategoryid,erpsupplieritem.itemsubcategoryiddesc,erpsupplieritem.supplieritemcode,erpsupplieritem.supplierpartname,erpsupplieritem.ourcompanyitemid,erpsupplieritem.ourcompanyitemiddesc,erpsupplieritem.itemdescription,erpsupplieritem.brand,erpsupplieritem.model,erpsupplieritem.make,erpsupplieritem.ispreferred,erpsupplieritem.uom,erpsupplieritem.uomdesc,erpsupplieritem.currency,erpsupplieritem.currencydesc,erpsupplieritem.dimensions,erpsupplieritem.producttype,erpsupplieritem.producttypedesc,erpsupplieritem.productimage,erpsupplieritem.description,erpsupplieritem.minorderqty,erpsupplieritem.reorderlevel,erpsupplieritem.leadtimedays,erpsupplieritem.riskclassification,erpsupplieritem.riskclassificationdesc,erpsupplieritem.unitprice,erpsupplieritem.discountpercent,erpsupplieritem.tax1name,erpsupplieritem.tax1namedesc,erpsupplieritem.tax1,erpsupplieritem.tax2name,erpsupplieritem.tax2namedesc,erpsupplieritem.tax2,erpsupplieritem.othercharges,erpsupplieritem.totalcost,erpsupplieritem.pricevalidenddate,erpsupplieritem.offerquantity1,erpsupplieritem.unitprice1,erpsupplieritem.totalcost1,erpsupplieritem.offerquantity2,erpsupplieritem.unitprice2,erpsupplieritem.totalcost2,erpsupplieritem.offerquantity3,erpsupplieritem.unitprice3,erpsupplieritem.totalcost3,erpsupplieritem.availablestock,erpsupplieritem.salesunitsize,erpsupplieritem.salesunitsizedesc,erpsupplieritem.contractid,erpsupplieritem.contractiddesc,erpsupplieritem.suppliercontactid,erpsupplieritem.suppliercontactiddesc,erpsupplieritem.accountid,erpsupplieritem.accountiddesc,erpsupplieritem.remarks,erpsupplieritem.customfield,erpsupplieritem.attachment,erpsupplieritem.status,erpsupplieritem.totalqtyordered,"",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(erpsupplieritem => erpsupplieritem.itemdescription.includes(filter.name))

return response;
})
);
}



}

