import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstapplicantreferencerequestaccepted } from '../model/mstapplicantreferencerequestaccepted.model';
import { environment } from '../../environments/environment';
// import { mstapplicantreferencerequestaccepted } from '../model/mstapplicantreferencerequestaccepted.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class mstapplicantreferencerequestsacceptedService {
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
      return this.http.post(AppConstants.ntirebizURL + '/mstapplicantreferencerequestaccepted', body);
    }
  }

  getDefaultData(): any {
    console.log("getDefaultData")
    return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequestaccepted' + '/getdefaultdata');
  }
  get_mstapplicantreferencerequests_List(): any {
    debugger
    // if (this.valid()) {
    return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequestaccepted');
    // }
  }
  getListBy_requestid(requestid: number): any {
    // if (this.valid()) {
    return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequestaccepted' + '/requestid/' + requestid);
    // }
  }

  getList(key: string): any {
    // if (this.valid()) {
    return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequestaccepted' + '/param/' + key);
    // }
  }


  get_mstapplicantreferencerequests_ByEID(id: any): any {
    // if (this.valid()) {
    return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequestaccepted' + '/e/' + id);
    // }
  }
  get_mstapplicantreferencerequests_ByID(id: number): any {
    // let pkcol = localStorage.getItem('pkcol')
    // if (this.valid()) {
    // return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequest' + '/' + id).toPromise();
    return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequestaccepted' + '/' + id);
    // }
  }
  get_mstapplicantreferencerequests_ByApplicantID(id: number): any {
    let appid = localStorage.getItem('applicantid');
    // if (this.valid()) {
    return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequestaccepted' + '/applicantid/' + appid);
    // }
  }

  get_mstapplicantworkreference_ByApplicantID(id: number): any {
    // if (this.valid()) {
    return this.http.get(AppConstants.ntirebizURL + '/mstapplicantworkreference' + '/applicantid/' + id);
    // }
  }
  delete_mstapplicantreferencerequest(id: number): any {
    debugger;
    // if (this.valid()) {
    return this.http.delete(AppConstants.ntirebizURL + '/mstapplicantworkreference' + '/' + id);
    // }
  }

  getList_applicantid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantreferencerequestaccepted' + '/getList_applicantid');
  }

  getList_requestmasterdatatypeid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantreferencerequestaccepted' + '/getList_requestmasterdatatypeid/');
  }

  getList_referenceacceptance(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantreferencerequestaccepted' + '/getList_referenceacceptance/');
  }


}

