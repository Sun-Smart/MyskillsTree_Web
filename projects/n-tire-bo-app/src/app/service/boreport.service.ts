import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boreport } from '../model/boreport.model';
import { boreportdetail } from '../model/boreportdetail.model';
import { boreportothertable } from '../model/boreportothertable.model';
import { boreportcolumn } from '../model/boreportcolumn.model';
import { environment } from '../../environments/environment';
import { IboreportResponse } from '../model/boreport.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boreportService {
  formData: boreport;
  readonly rootURL = AppConstants.baseURL;
  boreportdetails: boreportdetail[]=[];
  boreportothertables: boreportothertable[]=[];
  boreportcolumns: boreportcolumn[]=[];
  list: boreport[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboreports():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      boreportdetails: this.boreportdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      boreportothertables: this.boreportothertables.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      boreportcolumns: this.boreportcolumns.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/boreport', body);
  }
  }

  saveOrUpdateboreportsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boreport', body);
  }
  }

  getboreportsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreport').toPromise();
  }
  }
  getListByreportid(reportid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreport'+'/reportid/'+reportid).toPromise();
  }
  }

  getListByreportcode(reportcode:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreport'+'/reportcode/'+reportcode).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreport'+'/param/'+key).toPromise();
  }
  }


  getboreportsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreport'+'/e/'+id).toPromise();
  }
  }
  getboreportsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreport'+'/'+id).toPromise();
  }
  }

  deleteboreport(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boreport'+'/'+id).toPromise();
  }
  }
clearList(){
this.boreportdetails = [];
this.boreportothertables = [];
this.boreportcolumns = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boreport')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IboreportResponse> {
return this.http.get<IboreportResponse>(AppConstants.ntireboURL+'/boreport')
.pipe(
tap((response: IboreportResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(boreport => new boreport(boreport.reportid,boreport.reportcode,boreport.reportcodedesc,boreport.reportname,boreport.reportmodule,boreport.reportmoduledesc,boreport.reporttype,boreport.reporttypedesc,boreport.columns,boreport.sidefilter,boreport.sidefilters,boreport.maintablename,boreport.maintablealias,boreport.maintableidentityfield,boreport.pk,boreport.query,boreport.wherecondition,boreport.cardtype,boreport.html,boreport.calendar,boreport.kanbanview,boreport.kanbankey,boreport.datefilter,boreport.datefiltercolumnname,boreport.datefiltertype,boreport.datefiltertypedesc,boreport.groupby,boreport.groupbytext,boreport.groupby2,boreport.groupby2text,boreport.groupbyrelationship,boreport.groupbyrelationshipdesc,boreport.sortby1,boreport.sortby2,boreport.sortby3,boreport.parentid,boreport.parentdescription,boreport.detailtablename,boreport.detailtablealias,boreport.jointype,boreport.jointypedesc,boreport.detailtableidentityfield,boreport.detailtablefk,boreport.detailtableconcatenate,boreport.detailtableheader,boreport.detailtablefooter,boreport.detailtablequery,boreport.masterdetailwhere,boreport.numrows,boreport.reportoutputtype,boreport.reportoutputtypedesc,boreport.noheader,boreport.header,boreport.footer,boreport.headerquery,boreport.footerquery,boreport.headerquery1,boreport.footerquery1,boreport.headerquery2,boreport.footerquery2,boreport.headerquery3,boreport.footerquery3,boreport.headerquery4,boreport.footerquery4,boreport.headerquery5,boreport.footerquery5,boreport.header1,boreport.footer1,boreport.header2,boreport.footer2,boreport.header3,boreport.footer3,boreport.header4,boreport.footer4,boreport.header5,boreport.footer5,boreport.status,boreport.css,boreport.viewhtmltype,boreport.viewhtmltypedesc,boreport.viewhtml,boreport.viewcss,boreport.reporthtml,boreport.workflowhtmltype,boreport.workflowhtmltypedesc,boreport.workflowhtml,boreport.component,boreport.alternateview,boreport.recordtype,boreport.recordtypedesc,boreport.userfield,boreport.employeefield,boreport.userfiltertype,boreport.rolefield,boreport.dashboardid,boreport.dashboardiddesc,boreport.tableheader,boreport.reportjsondata,boreport.helptext,boreport.filters,boreport.filtercolumns,"","",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(boreport => boreport.reportname.includes(filter.name))

return response;
})
);
}



}

