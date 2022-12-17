import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boreport } from '../model/boreport.model';
import { boreportdetail } from '../model/boreportdetail.model';
import { boreportothertable } from '../model/boreportothertable.model';
import { boreportcolumn } from '../model/boreportcolumn.model';
import { environment } from '../../environments/environment';
import { IboreportResponse } from '../model/boreport.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boreportService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_boreports(formData, boreportdetails, boreportothertables, boreportcolumns,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        boreportdetails: boreportdetails.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        boreportothertables: boreportothertables.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        boreportcolumns: boreportcolumns.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/boreport', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreport' + '/getdefaultdata').toPromise();
    }
  }
  get_boreports_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreport').toPromise();
    }
  }
  getListBy_reportid(reportid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreport' + '/reportid/' + reportid).toPromise();
    }
  }

  getListBy_reportcode(reportcode: string): any {
    debugger
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreport' + '/reportcode/' + reportcode).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreport' + '/param/' + key).toPromise();
    }
  }


  get_boreports_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreport' + '/e/' + id).toPromise();
    }
  }
  get_boreports_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreport' + '/' + id).toPromise();
    }
  }

  delete_boreport(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/boreport' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IboreportResponse> {
    return this.http.get<IboreportResponse>(AppConstants.ntirebizURL + '/boreport')
      .pipe(
        tap((response: IboreportResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(boreport => new boreport(boreport.reportid, boreport.reportcode, boreport.reportname, boreport.reportmodule, boreport.reportmoduledesc, boreport.reporttype, boreport.reporttypedesc, boreport.columns, boreport.sidefilter, boreport.sidefilters, boreport.maintablename, boreport.maintablealias, boreport.maintableidentityfield, boreport.pk, boreport.query, boreport.wherecondition, boreport.cardtype, boreport.html, boreport.calendar, boreport.kanbanview, boreport.kanbankey, boreport.datefilter, boreport.datefiltercolumnname, boreport.datefiltertype, boreport.datefiltertypedesc, boreport.groupby, boreport.groupbytext, boreport.groupby2, boreport.groupby2text, boreport.groupbyrelationship, boreport.groupbyrelationshipdesc, boreport.sortby1, boreport.sortby2, boreport.sortby3, boreport.parentid, boreport.parentdescription, boreport.detailtablename, boreport.detailtablealias, boreport.jointype, boreport.jointypedesc, boreport.detailtableidentityfield, boreport.detailtablefk, boreport.detailtableconcatenate, boreport.detailtableheader, boreport.detailtablefooter, boreport.detailtablequery, boreport.masterdetailwhere, boreport.numrows, boreport.reportoutputtype, boreport.reportoutputtypedesc, boreport.noheader, boreport.header, boreport.footer, boreport.headerquery, boreport.footerquery, boreport.headerquery1, boreport.footerquery1, boreport.headerquery2, boreport.footerquery2, boreport.headerquery3, boreport.footerquery3, boreport.headerquery4, boreport.footerquery4, boreport.headerquery5, boreport.footerquery5, boreport.header1, boreport.footer1, boreport.header2, boreport.footer2, boreport.header3, boreport.footer3, boreport.header4, boreport.footer4, boreport.header5, boreport.footer5, boreport.status, boreport.css, boreport.viewhtmltype, boreport.viewhtmltypedesc, boreport.viewhtml, boreport.viewcss, boreport.reporthtml, boreport.workflowhtmltype, boreport.workflowhtmltypedesc, boreport.workflowhtml, boreport.component, boreport.alternateview, boreport.recordtype, boreport.recordtypedesc, boreport.userfield, boreport.employeefield, boreport.userfiltertype, boreport.rolefield, boreport.dashboardid, boreport.dashboardiddesc, boreport.tableheader, boreport.reportjsondata, boreport.helptext, boreport.filters, boreport.filtercolumns, "", "", ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(boreport => boreport.reportname.includes(filter.name))

          return response;
        })
      );
  }


  getList_reportmodule(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boreport' + '/getList_reportmodule/').toPromise();
  }

  getList_reporttype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boreport' + '/getList_reporttype/').toPromise();
  }

  getList_datefiltertype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boreport' + '/getList_datefiltertype/').toPromise();
  }

  getList_groupbyrelationship(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boreport' + '/getList_groupbyrelationship/').toPromise();
  }

  getList_jointype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boreport' + '/getList_jointype/').toPromise();
  }

  getList_reportoutputtype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boreport' + '/getList_reportoutputtype/').toPromise();
  }

  getList_viewhtmltype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boreport' + '/getList_viewhtmltype/').toPromise();
  }

  getList_workflowhtmltype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boreport' + '/getList_workflowhtmltype/').toPromise();
  }

  getList_recordtype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boreport' + '/getList_recordtype/').toPromise();
  }

  getList_dashboardid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boreport' + '/getList_dashboardid').toPromise();
  }



}

