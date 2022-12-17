import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstapplicantachievementdetail } from '../model/mstapplicantachievementdetail.model';
import { environment } from '../../environments/environment';
import { ImstapplicantachievementdetailResponse } from '../model/mstapplicantachievementdetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class mstapplicantachievementdetailService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_mstapplicantachievementdetails(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/mstapplicantachievementdetail', body);
    }
  }

  getDefaultData(): any {
    debugger
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantachievementdetail' + '/getdefaultdata').toPromise();
    }
  }
  get_mstapplicantachievementdetails_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantachievementdetail').toPromise();
    }
  }
  getListBy_achievementid(achievementid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantachievementdetail' + '/achievementid/' + achievementid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantachievementdetail' + '/param/' + key).toPromise();
    }
  }


  get_mstapplicantachievementdetails_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantachievementdetail' + '/e/' + id).toPromise();
    }
  }
  get_mstapplicantachievementdetails_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantachievementdetail' + '/' + id).toPromise();
    }
  }
  get_mstapplicantachievementdetails_ByApplicantID(id: number): any {
    let appid = localStorage.getItem('applicantid');
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantachievementdetail' + '/applicantid/' + appid).toPromise();
    }
  }

  delete_mstapplicantachievementdetail(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/mstapplicantachievementdetail' + '/' + id).toPromise();
    }
  }

  getList_applicantid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantachievementdetail' + '/getList_applicantid').toPromise();
  }

  getList_masterdataid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantachievementdetail' + '/getList_masterdataid/').toPromise();
  }

  getList_referenceacceptance(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantachievementdetail' + '/getList_referenceacceptance/').toPromise();
  }


}

