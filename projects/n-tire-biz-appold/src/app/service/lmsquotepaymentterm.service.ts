import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsquotepaymentterm } from '../model/lmsquotepaymentterm.model';
import { environment } from '../../environments/environment';
import { IlmsquotepaymenttermResponse } from '../model/lmsquotepaymentterm.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsquotepaymenttermService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmsquotepaymentterms(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmsquotepaymentterm', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsquotepaymentterm' + '/getdefaultdata').toPromise();
    }
  }
  get_lmsquotepaymentterms_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsquotepaymentterm').toPromise();
    }
  }
  getListBy_paymenttermid(paymenttermid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsquotepaymentterm' + '/paymenttermid/' + paymenttermid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsquotepaymentterm' + '/param/' + key).toPromise();
    }
  }


  get_lmsquotepaymentterms_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsquotepaymentterm' + '/e/' + id).toPromise();
    }
  }
  get_lmsquotepaymentterms_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsquotepaymentterm' + '/' + id).toPromise();
    }
  }

  delete_lmsquotepaymentterm(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmsquotepaymentterm' + '/' + id).toPromise();
    }
  }

  getList_opportunityid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquotepaymentterm' + '/getList_opportunityid').toPromise();
  }

  getList_quoteid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquotepaymentterm' + '/getList_quoteid').toPromise();
  }

  getList_duedate(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquotepaymentterm' + '/getList_duedate/').toPromise();
  }


}

