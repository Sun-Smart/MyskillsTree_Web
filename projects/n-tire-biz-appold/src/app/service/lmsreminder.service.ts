import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsreminder } from '../model/lmsreminder.model';
import { environment } from '../../environments/environment';
import { IlmsreminderResponse } from '../model/lmsreminder.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsreminderService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmsreminders(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmsreminder', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsreminder' + '/getdefaultdata').toPromise();
    }
  }
  get_lmsreminders_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsreminder').toPromise();
    }
  }
  getListBy_reminderid(reminderid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsreminder' + '/reminderid/' + reminderid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsreminder' + '/param/' + key).toPromise();
    }
  }


  get_lmsreminders_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsreminder' + '/e/' + id).toPromise();
    }
  }
  get_lmsreminders_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsreminder' + '/' + id).toPromise();
    }
  }

  delete_lmsreminder(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmsreminder' + '/' + id).toPromise();
    }
  }


}

