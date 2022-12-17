import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmscampaigntask } from '../model/lmscampaigntask.model';
import { lmscampaigntaskresponse } from '../model/lmscampaigntaskresponse.model';
import { environment } from '../../environments/environment';
import { IlmscampaigntaskResponse } from '../model/lmscampaigntask.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmscampaigntaskService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmscampaigntasks(formData, lmscampaigntaskresponses,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        lmscampaigntaskresponses: lmscampaigntaskresponses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmscampaigntask', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaigntask' + '/getdefaultdata').toPromise();
    }
  }
  get_lmscampaigntasks_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaigntask').toPromise();
    }
  }
  getListBy_taskid(taskid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaigntask' + '/taskid/' + taskid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaigntask' + '/param/' + key).toPromise();
    }
  }


  get_lmscampaigntasks_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaigntask' + '/e/' + id).toPromise();
    }
  }
  get_lmscampaigntasks_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaigntask' + '/' + id).toPromise();
    }
  }

  delete_lmscampaigntask(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmscampaigntask' + '/' + id).toPromise();
    }
  }

  getList_productid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaigntask' + '/getList_productid').toPromise();
  }

  getList_campaignid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaigntask' + '/getList_campaignid').toPromise();
  }

  getList_campaigntype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaigntask' + '/getList_campaigntype/').toPromise();
  }

  getList_targettype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaigntask' + '/getList_targettype/').toPromise();
  }

  getList_priority(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaigntask' + '/getList_priority/').toPromise();
  }

  getList_performancestatus(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaigntask' + '/getList_performancestatus/').toPromise();
  }


}

