import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpmaterialissue } from '../model/erpmaterialissue.model';
import { environment } from '../../environments/environment';
import { IerpmaterialissueResponse } from '../model/erpmaterialissue.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class erpmaterialissueService {
  SessionUser = { companyid: 0, userid: 0, usercode: '', username: '', language: '' };
  formData: erpmaterialissue;
  readonly rootURL = AppConstants.ntireprocurementURL;
  list: erpmaterialissue[];

  constructor(private http: HttpClient, public sessionService: SessionService, private datePipe: DatePipe) { }

  valid() {
    var sessionuser = JSON.parse(this.sessionService.getItem("currentUser"));
    if (sessionuser != null) {
      this.SessionUser = sessionuser;
      return true;
    }
    return false;

  }
  saveOrUpdateerpmaterialissues() {
    {
      var body = {
        ...this.formData,
        SessionUser: this.SessionUser
      };
      return this.http.post(AppConstants.ntireprocurementURL + '/erpmaterialissue', body);
    }
  }

  saveOrUpdateerpmaterialissuesList() {
    {
      var body = {
        list: this.list,
        SessionUser: this.SessionUser
      };
      return this.http.post(AppConstants.ntireprocurementURL + '/erpmaterialissue', body);
    }
  }

  geterpmaterialissuesList() {
    {
      return this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialissue').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialissue' + '/param/' + key).toPromise();
    }
  }

  geterpmaterialissuesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialissue' + '/' + id).toPromise();
    }
  }

  deleteerpmaterialissue(id: number) {
    {
      return this.http.delete(AppConstants.ntireprocurementURL + '/erpmaterialissue' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialissue')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

