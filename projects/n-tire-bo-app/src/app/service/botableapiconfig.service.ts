import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { botableapiconfig } from '../model/botableapiconfig.model';
import { environment } from '../../environments/environment';
import { IbotableapiconfigResponse } from '../model/botableapiconfig.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class botableapiconfigService {
  SessionUser = { companyid: 0, userid: 0, usercode: '', username: '', language: '' };
  formData: botableapiconfig;
  readonly rootURL = AppConstants.ntireboURL;
  list: botableapiconfig[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    var sessionuser = JSON.parse(this.sessionService.getItem("currentUser"));
    if (sessionuser != null) {
      this.SessionUser = sessionuser;
      return true;
    }
    return false;

  }
  saveOrUpdatebotableapiconfigs() {
    {
      var body = {
        ...this.formData,
        SessionUser: this.SessionUser
      };
      return this.http.post(AppConstants.ntireboURL + '/botableapiconfig', body);
    }
  }

  saveOrUpdatebotableapiconfigsList() {
    {
      var body = {
        ...this.list,
        SessionUser: this.SessionUser
      };
      return this.http.post(AppConstants.ntireboURL + '/botableapiconfig', body);
    }
  }

  getbotableapiconfigsList() {
    {
      return this.http.get(AppConstants.ntireboURL + '/botableapiconfig').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntireboURL + '/botableapiconfig' + '/param/' + key).toPromise();
    }
  }

  getbotableapiconfigsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntireboURL + '/botableapiconfig' + '/' + id).toPromise();
    }
  }

  deletebotableapiconfig(id: number) {
    {
      return this.http.delete(AppConstants.ntireboURL + '/botableapiconfig' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntireboURL + '/botableapiconfig')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }

}

