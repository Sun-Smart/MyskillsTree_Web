import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bodashboard } from '../model/bodashboard.model';
import { bodashboarddetail } from '../model/bodashboarddetail.model';
import { environment } from '../../environments/environment';
import { IbodashboardResponse } from '../model/bodashboard.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bodashboardService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bodashboards(formData, bodashboarddetails,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        bodashboarddetails: bodashboarddetails.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/bodashboard', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodashboard' + '/getdefaultdata').toPromise();
    }
  }
  get_bodashboards_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodashboard').toPromise();
    }
  }
  getListBy_dashboardid(dashboardid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodashboard' + '/dashboardid/' + dashboardid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodashboard' + '/param/' + key).toPromise();
    }
  }


  get_bodashboards_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodashboard' + '/e/' + id).toPromise();
    }
  }
  get_bodashboards_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodashboard' + '/' + id).toPromise();
    }
  }

  delete_bodashboard(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bodashboard' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbodashboardResponse> {
    return this.http.get<IbodashboardResponse>(AppConstants.ntirebizURL + '/bodashboard')
      .pipe(
        tap((response: IbodashboardResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bodashboard => new bodashboard(bodashboard.dashboardid, bodashboard.dashboardiddesc, bodashboard.dashboardname, bodashboard.rows, bodashboard.cols, bodashboard.design, bodashboard.remarks, bodashboard.userid, bodashboard.module, bodashboard.helptext, bodashboard.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bodashboard => bodashboard.dashboardname.includes(filter.name))

          return response;
        })
      );
  }


  getList_dashboardid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bodashboard' + '/getList_dashboardid').toPromise();
  }


}

