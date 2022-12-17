import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpgoodsreceiptmaster } from '../model/erpgoodsreceiptmaster.model';
import { erpgoodsreceiptdetail } from '../model/erpgoodsreceiptdetail.model';
import { environment } from '../../environments/environment';
import { IerpgoodsreceiptmasterResponse } from '../model/erpgoodsreceiptmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpgoodsreceiptmasterService {
  formData: erpgoodsreceiptmaster;
  readonly rootURL = AppConstants.baseURL;
  list: erpgoodsreceiptmaster[];
  erpgoodsreceiptdetails: erpgoodsreceiptdetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpgoodsreceiptmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpgoodsreceiptdetails: this.erpgoodsreceiptdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpgoodsreceiptmaster', body);
  }
  }

  saveOrUpdateerpgoodsreceiptmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpgoodsreceiptmaster', body);
  }
  }

  geterpgoodsreceiptmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpgoodsreceiptmaster').toPromise();
  }
  }
  getListBygrnid(grnid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpgoodsreceiptmaster'+'/grnid/'+grnid).toPromise();
  }
  }

  getListBysupplierid(supplierid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpgoodsreceiptmaster'+'/supplierid/'+supplierid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpgoodsreceiptmaster'+'/param/'+key).toPromise();
  }
  }


  geterpgoodsreceiptmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpgoodsreceiptmaster'+'/e/'+id).toPromise();
  }
  }
  geterpgoodsreceiptmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpgoodsreceiptmaster'+'/'+id).toPromise();
  }
  }

  deleteerpgoodsreceiptmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpgoodsreceiptmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpgoodsreceiptdetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpgoodsreceiptmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IerpgoodsreceiptmasterResponse> {
return this.http.get<IerpgoodsreceiptmasterResponse>(AppConstants.ntireprocurementURL+'/erpgoodsreceiptmaster')
.pipe(
tap((response: IerpgoodsreceiptmasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(erpgoodsreceiptmaster => new erpgoodsreceiptmaster(erpgoodsreceiptmaster.branchid,erpgoodsreceiptmaster.branchiddesc,erpgoodsreceiptmaster.supplierid,erpgoodsreceiptmaster.supplieriddesc,erpgoodsreceiptmaster.grnid,erpgoodsreceiptmaster.grniddesc,erpgoodsreceiptmaster.grnnumber,erpgoodsreceiptmaster.grndate,erpgoodsreceiptmaster.grntype,erpgoodsreceiptmaster.grntypedesc,erpgoodsreceiptmaster.grntypereference,erpgoodsreceiptmaster.dcnumber,erpgoodsreceiptmaster.dcdate,erpgoodsreceiptmaster.ponumber,erpgoodsreceiptmaster.ponumberdesc,erpgoodsreceiptmaster.poversionno,erpgoodsreceiptmaster.supplieraddress,erpgoodsreceiptmaster.suppliercontactperson,erpgoodsreceiptmaster.supplierbillingaddress,erpgoodsreceiptmaster.receivedby,erpgoodsreceiptmaster.receivedbydesc,erpgoodsreceiptmaster.assignedto,erpgoodsreceiptmaster.transportername,erpgoodsreceiptmaster.vehicledetails,erpgoodsreceiptmaster.shipmentdetails,erpgoodsreceiptmaster.packinglistno,erpgoodsreceiptmaster.freightcontainer,erpgoodsreceiptmaster.containers,erpgoodsreceiptmaster.airbill,erpgoodsreceiptmaster.billoflading,erpgoodsreceiptmaster.warehouseid,erpgoodsreceiptmaster.warehouseiddesc,erpgoodsreceiptmaster.accountid,erpgoodsreceiptmaster.accountiddesc,erpgoodsreceiptmaster.totalvalue,erpgoodsreceiptmaster.taxamount,erpgoodsreceiptmaster.charges,erpgoodsreceiptmaster.deductedtaxamount,erpgoodsreceiptmaster.nettaxamount,erpgoodsreceiptmaster.additionaldiscountpercentage,erpgoodsreceiptmaster.additionaldiscountamount,erpgoodsreceiptmaster.netamount,erpgoodsreceiptmaster.currency,erpgoodsreceiptmaster.customfield,erpgoodsreceiptmaster.attachment,erpgoodsreceiptmaster.grnremarks,erpgoodsreceiptmaster.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(erpgoodsreceiptmaster => erpgoodsreceiptmaster.grnnumber.includes(filter.name))

return response;
})
);
}



}

