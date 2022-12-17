import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crmcustomerservice } from '../model/crmcustomerservice.model';
import { crmcustomerservicedetail } from '../model/crmcustomerservicedetail.model';
import { environment } from '../../environments/environment';
import { IcrmcustomerserviceResponse } from '../model/crmcustomerservice.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class crmcustomerserviceService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_crmcustomerservices(formData, crmcustomerservicedetails,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        crmcustomerservicedetails: crmcustomerservicedetails.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/crmcustomerservice', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomerservice' + '/getdefaultdata').toPromise();
    }
  }
  get_crmcustomerservices_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomerservice').toPromise();
    }
  }
  getListBy_serviceid(serviceid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomerservice' + '/serviceid/' + serviceid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomerservice' + '/param/' + key).toPromise();
    }
  }


  get_crmcustomerservices_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomerservice' + '/e/' + id).toPromise();
    }
  }
  get_crmcustomerservices_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomerservice' + '/' + id).toPromise();
    }
  }

  delete_crmcustomerservice(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/crmcustomerservice' + '/' + id).toPromise();
    }
  }

  getList_customerid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomerservice' + '/getList_customerid').toPromise();
  }

  getList_servicetype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomerservice' + '/getList_servicetype/').toPromise();
  }

  getList_userid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomerservice' + '/getList_userid').toPromise();
  }


}

