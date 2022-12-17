import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmscampaignmaster } from '../model/lmscampaignmaster.model';
import { lmscampaigntask } from '../model/lmscampaigntask.model';
import { lmscampaignlocation } from '../model/lmscampaignlocation.model';
import { lmspost } from '../model/lmspost.model';
import { lmscampaignnoaccess } from '../model/lmscampaignnoaccess.model';
import { environment } from '../../environments/environment';
import { IlmscampaignmasterResponse } from '../model/lmscampaignmaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmscampaignmasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmscampaignmasters(formData, lmscampaigntasks, lmscampaignlocations, lmsposts, lmscampaignnoaccesses, Insertlmscampaignnoaccesses,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        lmscampaigntasks: lmscampaigntasks.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        lmscampaignlocations: lmscampaignlocations.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        lmsposts: lmsposts.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        lmscampaignnoaccesses: Insertlmscampaignnoaccesses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmscampaignmaster', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaignmaster' + '/getdefaultdata').toPromise();
    }
  }
  get_lmscampaignmasters_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaignmaster').toPromise();
    }
  }
  getListBy_campaignid(campaignid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaignmaster' + '/campaignid/' + campaignid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaignmaster' + '/param/' + key).toPromise();
    }
  }


  get_lmscampaignmasters_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaignmaster' + '/e/' + id).toPromise();
    }
  }
  get_lmscampaignmasters_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaignmaster' + '/' + id).toPromise();
    }
  }

  delete_lmscampaignmaster(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmscampaignmaster' + '/' + id).toPromise();
    }
  }

  getList_productid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_productid').toPromise();
  }

  getList_campaigntype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_campaigntype/').toPromise();
  }

  getList_territory(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_territory/').toPromise();
  }

  getList_priority(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_priority/').toPromise();
  }

  getList_businessgoal(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_businessgoal/').toPromise();
  }

  getList_targetmarket(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_targetmarket/').toPromise();
  }

  getList_targetaudience(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_targetaudience/').toPromise();
  }

  getList_targetindustry(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_targetindustry/').toPromise();
  }

  getList_strategy(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_strategy/').toPromise();
  }

  getList_targettype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_targettype/').toPromise();
  }

  getList_expectedofferaction(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_expectedofferaction/').toPromise();
  }

  getList_performancestatus(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_performancestatus/').toPromise();
  }

  getList_campaignstatus(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_campaignstatus/').toPromise();
  }



}

