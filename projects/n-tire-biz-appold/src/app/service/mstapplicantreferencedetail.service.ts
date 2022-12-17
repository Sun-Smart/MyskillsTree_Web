import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstapplicantreferencedetail } from '../model/mstapplicantreferencedetail.model';
import { environment } from '../../environments/environment';
import { ImstapplicantreferencedetailResponse } from '../model/mstapplicantreferencedetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class mstapplicantreferencedetailService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_mstapplicantreferencedetails(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/mstapplicantreferencedetail', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencedetail' + '/getdefaultdata').toPromise();
    }
  }
  get_mstapplicantreferencedetails_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencedetail').toPromise();
    }
  }
  getListBy_referenceid(referenceid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencedetail' + '/referenceid/' + referenceid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencedetail' + '/param/' + key).toPromise();
    }
  }


  get_mstapplicantreferencedetails_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencedetail' + '/e/' + id).toPromise();
    }
  }
  get_mstapplicantreferencedetails_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantreferencedetail' + '/' + id).toPromise();
    }
  }

  delete_mstapplicantreferencedetail(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/mstapplicantreferencedetail' + '/' + id).toPromise();
    }
  }

  getList_applicantid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantreferencedetail' + '/getList_applicantid').toPromise();
  }

  getList_referencetype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantreferencedetail' + '/getList_referencetype/').toPromise();
  }

  getList_referenceacceptance(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantreferencedetail' + '/getList_referenceacceptance/').toPromise();
  }


}

