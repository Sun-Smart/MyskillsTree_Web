import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmscall } from '../model/lmscall.model';
import { lmstask } from '../model/lmstask.model';
import { lmsreminder } from '../model/lmsreminder.model';
import { lmshistory } from '../model/lmshistory.model';
import { environment } from '../../environments/environment';
import { IlmscallResponse } from '../model/lmscall.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmscallService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmscalls(formData, lmstasks, lmsreminders, lmshistories,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        lmstasks: lmstasks.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        lmsreminders: lmsreminders.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        lmshistories: lmshistories.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmscall', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscall' + '/getdefaultdata').toPromise();
    }
  }
  get_lmscalls_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscall').toPromise();
    }
  }
  getListBy_callid(callid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscall' + '/callid/' + callid).toPromise();
    }
  }

  getListBy_activitytype(activitytype: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscall' + '/activitytype/' + activitytype).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscall' + '/param/' + key).toPromise();
    }
  }


  get_lmscalls_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscall' + '/e/' + id).toPromise();
    }
  }
  get_lmscalls_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscall' + '/' + id).toPromise();
    }
  }

  delete_lmscall(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmscall' + '/' + id).toPromise();
    }
  }
  getlmscallsListbyactivitytype(dt: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscall/' + dt + '').toPromise();
    }
  }

  getlmscallsListbymonthwise(dt: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscall/' + dt + '').toPromise();
    }
  }


  getList_branchid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscall' + '/getList_branchid').toPromise();
  }

  getList_branchlocationid(branchid): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscall' + '/getList_branchlocationid/branchid').toPromise();
  }

  getList_leadid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscall' + '/getList_leadid').toPromise();
  }

  getList_opportunityid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscall' + '/getList_opportunityid').toPromise();
  }

  getList_callid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscall' + '/getList_callid').toPromise();
  }

  getList_campaignid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscall' + '/getList_campaignid').toPromise();
  }

  getList_leadby(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscall' + '/getList_leadby').toPromise();
  }

  getList_currentowner(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscall' + '/getList_currentowner').toPromise();
  }

  getList_activitytype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscall' + '/getList_activitytype/').toPromise();
  }

  getList_nextaction(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscall' + '/getList_nextaction/').toPromise();
  }


}

