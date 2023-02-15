import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstapplicantworkreference } from '../model/mstapplicantworkreference.model';
import { environment } from '../../environments/environment';
import { ImstapplicantworkreferenceResponse } from '../model/mstapplicantworkreference.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class mstapplicantworkreferenceService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_mstapplicantworkreferences(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/mstapplicantworkreference', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantworkreference' + '/getdefaultdata').toPromise();
    }
  }
  get_mstapplicantworkreferences_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantworkreference').toPromise();
    }
  }

  get_mstapplicantworkreferences_companyList(id:any){
    id = localStorage.getItem('applicantid');
    debugger;
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantworkreference' + '/companydetails/' + id).toPromise();
    }
  }
  getListBy_workreferenceid(workreferenceid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantworkreference' + '/workreferenceid/' + workreferenceid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantworkreference' + '/param/' + key).toPromise();
    }
  }


  get_mstapplicantworkreferences_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantworkreference' + '/e/' + id).toPromise();
    }
  }
  get_mstapplicantworkreferences_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantworkreference' + '/' + id).toPromise();
    }
  }
  get_mstapplicantworkreferences_ByApplicantID(id: number): any {
    // let appid= localStorage.getItem('applicantid');
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantworkreference' + '/applicantid/' + id).toPromise();
    }
  }

  delete_mstapplicantworkreference(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/mstapplicantworkreference' + '/' + id).toPromise();
    }
  }

  getList_applicantid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantworkreference' + '/getList_applicantid').toPromise();
  }


}

