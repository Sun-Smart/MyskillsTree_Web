import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmscampaigntaskresponse } from '../model/lmscampaigntaskresponse.model';
import { environment } from '../../environments/environment';
import { IlmscampaigntaskresponseResponse } from '../model/lmscampaigntaskresponse.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmscampaigntaskresponseService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmscampaigntaskresponses(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmscampaigntaskresponse', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaigntaskresponse' + '/getdefaultdata').toPromise();
    }
  }
  get_lmscampaigntaskresponses_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaigntaskresponse').toPromise();
    }
  }
  getListBy_responseid(responseid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaigntaskresponse' + '/responseid/' + responseid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaigntaskresponse' + '/param/' + key).toPromise();
    }
  }


  get_lmscampaigntaskresponses_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaigntaskresponse' + '/e/' + id).toPromise();
    }
  }
  get_lmscampaigntaskresponses_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaigntaskresponse' + '/' + id).toPromise();
    }
  }

  delete_lmscampaigntaskresponse(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmscampaigntaskresponse' + '/' + id).toPromise();
    }
  }

  getList_campaigntype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaigntaskresponse' + '/getList_campaigntype/').toPromise();
  }


}

