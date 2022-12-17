import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmstargetuserlevel } from '../model/lmstargetuserlevel.model';
import { environment } from '../../environments/environment';
import { IlmstargetuserlevelResponse } from '../model/lmstargetuserlevel.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmstargetuserlevelService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmstargetuserlevels(formData, Deleted_lmstargetuserlevel_IDs): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmstargetuserlevel', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstargetuserlevel' + '/getdefaultdata').toPromise();
    }
  }
  get_lmstargetuserlevels_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstargetuserlevel').toPromise();
    }
  }
  getListBy_targetid(targetid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstargetuserlevel' + '/targetid/' + targetid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstargetuserlevel' + '/param/' + key).toPromise();
    }
  }


  get_lmstargetuserlevels_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstargetuserlevel' + '/e/' + id).toPromise();
    }
  }
  get_lmstargetuserlevels_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstargetuserlevel' + '/' + id).toPromise();
    }
  }

  delete_lmstargetuserlevel(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmstargetuserlevel' + '/' + id).toPromise();
    }
  }

  getList_branchid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetuserlevel' + '/getList_branchid').toPromise();
  }

  getList_userid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetuserlevel' + '/getList_userid').toPromise();
  }

  getList_term(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetuserlevel' + '/getList_term/').toPromise();
  }

  getList_productgroupid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetuserlevel' + '/getList_productgroupid/').toPromise();
  }

  getList_performancestatus(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetuserlevel' + '/getList_performancestatus/').toPromise();
  }


}

