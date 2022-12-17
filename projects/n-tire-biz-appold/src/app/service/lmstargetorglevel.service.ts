import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmstargetorglevel } from '../model/lmstargetorglevel.model';
import { environment } from '../../environments/environment';
import { IlmstargetorglevelResponse } from '../model/lmstargetorglevel.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmstargetorglevelService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmstargetorglevels(formData, Deleted_lmstargetorglevel_IDs): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmstargetorglevel', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstargetorglevel' + '/getdefaultdata').toPromise();
    }
  }
  get_lmstargetorglevels_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstargetorglevel').toPromise();
    }
  }
  getListBy_targetid(targetid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstargetorglevel' + '/targetid/' + targetid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstargetorglevel' + '/param/' + key).toPromise();
    }
  }


  get_lmstargetorglevels_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstargetorglevel' + '/e/' + id).toPromise();
    }
  }
  get_lmstargetorglevels_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstargetorglevel' + '/' + id).toPromise();
    }
  }

  delete_lmstargetorglevel(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmstargetorglevel' + '/' + id).toPromise();
    }
  }

  getList_term(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetorglevel' + '/getList_term/').toPromise();
  }

  getList_productgroupid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetorglevel' + '/getList_productgroupid/').toPromise();
  }

  getList_performancestatus(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetorglevel' + '/getList_performancestatus/').toPromise();
  }


}

