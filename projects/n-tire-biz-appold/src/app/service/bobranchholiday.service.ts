import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bobranchholiday } from '../model/bobranchholiday.model';
import { environment } from '../../environments/environment';
import { IbobranchholidayResponse } from '../model/bobranchholiday.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bobranchholidayService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bobranchholidays(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/bobranchholiday', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchholiday' + '/getdefaultdata').toPromise();
    }
  }
  get_bobranchholidays_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchholiday').toPromise();
    }
  }
  getListBy_branchholidayid(branchholidayid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchholiday' + '/branchholidayid/' + branchholidayid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchholiday' + '/param/' + key).toPromise();
    }
  }


  get_bobranchholidays_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchholiday' + '/e/' + id).toPromise();
    }
  }
  get_bobranchholidays_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchholiday' + '/' + id).toPromise();
    }
  }

  delete_bobranchholiday(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bobranchholiday' + '/' + id).toPromise();
    }
  }

  getList_financialyearid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bobranchholiday' + '/getList_financialyearid').toPromise();
  }

  getList_holidayday(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bobranchholiday' + '/getList_holidayday/').toPromise();
  }


}

