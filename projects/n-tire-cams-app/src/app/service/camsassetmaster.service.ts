import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camsassetmaster } from '../model/camsassetmaster.model';
import { camspmschedule } from '../model/camspmschedule.model';
import { camsdepreciationschedule } from '../model/camsdepreciationschedule.model';
import { camsassetreadinghistory } from '../model/camsassetreadinghistory.model';
import { camsassettransferdetail } from '../model/camsassettransferdetail.model';
import { camsassetreading } from '../model/camsassetreading.model';
import { camsworkorder } from '../model/camsworkorder.model';
import { camsassetcost } from '../model/camsassetcost.model';
import { camsassetaddition } from '../model/camsassetaddition.model';
import { environment } from '../../environments/environment';
import { IcamsassetmasterResponse } from '../model/camsassetmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camsassetmasterService {
  formData: camsassetmaster;
  readonly rootURL = AppConstants.baseURL;
  list: camsassetmaster[];
  camspmschedules: camspmschedule[]=[];
  camsdepreciationschedules: camsdepreciationschedule[]=[];
  camsassetreadinghistories: camsassetreadinghistory[]=[];
  camsassettransferdetails: camsassettransferdetail[]=[];
  camsassetreadings: camsassetreading[]=[];
  camsworkorders: camsworkorder[]=[];
  camsassetcosts: camsassetcost[]=[];
  camsassetadditions: camsassetaddition[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamsassetmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      camspmschedules: this.camspmschedules.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      camsdepreciationschedules: this.camsdepreciationschedules.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      camsassetreadinghistories: this.camsassetreadinghistories.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      camsassettransferdetails: this.camsassettransferdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      camsassetreadings: this.camsassetreadings.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      camsworkorders: this.camsworkorders.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      camsassetcosts: this.camsassetcosts.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      camsassetadditions: this.camsassetadditions.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassetmaster', body);
  }
  }

  saveOrUpdatecamsassetmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassetmaster', body);
  }
  }

  getcamsassetmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetmaster').toPromise();
  }
  }
  getListByassetid(assetid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetmaster'+'/assetid/'+assetid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetmaster'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetmaster'+'/param/'+key).toPromise();
  }
  }


  getcamsassetmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetmaster'+'/e/'+id).toPromise();
  }
  }
  getcamsassetmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetmaster'+'/'+id).toPromise();
  }
  }

  deletecamsassetmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camsassetmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.camspmschedules = [];
