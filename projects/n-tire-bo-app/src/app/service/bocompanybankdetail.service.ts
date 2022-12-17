import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bocompanybankdetail } from '../model/bocompanybankdetail.model';
import { environment } from '../../environments/environment';
import { IbocompanybankdetailResponse } from '../model/bocompanybankdetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bocompanybankdetailService {
  SessionUser = { companyid: 0, userid: 0, usercode: '', username: '', language: '' };
  formData: bocompanybankdetail;
  readonly rootURL = AppConstants.ntireboURL;
  list: bocompanybankdetail[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    var sessionuser = JSON.parse(this.sessionService.getItem("currentUser"));
    if (sessionuser != null) {
      this.SessionUser = sessionuser;
      return true;
    }
    return false;

  }
  saveOrUpdatebocompanybankdetails() {
    {
      var body = {
        ...this.formData,
        SessionUser: this.SessionUser
      };
      return this.http.post(AppConstants.ntireboURL + '/bocompanybankdetail', body);
    }
  }

  saveOrUpdatebocompanybankdetailsList() {
    {
      var body = {
        ...this.list,
        SessionUser: this.SessionUser
      };
      return this.http.post(AppConstants.ntireboURL + '/bocompanybankdetail', body);
    }
  }

  getbocompanybankdetailsList() {
    {
      return this.http.get(AppConstants.ntireboURL + '/bocompanybankdetail').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntireboURL + '/bocompanybankdetail' + '/param/' + key).toPromise();
    }
  }

  getbocompanybankdetailsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntireboURL + '/bocompanybankdetail' + '/' + id).toPromise();
    }
  }

  deletebocompanybankdetail(id: number) {
    {
      return this.http.delete(AppConstants.ntireboURL + '/bocompanybankdetail' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntireboURL + '/bocompanybankdetail')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }

}

