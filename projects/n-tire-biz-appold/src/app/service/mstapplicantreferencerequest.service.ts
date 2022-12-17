import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstapplicantreferencerequest } from '../model/mstapplicantreferencerequest.model';
import { environment } from '../../environments/environment';
import { ImstapplicantreferencerequestResponse } from '../model/mstapplicantreferencerequest.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class mstapplicantreferencerequestService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_mstapplicantreferencerequests(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/mstapplicantreferencerequest', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequest' + '/getdefaultdata').toPromise();
    }
  }
  get_mstapplicantreferencerequests_List(): any {
    debugger
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequest').toPromise();
    }
  }
  getListBy_requestid(requestid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequest' + '/requestid/' + requestid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequest' + '/param/' + key).toPromise();
    }
  }


  get_mstapplicantreferencerequests_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequest' + '/e/' + id).toPromise();
    }
  }
  get_mstapplicantreferencerequests_ByID(id: number): any {
    // let pkcol = localStorage.getItem('pkcol')
    if (this.valid()) {
      // return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequest' + '/' + id).toPromise();
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequest' + '/' + id).toPromise();
    }
  }
  get_mstapplicantreferencerequests_ByApplicantID(id: number): any {
    let appid = localStorage.getItem('applicantid');
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequest'  + '/applicantid/' + appid).toPromise();
    }
  }

get_mstapplicantworkreference_ByApplicantID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantworkreference'  + '/applicantid/' + id).toPromise();
    }
  }
  delete_mstapplicantreferencerequest(id: number): any {
    debugger;
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/mstapplicantworkreference' + '/' + id).toPromise();
    }
  }

  getList_applicantid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantreferencerequest' + '/getList_applicantid').toPromise();
  }

  getList_requestmasterdatatypeid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantreferencerequest' + '/getList_requestmasterdatatypeid/').toPromise();
  }

  getList_referenceacceptance(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantreferencerequest' + '/getList_referenceacceptance/').toPromise();
  }


}

