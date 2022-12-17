import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bocompanysetting } from '../model/bocompanysetting.model';
import { environment } from '../../environments/environment';
import { IbocompanysettingResponse } from '../model/bocompanysetting.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bocompanysettingService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bocompanysettings(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/bocompanysetting', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanysetting' + '/getdefaultdata').toPromise();
    }
  }
  get_bocompanysettings_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanysetting').toPromise();
    }
  }
  getListBy_settingsid(settingsid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanysetting' + '/settingsid/' + settingsid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanysetting' + '/param/' + key).toPromise();
    }
  }


  get_bocompanysettings_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanysetting' + '/e/' + id).toPromise();
    }
  }
  get_bocompanysettings_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanysetting' + '/' + id).toPromise();
    }
  }

  delete_bocompanysetting(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bocompanysetting' + '/' + id).toPromise();
    }
  }

  getList_adminroleid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bocompanysetting' + '/getList_adminroleid').toPromise();
  }


}

