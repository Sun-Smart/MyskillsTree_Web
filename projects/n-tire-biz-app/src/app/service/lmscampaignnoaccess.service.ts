import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmscampaignnoaccess } from '../model/lmscampaignnoaccess.model';
import { environment } from '../../environments/environment';
import { IlmscampaignnoaccessResponse } from '../model/lmscampaignnoaccess.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmscampaignnoaccessService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmscampaignnoaccesses(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmscampaignnoaccess', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaignnoaccess' + '/getdefaultdata').toPromise();
    }
  }
  get_lmscampaignnoaccesses_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaignnoaccess').toPromise();
    }
  }
  getListBy_accessid(accessid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaignnoaccess' + '/accessid/' + accessid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaignnoaccess' + '/param/' + key).toPromise();
    }
  }


  get_lmscampaignnoaccesses_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaignnoaccess' + '/e/' + id).toPromise();
    }
  }
  get_lmscampaignnoaccesses_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscampaignnoaccess' + '/' + id).toPromise();
    }
  }

  delete_lmscampaignnoaccess(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmscampaignnoaccess' + '/' + id).toPromise();
    }
  }


}

