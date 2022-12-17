import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bocompanyregistration } from '../model/bocompanyregistration.model';
import { environment } from '../../environments/environment';
import { IbocompanyregistrationResponse } from '../model/bocompanyregistration.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bocompanyregistrationService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bocompanyregistrations(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/bocompanyregistration', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanyregistration' + '/getdefaultdata').toPromise();
    }
  }
  get_bocompanyregistrations_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanyregistration').toPromise();
    }
  }
  getListBy_registrationid(registrationid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanyregistration' + '/registrationid/' + registrationid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanyregistration' + '/param/' + key).toPromise();
    }
  }


  get_bocompanyregistrations_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanyregistration' + '/e/' + id).toPromise();
    }
  }
  get_bocompanyregistrations_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanyregistration' + '/' + id).toPromise();
    }
  }

  delete_bocompanyregistration(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bocompanyregistration' + '/' + id).toPromise();
    }
  }

  getList_companytype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bocompanyregistration' + '/getList_companytype/').toPromise();
  }

  getList_designation(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bocompanyregistration' + '/getList_designation').toPromise();
  }


}

