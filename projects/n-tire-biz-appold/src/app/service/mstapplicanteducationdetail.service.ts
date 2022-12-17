import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstapplicanteducationdetail } from '../model/mstapplicanteducationdetail.model';
import { environment } from '../../environments/environment';
import { ImstapplicanteducationdetailResponse } from '../model/mstapplicanteducationdetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class mstapplicanteducationdetailService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_mstapplicanteducationdetails(formData): any {
    debugger
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/mstapplicanteducationdetail', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicanteducationdetail/getdefaultdata').toPromise();
    }
  }
  get_mstapplicanteducationdetails_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicanteducationdetail').toPromise();
    }
  }
  getListBy_educationid(educationid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicanteducationdetail/educationid/' + educationid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicanteducationdetail/param/' + key).toPromise();
    }
  }


  get_mstapplicanteducationdetails_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicanteducationdetail/e/' + id).toPromise();
    }
  }
  get_mstapplicanteducationdetails_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicanteducationdetail/' + id).toPromise();
    }
  }

  get_mstapplicanteducationdetails_ByApplicantID(id: any): any {
    let appid = localStorage.getItem('applicantid');
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicanteducationdetail' + '/applicantid/' + appid).toPromise();
    }
  }

  delete_mstapplicanteducationdetail(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/mstapplicanteducationdetail' + '/' + id).toPromise();
    }
  }

  getList_applicantid(): any {
    return this.http.get(AppConstants.ntirebizURL + '/mstapplicanteducationdetail/getList_applicantid').toPromise();
  }

  getList_educationcategory(): any {
    return this.http.get(AppConstants.ntirebizURL + '/mstapplicanteducationdetail/getList_educationcategory').toPromise();
  }

  getList_educationsubcategory(categoryid): any {
    return this.http.get(AppConstants.ntirebizURL + '/mstapplicanteducationdetail/getList_educationsubcategory/' + categoryid).toPromise();
  }

  getList_referenceacceptance(): any {
    return this.http.get(AppConstants.ntirebizURL + '/mstapplicanteducationdetail/getList_referenceacceptance').toPromise();
  }


}

