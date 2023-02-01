import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstapplicantmaster } from '../model/mstapplicantmaster.model';
import { mstapplicantgeographypreference } from '../model/mstapplicantgeographypreference.model';
import { mstapplicantcareerdetail } from '../model/mstapplicantcareerdetail.model';
import { mstapplicantreferencedetail } from '../model/mstapplicantreferencedetail.model';
import { mstapplicantskilldetail } from '../model/mstapplicantskilldetail.model';
import { mstapplicantworkreference } from '../model/mstapplicantworkreference.model';
import { mstapplicantsocialmediadetail } from '../model/mstapplicantsocialmediadetail.model';
import { mstapplicantachievementdetail } from '../model/mstapplicantachievementdetail.model';
import { mstapplicantlanguagedetail } from '../model/mstapplicantlanguagedetail.model';
import { mstapplicanteducationdetail } from '../model/mstapplicanteducationdetail.model';
import { mstjobstatus } from '../model/mstjobstatus.model';
import { mstapplicantreferencerequest } from '../model/mstapplicantreferencerequest.model';
import { environment } from '../../environments/environment';
import { ImstapplicantmasterResponse } from '../model/mstapplicantmaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class mstapplicantmasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_mstapplicantmasters(formData, mstapplicantgeographypreferences, mstapplicantcareerdetails, mstapplicantreferencedetails, mstapplicantskilldetails, mstapplicantworkreferences, mstapplicantsocialmediadetails, mstapplicantachievementdetails, mstapplicantlanguagedetails, mstapplicanteducationdetails, mstjobstatuses, mstapplicantreferencerequests): any {
    debugger
    if (this.valid()) {
      var body = {
        ...formData,
        mstapplicantgeographypreferences: mstapplicantgeographypreferences.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        mstapplicantcareerdetails: mstapplicantcareerdetails.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        mstapplicantreferencedetails: mstapplicantreferencedetails.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        mstapplicantskilldetails: mstapplicantskilldetails.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        mstapplicantworkreferences: mstapplicantworkreferences.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        mstapplicantsocialmediadetails: mstapplicantsocialmediadetails.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        mstapplicantachievementdetails: mstapplicantachievementdetails.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        mstapplicantlanguagedetails: mstapplicantlanguagedetails.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        mstapplicanteducationdetails: mstapplicanteducationdetails.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        mstjobstatuses: mstjobstatuses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        mstapplicantreferencerequests: mstapplicantreferencerequests.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      debugger
      return this.http.post(AppConstants.ntirebizURL + '/mstapplicantmaster', body);
    }
  }

  //code added by dhanasekaran Mar-08
  saveOrUpdate_mstapplicantmastermains(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      debugger
      return this.http.post(AppConstants.ntirebizURL + '/mstapplicantmaster', body);
    }
  }


  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantmaster' + '/getdefaultdata').toPromise();
    }
  }

  get_corporateDashboardAll_details(id: any) {
    debugger
    return this.http.get(AppConstants.ntirebizURL + '/bodashboard/getcorporatedashboarddata/' + id).toPromise();
  }

  get_dashboardAll_details(body) {

    return this.http.get(AppConstants.ntirebizURL + '/bodashboard/getapplicantdashboarddata/' + body.applicantid + '/' + body.skillid).toPromise();

  }


  get_mstapplicantmasters_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantmaster').toPromise();
    }
  }
  getListBy_applicantid(applicantid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantmaster' + '/applicantid/' + applicantid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantmaster' + '/param/' + key).toPromise();
    }
  }

  get_mstapplicantmasters_ByEID(pkcol: any): any {
    // pkcol=localStorage.getItem('pkcol');
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantmaster' + '/e/' + pkcol).toPromise();
    }
  }
  // get_mstapplicantmasters_ByEID(applicantid: any): any {
  //   if (this.valid()) {
  //     return this.http.get(AppConstants.ntirebizURL + '/mstapplicantmaster' + '/e/' + applicantid).toPromise();
  //   }
  // }

  get_mstapplicantmasters_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantmaster' + '/' + id).toPromise();
    }
  }

  delete_mstapplicantmaster(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/mstapplicantmaster' + '/' + id).toPromise();
    }
  }

  getList_applicanttype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantmaster' + '/getList_applicanttype/').toPromise();
  }

  getList_gender(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantmaster' + '/getList_gender/').toPromise();
  }

  getList_country(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantmaster' + '/getList_country').toPromise();
  }

  getList_state(stateid): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantmaster' + '/getList_state/' + stateid).toPromise();
  }

  getList_city(cityid): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantmaster' + '/getList_city/' + cityid).toPromise();
  }

  get_profilecompletion() {
    return this.http.get(AppConstants.ntirebizURL + '/mstapplicantmaster/ALL/profilecompletion').toPromise();
  }
  get_profilecompletionsecond(id: number) {
    debugger
    return this.http.get(AppConstants.ntirebizURL + '/mstapplicantmaster/ALL/profilecompletion' + '/applicantid/' + id).toPromise();

  }
  //dhana mar-11
  // post release


  postRelease(releaseForm) {
    if (this.valid()) {
      var body = {
        ...releaseForm,
      };
      debugger
      return this.http.post(AppConstants.ntirebizURL + '/mstapplicantmaster/Releasestatus', body);
    }
  }


  release_method(obj: any): any {
    debugger
    return this.http.post(AppConstants.ntirebizURL + '/mstapplicantmaster/Releasestatus', obj)

  }

}

