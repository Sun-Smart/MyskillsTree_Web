import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { botablemasterdetailmap } from '../model/botablemasterdetailmap.model';
import { environment } from '../../environments/environment';
import { IbotablemasterdetailmapResponse } from '../model/botablemasterdetailmap.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class botablemasterdetailmapService {
  SessionUser = { companyid: 0, userid: 0, usercode: '', username: '', language: '' };
  formData: botablemasterdetailmap;
  readonly rootURL = AppConstants.ntireboURL;
  list: botablemasterdetailmap[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    var sessionuser = JSON.parse(this.sessionService.getItem("currentUser"));
    if (sessionuser != null) {
      this.SessionUser = sessionuser;
      return true;
    }
    return false;

  }
  saveOrUpdatebotablemasterdetailmaps() {
    {
      var body = {
        ...this.formData,
        SessionUser: this.SessionUser
      };
      return this.http.post(AppConstants.ntireboURL + '/botablemasterdetailmap', body);
    }
  }

  saveOrUpdatebotablemasterdetailmapsList() {
    {
      var body = {
        ...this.list,
        SessionUser: this.SessionUser
      };
      return this.http.post(AppConstants.ntireboURL + '/botablemasterdetailmap', body);
    }
  }

  getbotablemasterdetailmapsList() {
    {
      return this.http.get(AppConstants.ntireboURL + '/botablemasterdetailmap').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntireboURL + '/botablemasterdetailmap' + '/param/' + key).toPromise();
    }
  }

  getbotablemasterdetailmapsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntireboURL + '/botablemasterdetailmap' + '/' + id).toPromise();
    }
  }

  deletebotablemasterdetailmap(id: number) {
    {
      return this.http.delete(AppConstants.ntireboURL + '/botablemasterdetailmap' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntireboURL + '/botablemasterdetailmap')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }

}

