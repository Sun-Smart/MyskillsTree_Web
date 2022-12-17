import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstapplicantsocialmediadetail } from '../model/mstapplicantsocialmediadetail.model';
import { environment } from '../../environments/environment';
import { ImstapplicantsocialmediadetailResponse } from '../model/mstapplicantsocialmediadetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class mstapplicantsocialmediadetailService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_mstapplicantsocialmediadetails(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/mstapplicantsocialmediadetail', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantsocialmediadetail' + '/getdefaultdata').toPromise();
    }
  }
  get_mstapplicantsocialmediadetails_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantsocialmediadetail').toPromise();
    }
  }
  getListBy_socialrefid(socialrefid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantsocialmediadetail' + '/socialrefid/' + socialrefid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantsocialmediadetail' + '/param/' + key).toPromise();
    }
  }


  get_mstapplicantsocialmediadetails_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantsocialmediadetail' + '/e/' + id).toPromise();
    }
  }
  get_mstapplicantsocialmediadetails_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantsocialmediadetail' + '/' + id).toPromise();
    }
  }

  get_mstapplicantsocialmediadetails_ByApplicantID(id: number): any {
    let appid=localStorage.getItem('applicantid');
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantsocialmediadetail' + '/applicantid/' + appid).toPromise();
    }
  }

  delete_mstapplicantsocialmediadetail(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/mstapplicantsocialmediadetail' + '/' + id).toPromise();
    }
  }

  getList_applicantid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantsocialmediadetail' + '/getList_applicantid').toPromise();
  }

  getList_socialmedianame(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantsocialmediadetail' + '/getList_socialmedianame/').toPromise();
  }


}

