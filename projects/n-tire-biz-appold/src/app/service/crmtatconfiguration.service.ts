import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crmtatconfiguration } from '../model/crmtatconfiguration.model';
import { environment } from '../../environments/environment';
import { IcrmtatconfigurationResponse } from '../model/crmtatconfiguration.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class crmtatconfigurationService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_crmtatconfigurations(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/crmtatconfiguration', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmtatconfiguration' + '/getdefaultdata').toPromise();
    }
  }
  get_crmtatconfigurations_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmtatconfiguration').toPromise();
    }
  }
  getListBy_configid(configid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmtatconfiguration' + '/configid/' + configid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmtatconfiguration' + '/param/' + key).toPromise();
    }
  }


  get_crmtatconfigurations_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmtatconfiguration' + '/e/' + id).toPromise();
    }
  }
  get_crmtatconfigurations_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmtatconfiguration' + '/' + id).toPromise();
    }
  }

  delete_crmtatconfiguration(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/crmtatconfiguration' + '/' + id).toPromise();
    }
  }

  getList_parentindex(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmtatconfiguration' + '/getList_parentindex').toPromise();
  }

  getList_sub1index(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmtatconfiguration' + '/getList_sub1index').toPromise();
  }

  getList_sub2index(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmtatconfiguration' + '/getList_sub2index').toPromise();
  }

  getList_sub3index(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmtatconfiguration' + '/getList_sub3index').toPromise();
  }

  getList_criticality(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmtatconfiguration' + '/getList_criticality/').toPromise();
  }

  getList_source(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmtatconfiguration' + '/getList_source/').toPromise();
  }


}

