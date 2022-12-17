import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmshistory } from '../model/lmshistory.model';
import { environment } from '../../environments/environment';
import { IlmshistoryResponse } from '../model/lmshistory.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmshistoryService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmshistories(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmshistory', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmshistory' + '/getdefaultdata').toPromise();
    }
  }
  get_lmshistories_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmshistory').toPromise();
    }
  }
  getListBy_historyid(historyid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmshistory' + '/historyid/' + historyid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmshistory' + '/param/' + key).toPromise();
    }
  }


  get_lmshistories_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmshistory' + '/e/' + id).toPromise();
    }
  }
  get_lmshistories_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmshistory' + '/' + id).toPromise();
    }
  }

  delete_lmshistory(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmshistory' + '/' + id).toPromise();
    }
  }

  getList_branchid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmshistory' + '/getList_branchid').toPromise();
  }

  getList_branchlocationid(branchid): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmshistory' + '/getList_branchlocationid/branchid').toPromise();
  }

  getList_leadid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmshistory' + '/getList_leadid').toPromise();
  }

  getList_opportunityid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmshistory' + '/getList_opportunityid').toPromise();
  }

  getList_callid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmshistory' + '/getList_callid').toPromise();
  }

  getList_productid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmshistory' + '/getList_productid').toPromise();
  }

  getList_campaignid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmshistory' + '/getList_campaignid').toPromise();
  }

  getList_leadby(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmshistory' + '/getList_leadby').toPromise();
  }

  getList_leadresponse(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmshistory' + '/getList_leadresponse/').toPromise();
  }

  getList_nextaction(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmshistory' + '/getList_nextaction/').toPromise();
  }

  getList_leadsource(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmshistory' + '/getList_leadsource/').toPromise();
  }

  getList_leadstage(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmshistory' + '/getList_leadstage/').toPromise();
  }

  getList_criticality(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmshistory' + '/getList_criticality/').toPromise();
  }


}

