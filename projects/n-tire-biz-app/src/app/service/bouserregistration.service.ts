import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bouserregistration } from '../model/bouserregistration.model';
import { environment } from '../../environments/environment';
import { IbouserregistrationResponse } from '../model/bouserregistration.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bouserregistrationService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }

  saveOrUpdate_bouserregistrations(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/bouserregistration', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bouserregistration' + '/getdefaultdata').toPromise();
    }
  }
  get_bouserregistrations_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bouserregistration').toPromise();
    }
  }
  getListBy_registrationid(registrationid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bouserregistration' + '/registrationid/' + registrationid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bouserregistration' + '/param/' + key).toPromise();
    }
  }


  get_bouserregistrations_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bouserregistration' + '/e/' + id).toPromise();
    }
  }
  get_bouserregistrations_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bouserregistration' + '/' + id).toPromise();
    }
  }

  delete_bouserregistration(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bouserregistration' + '/' + id).toPromise();
    }
  }


}

