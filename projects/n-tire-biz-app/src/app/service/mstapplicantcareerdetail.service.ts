import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstapplicantcareerdetail } from '../model/mstapplicantcareerdetail.model';
import { environment } from '../../environments/environment';
import { ImstapplicantcareerdetailResponse } from '../model/mstapplicantcareerdetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class mstapplicantcareerdetailService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_mstapplicantcareerdetails(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/mstapplicantcareerdetail', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantcareerdetail' + '/getdefaultdata').toPromise();
    }
  }
  get_mstapplicantcareerdetails_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantcareerdetail').toPromise();
    }
  }
  getListBy_careerid(careerid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantcareerdetail' + '/careerid/' + careerid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantcareerdetail' + '/param/' + key).toPromise();
    }
  }


  get_mstapplicantcareerdetails_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantcareerdetail' + '/e/' + id).toPromise();
    }
  }
  get_mstapplicantcareerdetails_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantcareerdetail' + '/' + id).toPromise();
    }
  }
  

  get_mstapplicantcareerdetails_ByApplicantID(id: number): any {
    let appid = localStorage.getItem('applicantid');
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantcareerdetail'+ '/applicantid/' + appid).toPromise();
    }
  }

  delete_mstapplicantcareerdetail(id: number): any {
    debugger
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/mstapplicantcareerdetail' + '/' + id).toPromise();
    }
  }

  getList_applicantid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantcareerdetail' + '/getList_applicantid').toPromise();
  }

  getList_category(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantcareerdetail' + '/getList_category/').toPromise();
  }

  getList_skills(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantcareerdetail' + '/getList_skills').toPromise();
  }


}

