import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpitemmaster } from '../model/erpitemmaster.model';
import { erpitemattribute } from '../model/erpitemattribute.model';
import { erpitemimage } from '../model/erpitemimage.model';
import { environment } from '../../environments/environment';
import { IerpitemmasterResponse } from '../model/erpitemmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpitemmasterService {
  formData: erpitemmaster;
  readonly rootURL = AppConstants.baseURL;
  list: erpitemmaster[];
  erpitemattributes: erpitemattribute[]=[];
  erpitemimages: erpitemimage[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpitemmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpitemattributes: this.erpitemattributes.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erpitemimages: this.erpitemimages.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpitemmaster', body);
  }
  }

  saveOrUpdateerpitemmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpitemmaster', body);
  }
  }

  geterpitemmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitemmaster').toPromise();
  }
  }
  getListByitemid(itemid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitemmaster'+'/itemid/'+itemid).toPromise();
  }
  }

  getListBysubcategory(subcategory:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitemmaster'+'/subcategory/'+subcategory).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitemmaster'+'/param/'+key).toPromise();
  }
  }


  geterpitemmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitemmaster'+'/e/'+id).toPromise();
  }
  }
  geterpitemmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitemmaster'+'/'+id).toPromise();
  }
  }

  deleteerpitemmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpitemmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpitemattributes = [];
this.erpitemimages = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpitemmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IerpitemmasterResponse> {
return this.http.get<IerpitemmasterResponse>(AppConstants.ntireprocurementURL+'/erpitemmaster')
.pipe(
tap((response: IerpitemmasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(erpitemmaster => new erpitemmaster(erpitemmaster.itemid,erpitemmaster.itemcode,erpitemmaster.type,erpitemmaster.typedesc,erpitemmaster.category,erpitemmaster.categorydesc,erpitemmaster.subcategory,erpitemmaster.subcategorydesc,erpitemmaster.itemgroup,erpitemmaster.versionnumber,erpitemmaster.itemshortname,erpitemmaster.itemname,erpitemmaster.itemdescription,erpitemmaster.salesdescription,erpitemmaster.purchasedescription,erpitemmaster.brand,erpitemmaster.thumbnail,erpitemmaster.alternativeitems,erpitemmaster.stockuom,erpitemmaster.stockuomdesc,erpitemmaster.purchaseuom,erpitemmaster.purchaseuomdesc,erpitemmaster.salesuom,erpitemmaster.salesuomdesc,erpitemmaster.conversionlogic,erpitemmaster.itemclass,erpitemmaster.itemclassdesc,erpitemmaster.erpcode,erpitemmaster.trackingmode,erpitemmaster.trackingmodedesc,erpitemmaster.qcrequired,erpitemmaster.standardcurrency,erpitemmaster.standardcost,erpitemmaster.costmode,erpitemmaster.costmodedesc,erpitemmaster.openingstock,erpitemmaster.valuationrate,erpitemmaster.valuationmethod,erpitemmaster.standardsellingrate,erpitemmaster.isfixedasset,erpitemmaster.depreciationtype,erpitemmaster.depreciationtypedesc,erpitemmaster.depreciation,erpitemmaster.budgetenabled,erpitemmaster.estimatedlife,erpitemmaster.warrantyexpirydate,erpitemmaster.safetystock,erpitemmaster.reorderpoint,erpitemmaster.reorderquantity,erpitemmaster.maximumorderquantity,erpitemmaster.leadtime,erpitemmaster.raiseprs,erpitemmaster.purchasetype,erpitemmaster.purchasetypedesc,erpitemmaster.materialrequesttype,erpitemmaster.warehouses,erpitemmaster.sales,erpitemmaster.lastsaledate,erpitemmaster.lastsaleprice,erpitemmaster.purchase,erpitemmaster.lastpurchasedate,erpitemmaster.lastpurchaseprice,erpitemmaster.workorder,erpitemmaster.batchtracking,erpitemmaster.serialtracking,erpitemmaster.size,erpitemmaster.color,erpitemmaster.dimension,erpitemmaster.width,erpitemmaster.height,erpitemmaster.depth,erpitemmaster.weight,erpitemmaster.weightuom,erpitemmaster.weightuomdesc,erpitemmaster.drawingnumber,erpitemmaster.attributes,erpitemmaster.qtyinstock,erpitemmaster.avgmonthlyconsumption,erpitemmaster.tax1,erpitemmaster.tax2,erpitemmaster.tax1value,erpitemmaster.tax2value,erpitemmaster.qualityinspectionid,erpitemmaster.availabledate,erpitemmaster.itemstatus,erpitemmaster.itemstatusdesc,erpitemmaster.status,"",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(erpitemmaster => erpitemmaster.itemshortname.includes(filter.name))

return response;
})
);
}



}

