import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmscampaignlocation } from '../model/lmscampaignlocation.model';
import { environment } from '../../environments/environment';
import { IlmscampaignlocationResponse } from '../model/lmscampaignlocation.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmscampaignlocationService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmscampaignlocations(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmscampaignlocation', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaignlocation' + '/getdefaultdata').toPromise();
    }
  }
  get_lmscampaignlocations_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaignlocation').toPromise();
    }
  }
  getListBy_locationid(locationid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaignlocation' + '/locationid/' + locationid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaignlocation' + '/param/' + key).toPromise();
    }
  }


  get_lmscampaignlocations_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaignlocation' + '/e/' + id).toPromise();
    }
  }
  get_lmscampaignlocations_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaignlocation' + '/' + id).toPromise();
    }
  }

  delete_lmscampaignlocation(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmscampaignlocation' + '/' + id).toPromise();
    }
  }

  getList_locationid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignlocation' + '/getList_locationid').toPromise();
  }

  getList_responsibilityid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignlocation' + '/getList_responsibilityid').toPromise();
  }


}

