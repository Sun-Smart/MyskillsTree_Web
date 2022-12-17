import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpproduct } from '../model/erpproduct.model';
import { erpproductpricehistory } from '../../../../n-tire-procurement-app/src/app/model/erpproductpricehistory.model';
import { ecmcustomerbasket } from '../../../../n-tire-commerce-app/src/app/model/ecmcustomerbasket.model';
import { erpproductfeatureparameter } from '../../../../n-tire-procurement-app/src/app/model/erpproductfeatureparameter.model';
import { ecmreview } from '../../../../n-tire-commerce-app/src/app/model/ecmreview.model';
import { ecmspecial } from '../../../../n-tire-commerce-app/src/app/model/ecmspecial.model';
import { erpproductaccess } from '../../../../n-tire-procurement-app/src/app/model/erpproductaccess.model';
import { erpproductattribute } from '../../../../n-tire-procurement-app/src/app/model/erpproductattribute.model';
import { erpproductimage } from '../../../../n-tire-procurement-app/src/app/model/erpproductimage.model';
import { ltymerchantproduct } from '../model/ltymerchantproduct.model';
import { environment } from '../../environments/environment';
import { IerpproductResponse } from '../model/erpproduct.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpproductService {
  formData: erpproduct;
  readonly rootURL = AppConstants.baseURL;
  erpproductpricehistories: erpproductpricehistory[]=[];
  ecmcustomerbaskets: ecmcustomerbasket[]=[];
  erpproductfeatureparameters: erpproductfeatureparameter[]=[];
  ecmreviews: ecmreview[]=[];
  ecmspecials: ecmspecial[]=[];
  erpproductaccesses: erpproductaccess[]=[];
  Inserterpproductaccesses: erpproductaccess[]=[];
  erpproductattributes: erpproductattribute[]=[];
  erpproductimages: erpproductimage[]=[];
  ltymerchantproducts: ltymerchantproduct[]=[];
  list: erpproduct[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpproducts():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpproductpricehistories: this.erpproductpricehistories.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      ecmcustomerbaskets: this.ecmcustomerbaskets.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erpproductfeatureparameters: this.erpproductfeatureparameters.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      ecmreviews: this.ecmreviews.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      ecmspecials: this.ecmspecials.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erpproductaccesses: this.Inserterpproductaccesses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erpproductattributes: this.erpproductattributes.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erpproductimages: this.erpproductimages.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      ltymerchantproducts: this.ltymerchantproducts.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/erpproduct', body);
  }
  }

  saveOrUpdateerpproductsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/erpproduct', body);
  }
  }

  geterpproductsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/erpproduct').toPromise();
  }
  }
  getListByproductid(productid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/erpproduct'+'/productid/'+productid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/erpproduct'+'/param/'+key).toPromise();
  }
  }


  geterpproductsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/erpproduct'+'/e/'+id).toPromise();
  }
  }
  geterpproductsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/erpproduct'+'/'+id).toPromise();
  }
  }

  deleteerpproduct(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/erpproduct'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpproductpricehistories = [];
this.ecmcustomerbaskets = [];
this.erpproductfeatureparameters = [];
this.ecmreviews = [];
this.ecmspecials = [];
this.erpproductaccesses = [];
this.erpproductattributes = [];
this.erpproductimages = [];
this.ltymerchantproducts = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/erpproduct')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IerpproductResponse> {
return this.http.get<IerpproductResponse>(AppConstants.ntireloyaltyURL+'/erpproduct')
.pipe(
tap((response: IerpproductResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(erpproduct => new erpproduct(erpproduct.productid,erpproduct.productcode,erpproduct.productname,erpproduct.thumbnail,erpproduct.brand,erpproduct.genericname,erpproduct.model,erpproduct.availabledate,erpproduct.marketingmanagerid,erpproduct.marketingmanageriddesc,erpproduct.salesmanagerid,erpproduct.salesmanageriddesc,erpproduct.supportmanagerid,erpproduct.supportmanageriddesc,erpproduct.marketingteam,erpproduct.marketingteamdesc,erpproduct.salesteam,erpproduct.salesteamdesc,erpproduct.supportteam,erpproduct.supportteamdesc,erpproduct.metadata,erpproduct.itemid,erpproduct.itemiddesc,erpproduct.preferredsupplier,erpproduct.preferredsupplierdesc,erpproduct.preferredproduct,erpproduct.preferredproductdesc,erpproduct.productcategory,erpproduct.productcategorydesc,erpproduct.uom,erpproduct.uomdesc,erpproduct.productimage,erpproduct.description,erpproduct.dimension,erpproduct.weight,erpproduct.details,erpproduct.stock,erpproduct.stockprice,erpproduct.totalordered,erpproduct.minorderqty,erpproduct.currency,erpproduct.currencydesc,erpproduct.offerquantity1,erpproduct.unitprice1,erpproduct.totalcost1,erpproduct.offerquantity2,erpproduct.unitprice2,erpproduct.totalcost2,erpproduct.offerquantity3,erpproduct.unitprice3,erpproduct.totalcost3,erpproduct.salesdiscount,erpproduct.purchaserate,erpproduct.purchasediscount,erpproduct.salesaccount,erpproduct.salesaccountdesc,erpproduct.purchaseaccount,erpproduct.purchaseaccountdesc,erpproduct.itemquality,erpproduct.uniqueness,erpproduct.features,erpproduct.effectiveness,erpproduct.customerservice,erpproduct.innovation,erpproduct.marketshare,erpproduct.distributionchannels,erpproduct.salesability,erpproduct.wowfactor,erpproduct.valueproposition1,erpproduct.propositionmethod1,erpproduct.propositionmethod1desc,erpproduct.valueproposition2,erpproduct.propositionmethod2,erpproduct.propositionmethod2desc,erpproduct.valueproposition3,erpproduct.propositionmethod3,erpproduct.propositionmethod3desc,erpproduct.brandstory,erpproduct.emotionalbenefits,erpproduct.brandmeaning,erpproduct.marketview,erpproduct.brandpromise,erpproduct.brandpositioning,erpproduct.brandstrategy,erpproduct.brandcolors,erpproduct.competitorproductadditionownerid,erpproduct.competitorproductadditionowneriddesc,erpproduct.marketresearchownerid,erpproduct.marketresearchowneriddesc,erpproduct.marketsegmentationownerid,erpproduct.marketsegmentationowneriddesc,erpproduct.competitiveanalysisownerid,erpproduct.competitiveanalysisowneriddesc,erpproduct.competitivepositioningstrategyownerid,erpproduct.competitivepositioningstrategyowneriddesc,erpproduct.loyaltypointbased,erpproduct.loyaltypointbaseddesc,erpproduct.pointperpurchase,erpproduct.pointpercurrency,erpproduct.customfield,erpproduct.attachment,erpproduct.productstatus,erpproduct.productstatusdesc,erpproduct.status,"","","","","","","","",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(erpproduct => erpproduct.productname.includes(filter.name))

return response;
})
);
}



}

