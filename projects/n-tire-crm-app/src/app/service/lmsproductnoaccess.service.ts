import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsproductnoaccess } from '../model/lmsproductnoaccess.model';
import { environment } from '../../environments/environment';
import { IlmsproductnoaccessResponse } from '../model/lmsproductnoaccess.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsproductnoaccessService {
  SessionUser = { companyid: 0, userid: 0, usercode: '', username: '', language: '' };
  formData: lmsproductnoaccess;
  readonly rootURL = AppConstants.ntirecrmURL;
  list: lmsproductnoaccess[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    var sessionuser = JSON.parse(this.sessionService.getItem("currentUser"));
    if (sessionuser != null) {
      this.SessionUser = sessionuser;
      return true;
    }
    return false;

  }
  saveOrUpdatelmsproductnoaccesses() {
    {
      var body = {
        ...this.formData,
        SessionUser: this.SessionUser
      };
      return this.http.post(AppConstants.ntirecrmURL + '/lmsproductnoaccess', body);
    }
  }

  saveOrUpdatelmsproductnoaccessesList() {
    {
      var body = {
        ...this.list,
        SessionUser: this.SessionUser
      };
      return this.http.post(AppConstants.ntirecrmURL + '/lmsproductnoaccess', body);
    }
  }

  getlmsproductnoaccessesList() {
    {
      return this.http.get(AppConstants.ntirecrmURL + '/lmsproductnoaccess').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirecrmURL + '/lmsproductnoaccess' + '/param/' + key).toPromise();
    }
  }

  getlmsproductnoaccessesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirecrmURL + '/lmsproductnoaccess' + '/' + id).toPromise();
    }
  }

  deletelmsproductnoaccess(id: number) {
    {
      return this.http.delete(AppConstants.ntirecrmURL + '/lmsproductnoaccess' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirecrmURL + '/lmsproductnoaccess')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }

}

