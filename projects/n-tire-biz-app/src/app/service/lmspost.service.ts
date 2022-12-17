import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmspost } from '../model/lmspost.model';
import { environment } from '../../environments/environment';
import { IlmspostResponse } from '../model/lmspost.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmspostService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmsposts(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmspost', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmspost' + '/getdefaultdata').toPromise();
    }
  }
  get_lmsposts_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmspost').toPromise();
    }
  }
  getListBy_postid(postid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmspost' + '/postid/' + postid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmspost' + '/param/' + key).toPromise();
    }
  }


  get_lmsposts_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmspost' + '/e/' + id).toPromise();
    }
  }
  get_lmsposts_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmspost' + '/' + id).toPromise();
    }
  }

  delete_lmspost(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmspost' + '/' + id).toPromise();
    }
  }

  getList_userid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmspost' + '/getList_userid').toPromise();
  }

  getList_campaigntype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmspost' + '/getList_campaigntype/').toPromise();
  }

  getList_campaignstatus(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmspost' + '/getList_campaignstatus/').toPromise();
  }


}

