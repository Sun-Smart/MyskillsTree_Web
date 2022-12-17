import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmstargetbranchlevel } from '../model/lmstargetbranchlevel.model';
import { environment } from '../../environments/environment';
import { IlmstargetbranchlevelResponse } from '../model/lmstargetbranchlevel.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmstargetbranchlevelService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmstargetbranchlevels(formData, Deleted_lmstargetbranchlevel_IDs): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmstargetbranchlevel', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstargetbranchlevel' + '/getdefaultdata').toPromise();
    }
  }
  get_lmstargetbranchlevels_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstargetbranchlevel').toPromise();
    }
  }
  getListBy_targetid(targetid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstargetbranchlevel' + '/targetid/' + targetid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstargetbranchlevel' + '/param/' + key).toPromise();
    }
  }


  get_lmstargetbranchlevels_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstargetbranchlevel' + '/e/' + id).toPromise();
    }
  }
  get_lmstargetbranchlevels_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstargetbranchlevel' + '/' + id).toPromise();
    }
  }

  delete_lmstargetbranchlevel(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmstargetbranchlevel' + '/' + id).toPromise();
    }
  }

  getList_branchid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetbranchlevel' + '/getList_branchid').toPromise();
  }

  getList_term(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetbranchlevel' + '/getList_term/').toPromise();
  }

  getList_productgroupid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetbranchlevel' + '/getList_productgroupid/').toPromise();
  }

  getList_performancestatus(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetbranchlevel' + '/getList_performancestatus/').toPromise();
  }


}

