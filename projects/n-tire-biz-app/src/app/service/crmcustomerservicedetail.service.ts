import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crmcustomerservicedetail } from '../model/crmcustomerservicedetail.model';
import { environment } from '../../environments/environment';
import { IcrmcustomerservicedetailResponse } from '../model/crmcustomerservicedetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class crmcustomerservicedetailService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_crmcustomerservicedetails(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/crmcustomerservicedetail', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomerservicedetail' + '/getdefaultdata').toPromise();
    }
  }
  get_crmcustomerservicedetails_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomerservicedetail').toPromise();
    }
  }
  getListBy_detailid(detailid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomerservicedetail' + '/detailid/' + detailid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomerservicedetail' + '/param/' + key).toPromise();
    }
  }


  get_crmcustomerservicedetails_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomerservicedetail' + '/e/' + id).toPromise();
    }
  }
  get_crmcustomerservicedetails_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomerservicedetail' + '/' + id).toPromise();
    }
  }

  delete_crmcustomerservicedetail(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/crmcustomerservicedetail' + '/' + id).toPromise();
    }
  }


}

