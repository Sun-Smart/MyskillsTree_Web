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
  debugger
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
    debugger
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantreferencerequest' + '/getList_applicantid').toPromise();
  }

  getList_requestmasterdatatypeid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantreferencerequest' + '/getList_requestmasterdatatypeid/').toPromise();
  }

  getList_referenceacceptance(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantreferencerequest' + '/getList_referenceacceptance/').toPromise();
  }




  //mstapplicant reference request accepted service method

  saveOrUpdate_mstapplicantreferencerequestsaccepted(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/mstapplicantreferencerequestaccepted', body);
    }
  }

  getDefaultDataaccepted(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequestaccepted' + '/getdefaultdata');
    }
  }
  get_mstapplicantreferencerequests_Listaccepted(): any {
    debugger
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequestaccepted');
    }
  }
  getListBy_requestidaccepted(requestid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequestaccepted' + '/requestid/' + requestid);
    }
  }

  getListaccepted(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequestaccepted' + '/param/' + key);
    }
  }


  get_mstapplicantreferencerequests_ByEIDaccepted(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequestaccepted' + '/e/' + id);
    }
  }
  get_mstapplicantreferencerequests_ByIDaccepted(id: number): any {
    // let pkcol = localStorage.getItem('pkcol')
    if (this.valid()) {
      // return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequest' + '/' + id);
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequestaccepted' + '/' + id);
    }
  }
  get_mstapplicantreferencerequests_ByApplicantIDaccepted(id: number): any {
    let appid = localStorage.getItem('applicantid');
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencerequestaccepted'  + '/applicantid/' + appid);
    }
  }

get_mstapplicantworkreference_ByApplicantIDaccepted(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantworkreference'  + '/applicantid/' + id);
    }
  }
  delete_mstapplicantreferencerequestaccepted(id: number): any {
    debugger;
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/mstapplicantworkreference' + '/' + id);
    }
  }

  getList_applicantidaccepted(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantreferencerequestaccepted' + '/getList_applicantid');
  }

  getList_requestmasterdatatypeidaccepted(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantreferencerequestaccepted' + '/getList_requestmasterdatatypeid/');
  }

  getList_referenceacceptanceaccepted(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantreferencerequestaccepted' + '/getList_referenceacceptance/');
  }


}