this.camsdepreciationschedules = [];
this.camsassetreadinghistories = [];
this.camsassettransferdetails = [];
this.camsassetreadings = [];
this.camsworkorders = [];
this.camsassetcosts = [];
this.camsassetadditions = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camsassetmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IcamsassetmasterResponse> {
return this.http.get<IcamsassetmasterResponse>(AppConstants.ntirecamsURL+'/camsassetmaster')
.pipe(
tap((response: IcamsassetmasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(camsassetmaster => new camsassetmaster(camsassetmaster.assetid,camsassetmaster.reference,camsassetmaster.description,camsassetmaster.branchid,camsassetmaster.branchiddesc,camsassetmaster.locationid,camsassetmaster.locationiddesc,camsassetmaster.itemid,camsassetmaster.itemiddesc,camsassetmaster.imageurl,camsassetmaster.thumbnail,camsassetmaster.manufacturer,camsassetmaster.manufacturedyear,camsassetmaster.modelnumber,camsassetmaster.serialnumber,camsassetmaster.acquisitionmethod,camsassetmaster.acquisitionmethoddesc,camsassetmaster.supplierid,camsassetmaster.supplieriddesc,camsassetmaster.poreference,camsassetmaster.poreferencedesc,camsassetmaster.supplierdetails,camsassetmaster.grnid,camsassetmaster.grniddesc,camsassetmaster.purchasedate,camsassetmaster.purchaseprice,camsassetmaster.othercost,camsassetmaster.totalcost,camsassetmaster.invoicereference,camsassetmaster.invoicereferencedesc,camsassetmaster.estimatedlife,camsassetmaster.assetenddate,camsassetmaster.residualvalue,camsassetmaster.commisioneddate,camsassetmaster.departmentid,camsassetmaster.departmentiddesc,camsassetmaster.building,camsassetmaster.room,camsassetmaster.assetgroupid,camsassetmaster.assetgroupiddesc,camsassetmaster.parentid,camsassetmaster.parentiddesc,camsassetmaster.assetstatus,camsassetmaster.assetstatusdesc,camsassetmaster.assettype,camsassetmaster.assettypedesc,camsassetmaster.category,camsassetmaster.categorydesc,camsassetmaster.subcategory,camsassetmaster.subcategorydesc,camsassetmaster.criticality,camsassetmaster.criticalitydesc,camsassetmaster.owner,camsassetmaster.assignedto,camsassetmaster.assignedtodesc,camsassetmaster.assigneddate,camsassetmaster.assignedremarks,camsassetmaster.assetnotes,camsassetmaster.maintenancenotes,camsassetmaster.contractorid,camsassetmaster.contractoriddesc,camsassetmaster.contractid,camsassetmaster.contractiddesc,camsassetmaster.contractorexpirydate,camsassetmaster.amcstartdate,camsassetmaster.amcenddate,camsassetmaster.amcstatus,camsassetmaster.amcstatusdesc,camsassetmaster.contractnotes,camsassetmaster.amchistory,camsassetmaster.insurancecompany,camsassetmaster.insurancepolicyno,camsassetmaster.insurancestartdate,camsassetmaster.insuranceexpirydate,camsassetmaster.insurancerenewaldate,camsassetmaster.insurancepremium,camsassetmaster.insurancevalue,camsassetmaster.insurancestatus,camsassetmaster.insurancestatusdesc,camsassetmaster.insurancenotes,camsassetmaster.insurancehistory,camsassetmaster.lifetimewarranty,camsassetmaster.warrantyno,camsassetmaster.warrantyexpirydate,camsassetmaster.warrantyexpirationreminder,camsassetmaster.warrantystatus,camsassetmaster.warrantystatusdesc,camsassetmaster.servicereminder,camsassetmaster.assetservicedate,camsassetmaster.lastmaintenancedate,camsassetmaster.nextmaintenancedate,camsassetmaster.lastunit,camsassetmaster.nextunit,camsassetmaster.lastnote,camsassetmaster.disposaldate,camsassetmaster.disposalmethod,camsassetmaster.disposalmethoddesc,camsassetmaster.disposedby,camsassetmaster.disposedbydesc,camsassetmaster.disposalamount,camsassetmaster.disposedreason,camsassetmaster.disposedreasondesc,camsassetmaster.depreciationstartdate,camsassetmaster.currentvalue,camsassetmaster.currentyeardepreciation,camsassetmaster.cumulativedepreciation,camsassetmaster.depreciationcount,camsassetmaster.sourcefield,camsassetmaster.sourcereference,camsassetmaster.remarks,camsassetmaster.bankloan,camsassetmaster.loanid,camsassetmaster.loaniddesc,camsassetmaster.customfield,camsassetmaster.attachment,camsassetmaster.quantity,camsassetmaster.uom,camsassetmaster.uomdesc,camsassetmaster.lotnumber,camsassetmaster.binlocationid,camsassetmaster.width,camsassetmaster.height,camsassetmaster.depth,camsassetmaster.color,camsassetmaster.licenseno,camsassetmaster.licensefee,camsassetmaster.licenserenewaldate,camsassetmaster.licensestatus,camsassetmaster.licensestatusdesc,camsassetmaster.tag,camsassetmaster.status,"","","","","","","",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(camsassetmaster => camsassetmaster.reference.includes(filter.name))

return response;
})
);
}



}

