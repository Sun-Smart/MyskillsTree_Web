import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstapplicantgeographypreference } from '../model/mstapplicantgeographypreference.model';
import { environment } from '../../environments/environment';
import { ImstapplicantgeographypreferenceResponse } from '../model/mstapplicantgeographypreference.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class mstapplicantgeographypreferenceService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_mstapplicantgeographypreferences(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/mstapplicantgeographypreference', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantgeographypreference/getdefaultdata').toPromise();
    }
  }
  get_mstapplicantgeographypreferences_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantgeographypreference').toPromise();
    }
  }
  getListBy_geographypreferenceid(geographypreferenceid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantgeographypreference/geographypreferenceid/' + geographypreferenceid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantgeographypreference/param/' + key).toPromise();
    }
  }


  get_mstapplicantgeographypreferences_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantgeographypreference/e/' + id).toPromise();
    }
  }
  get_mstapplicantgeographypreferences_ByID(id: number): any {
    debugger
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantgeographypreference/'+id).toPromise();
    }
  }
  get_mstapplicantgeographypreferences_ByApplicantID(id: number): any {
    let appid = localStorage.getItem('applicantid');
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantgeographypreference' + '/applicantid/' + appid).toPromise();
    }
  }

  delete_mstapplicantgeographypreference(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/mstapplicantgeographypreference/' + id).toPromise();
    }
  }

  getList_applicantid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantgeographypreference/getList_applicantid').toPromise();
  }

  getList_country(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantgeographypreference/getList_country').toPromise();
  }

  getList_city(countryid): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantgeographypreference/getList_city1/' + countryid).toPromise();
  }
  //  getList_city(): any {
  //   return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantgeographypreference/getList_city').toPromise();
  // }


}

