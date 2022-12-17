import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsopportunity } from '../model/lmsopportunity.model';
import { lmsopportunityproduct } from '../model/lmsopportunityproduct.model';
import { lmscall } from '../model/lmscall.model';
import { lmssecondarycontact } from '../model/lmssecondarycontact.model';
import { lmsreminder } from '../model/lmsreminder.model';
import { lmsquote } from '../model/lmsquote.model';
import { boexpense } from '../model/boexpense.model';
import { environment } from '../../environments/environment';
import { IlmsopportunityResponse } from '../model/lmsopportunity.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsopportunityService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmsopportunities(formData, lmsopportunityproducts, lmscalls, lmssecondarycontacts, lmsreminders, lmsquotes, boexpenses,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        lmsopportunityproducts: lmsopportunityproducts.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        lmscalls: lmscalls.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        lmssecondarycontacts: lmssecondarycontacts.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        lmsreminders: lmsreminders.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        lmsquotes: lmsquotes.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        boexpenses: boexpenses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmsopportunity', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsopportunity' + '/getdefaultdata').toPromise();
    }
  }
  get_lmsopportunities_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsopportunity').toPromise();
    }
  }
  getListBy_opportunityid(opportunityid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsopportunity' + '/opportunityid/' + opportunityid).toPromise();
    }
  }

  getListBy_opportunitystage(opportunitystage: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsopportunity' + '/opportunitystage/' + opportunitystage).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsopportunity' + '/param/' + key).toPromise();
    }
  }


  get_lmsopportunities_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsopportunity' + '/e/' + id).toPromise();
    }
  }
  get_lmsopportunities_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsopportunity' + '/' + id).toPromise();
    }
  }

  delete_lmsopportunity(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmsopportunity' + '/' + id).toPromise();
    }
  }
  getlmsopportunitiesListbyopportunitystage(dt: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsopportunity/' + dt + '').toPromise();
    }
  }

  getlmsopportunitiesListbymonthwise(dt: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsopportunity/' + dt + '').toPromise();
    }
  }


  getList_leadid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_leadid').toPromise();
  }

  getList_opportunityid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_opportunityid').toPromise();
  }

  getList_leadby(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_leadby').toPromise();
  }

  getList_opportunitytype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_opportunitytype/').toPromise();
  }

  getList_opportunitystage(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_opportunitystage/').toPromise();
  }

  getList_stagesubcategory(categoryid): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_stagesubcategory/categoryid').toPromise();
  }

  getList_opportunitysize(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_opportunitysize/').toPromise();
  }

  getList_nextstep(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_nextstep/').toPromise();
  }

  getList_possibilityofclosure(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_possibilityofclosure/').toPromise();
  }

  getList_leadsource(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_leadsource/').toPromise();
  }

  getList_budget(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_budget/').toPromise();
  }

  getList_criticality(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_criticality/').toPromise();
  }

  getList_priority(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_priority/').toPromise();
  }

  getList_campaignid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_campaignid').toPromise();
  }

  getList_territory(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_territory/').toPromise();
  }

  getList_reasonforloss(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_reasonforloss/').toPromise();
  }


}

