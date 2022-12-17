import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bocompanyholiday } from '../model/bocompanyholiday.model';
import { environment } from '../../environments/environment';
import { IbocompanyholidayResponse } from '../model/bocompanyholiday.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bocompanyholidayService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bocompanyholidays(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/bocompanyholiday', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanyholiday' + '/getdefaultdata').toPromise();
    }
  }
  get_bocompanyholidays_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanyholiday').toPromise();
    }
  }
  getListBy_holidayid(holidayid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanyholiday' + '/holidayid/' + holidayid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanyholiday' + '/param/' + key).toPromise();
    }
  }


  get_bocompanyholidays_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanyholiday' + '/e/' + id).toPromise();
    }
  }
  get_bocompanyholidays_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanyholiday' + '/' + id).toPromise();
    }
  }

  delete_bocompanyholiday(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bocompanyholiday' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbocompanyholidayResponse> {
    return this.http.get<IbocompanyholidayResponse>(AppConstants.ntirebizURL + '/bocompanyholiday')
      .pipe(
        tap((response: IbocompanyholidayResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bocompanyholiday => new bocompanyholiday(bocompanyholiday.holidayid, bocompanyholiday.financialyearid, bocompanyholiday.financialyeariddesc, bocompanyholiday.holidaydate, bocompanyholiday.holidayday, bocompanyholiday.holidaydaydesc, bocompanyholiday.reason, bocompanyholiday.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bocompanyholiday => bocompanyholiday.holidaydate.includes(filter.name))

          return response;
        })
      );
  }


  getList_financialyearid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bocompanyholiday' + '/getList_financialyearid').toPromise();
  }

  getList_holidayday(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bocompanyholiday' + '/getList_holidayday/').toPromise();
  }


}

