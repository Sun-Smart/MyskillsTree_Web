import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boworkflowhistory } from '../model/boworkflowhistory.model';
import { environment } from '../../environments/environment';
import { IboworkflowhistoryResponse } from '../model/boworkflowhistory.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boworkflowhistoryService {
  SessionUser = { companyid: 0, userid: 0, usercode: '', username: '', language: '' };
  formData: boworkflowhistory;
  readonly rootURL = AppConstants.ntireboURL;
  list: boworkflowhistory[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    var sessionuser = JSON.parse(this.sessionService.getItem("currentUser"));
    if (sessionuser != null) {
      this.SessionUser = sessionuser;
      return true;
    }
    return false;

  }
  saveOrUpdateboworkflowhistories() {
    {
      var body = {
        ...this.formData,
        SessionUser: this.SessionUser
      };
      return this.http.post(AppConstants.ntireboURL + '/boworkflowhistory', body);
    }
  }

  saveOrUpdateboworkflowhistoriesList() {
    {
      var body = {
        ...this.list,
        SessionUser: this.SessionUser
      };
      return this.http.post(AppConstants.ntireboURL + '/boworkflowhistory', body);
    }
  }

  getboworkflowhistoriesList() {
    {
      return this.http.get(AppConstants.ntireboURL + '/boworkflowhistory').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntireboURL + '/boworkflowhistory' + '/param/' + key).toPromise();
    }
  }

  getboworkflowhistoriesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntireboURL + '/boworkflowhistory' + '/' + id).toPromise();
    }
  }

  deleteboworkflowhistory(id: number) {
    {
      return this.http.delete(AppConstants.ntireboURL + '/boworkflowhistory' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntireboURL + '/boworkflowhistory')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }

}

