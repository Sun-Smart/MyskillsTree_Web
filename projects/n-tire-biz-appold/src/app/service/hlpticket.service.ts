import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hlpticket } from '../model/hlpticket.model';
import { hlpticketdetail } from '../../../../n-tire-help-desk-app/src/app/model/hlpticketdetail.model';
import { hlpplannedaction } from '../model/hlpplannedaction.model';
import { environment } from '../../environments/environment';
import { IhlpticketResponse } from '../model/hlpticket.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hlpticketService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_hlptickets(formData, hlpticketdetails, hlpplannedactions,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        hlpticketdetails: hlpticketdetails.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        hlpplannedactions: hlpplannedactions.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/hlpticket', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticket' + '/getdefaultdata').toPromise();
    }
  }
  get_hlptickets_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticket').toPromise();
    }
  }
  getListBy_ticketid(ticketid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticket' + '/ticketid/' + ticketid).toPromise();
    }
  }

  getListBy_sourcereference(sourcereference: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticket' + '/sourcereference/' + sourcereference).toPromise();
    }
  }

  getListBy_criticality(criticality: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticket' + '/criticality/' + criticality).toPromise();
    }
  }

  getListBy_source(source: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticket' + '/source/' + source).toPromise();
    }
  }

  getListBy_category(category: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticket' + '/category/' + category).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticket' + '/param/' + key).toPromise();
    }
  }


  get_hlptickets_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticket' + '/e/' + id).toPromise();
    }
  }
  get_hlptickets_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticket' + '/' + id).toPromise();
    }
  }

  delete_hlpticket(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/hlpticket' + '/' + id).toPromise();
    }
  }
  gethlpticketsListbycriticality(dt: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticket/' + dt + '').toPromise();
    }
  }

  gethlpticketsListbystatus(dt: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticket/' + dt + '').toPromise();
    }
  }

  gethlpticketsListbycategory(dt: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticket/' + dt + '').toPromise();
    }
  }

  gethlpticketsListbytickettype(dt: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticket/' + dt + '').toPromise();
    }
  }

  gethlpticketsListbymonthwise(dt: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticket/' + dt + '').toPromise();
    }
  }

  search(filter: { name: string } = { name: '' }, page = 1): Observable<IhlpticketResponse> {
    return this.http.get<IhlpticketResponse>(AppConstants.ntirebizURL + '/hlpticket')
      .pipe(
        tap((response: IhlpticketResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(hlpticket => new hlpticket(hlpticket.ticketid, hlpticket.sourcefield, hlpticket.sourcefielddesc, hlpticket.sourcereference, hlpticket.branchid, hlpticket.branchiddesc, hlpticket.departmentid, hlpticket.departmentiddesc, hlpticket.requestortype, hlpticket.requestortypedesc, hlpticket.requestor, hlpticket.requestordesc, hlpticket.item, hlpticket.ticketdate, hlpticket.incidentdate, hlpticket.incidenttime, hlpticket.incidentduration, hlpticket.duedate, hlpticket.assignedto, hlpticket.tickettype, hlpticket.tickettypedesc, hlpticket.priority, hlpticket.prioritydesc, hlpticket.criticality, hlpticket.criticalitydesc, hlpticket.impact, hlpticket.impactdesc, hlpticket.risk, hlpticket.riskdesc, hlpticket.sla, hlpticket.sladesc, hlpticket.slabreached, hlpticket.source, hlpticket.sourcedesc, hlpticket.ticketreference, hlpticket.category, hlpticket.categorydesc, hlpticket.subcategory, hlpticket.subcategorydesc, hlpticket.tags, hlpticket.subject, hlpticket.ticketdetails, hlpticket.impacteditems, hlpticket.impactedservices, hlpticket.impactedproducts, hlpticket.impactdetails, hlpticket.remarks, hlpticket.stage, hlpticket.stagedesc, hlpticket.completedby, hlpticket.completedbydesc, hlpticket.linkedtickets, hlpticket.rca, hlpticket.rcadesc, hlpticket.rcadetails, hlpticket.solution, hlpticket.solutiondesc, hlpticket.solutiondetails, hlpticket.solutiongivenon, hlpticket.startdate, hlpticket.completeddate, hlpticket.lessonslearned, hlpticket.history, hlpticket.customfield, hlpticket.attachment, hlpticket.status, "", ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(hlpticket => hlpticket.subject.includes(filter.name))

          return response;
        })
      );
  }


  getList_sourcefield(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpticket' + '/getList_sourcefield/').toPromise();
  }

  getList_branchid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpticket' + '/getList_branchid').toPromise();
  }

  getList_departmentid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpticket' + '/getList_departmentid').toPromise();
  }

  getList_requestortype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpticket' + '/getList_requestortype/').toPromise();
  }

  getList_requestor(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpticket' + '/getList_requestor').toPromise();
  }

  getList_tickettype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpticket' + '/getList_tickettype/').toPromise();
  }

  getList_priority(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpticket' + '/getList_priority/').toPromise();
  }

  getList_criticality(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpticket' + '/getList_criticality/').toPromise();
  }

  getList_impact(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpticket' + '/getList_impact/').toPromise();
  }

  getList_risk(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpticket' + '/getList_risk/').toPromise();
  }

  getList_sla(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpticket' + '/getList_sla').toPromise();
  }

  getList_source(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpticket' + '/getList_source/').toPromise();
  }

  getList_category(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpticket' + '/getList_category').toPromise();
  }

  getList_subcategory(categoryid): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpticket' + '/getList_subcategory/categoryid').toPromise();
  }

  getList_stage(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpticket' + '/getList_stage/').toPromise();
  }

  getList_completedby(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpticket' + '/getList_completedby').toPromise();
  }

  getList_rca(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpticket' + '/getList_rca/').toPromise();
  }

  getList_solution(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpticket' + '/getList_solution/').toPromise();
  }


}

