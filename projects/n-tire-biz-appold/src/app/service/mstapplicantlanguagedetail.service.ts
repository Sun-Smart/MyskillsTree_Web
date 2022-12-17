import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstapplicantlanguagedetail } from '../model/mstapplicantlanguagedetail.model';
import { environment } from '../../environments/environment';
import { ImstapplicantlanguagedetailResponse } from '../model/mstapplicantlanguagedetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class mstapplicantlanguagedetailService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_mstapplicantlanguagedetails(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/mstapplicantlanguagedetail', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantlanguagedetail' + '/getdefaultdata').toPromise();
    }
  }
  get_mstapplicantlanguagedetails_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantlanguagedetail').toPromise();
    }
  }
  getListBy_languageid(languageid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantlanguagedetail' + '/languageid/' + languageid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantlanguagedetail' + '/param/' + key).toPromise();
    }
  }


  get_mstapplicantlanguagedetails_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantlanguagedetail' + '/e/' + id).toPromise();
    }
  }
  get_mstapplicantlanguagedetails_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantlanguagedetail' + '/' + id).toPromise();
    }
  }

  
  get_mstapplicantlanguagedetails_ByApplicantID(id: number): any {
    let appid=localStorage.getItem('applicantid');
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantlanguagedetail'+ '/applicantid/' + appid).toPromise();
    }
  }
  delete_mstapplicantlanguagedetail(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/mstapplicantlanguagedetail' + '/' + id).toPromise();
    }
  }

  getList_applicantid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantlanguagedetail' + '/getList_applicantid').toPromise();
  }

  getList_language(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantlanguagedetail' + '/getList_language/').toPromise();
  }


}

