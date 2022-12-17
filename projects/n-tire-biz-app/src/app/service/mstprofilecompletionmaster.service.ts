import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstprofilecompletionmaster } from '../model/mstprofilecompletionmaster.model';
import { environment } from '../../environments/environment';
import { ImstprofilecompletionmasterResponse } from '../model/mstprofilecompletionmaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class mstprofilecompletionmasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_mstprofilecompletionmasters(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/mstprofilecompletionmaster', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstprofilecompletionmaster' + '/getdefaultdata').toPromise();
    }
  }
  get_mstprofilecompletionmasters_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstprofilecompletionmaster').toPromise();
    }
  }
  getListBy_profileid(profileid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstprofilecompletionmaster' + '/profileid/' + profileid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstprofilecompletionmaster' + '/param/' + key).toPromise();
    }
  }


  get_mstprofilecompletionmasters_ByEID(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstprofilecompletionmaster').toPromise();
    }
  }
  get_mstprofilecompletionmasters_ByID(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstprofilecompletionmaster').toPromise();
    }
  }

  delete_mstprofilecompletionmaster(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/mstprofilecompletionmaster' + '/' + id).toPromise();
    }
  }


}

