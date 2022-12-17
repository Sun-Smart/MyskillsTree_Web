import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bodashboarddetail } from '../model/bodashboarddetail.model';
import { environment } from '../../environments/environment';
import { IbodashboarddetailResponse } from '../model/bodashboarddetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bodashboarddetailService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bodashboarddetails(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/bodashboarddetail', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodashboarddetail' + '/getdefaultdata').toPromise();
    }
  }
  get_bodashboarddetails_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodashboarddetail').toPromise();
    }
  }
  getListBy_dashboarddetailid(dashboarddetailid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodashboarddetail' + '/dashboarddetailid/' + dashboarddetailid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodashboarddetail' + '/param/' + key).toPromise();
    }
  }


  get_bodashboarddetails_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodashboarddetail' + '/e/' + id).toPromise();
    }
  }
  get_bodashboarddetails_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodashboarddetail' + '/' + id).toPromise();
    }
  }

  delete_bodashboarddetail(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bodashboarddetail' + '/' + id).toPromise();
    }
  }

  getList_dashboardid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bodashboarddetail' + '/getList_dashboardid').toPromise();
  }

  getList_charttype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bodashboarddetail' + '/getList_charttype/').toPromise();
  }

  getList_parameter1type(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bodashboarddetail' + '/getList_parameter1type').toPromise();
  }

  getList_parameter1datetype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bodashboarddetail' + '/getList_parameter1datetype/').toPromise();
  }

  getList_parameter2type(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bodashboarddetail' + '/getList_parameter2type').toPromise();
  }

  getList_parameter2datetype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bodashboarddetail' + '/getList_parameter2datetype/').toPromise();
  }

  getList_parameter3type(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bodashboarddetail' + '/getList_parameter3type').toPromise();
  }

  getList_parameter3datetype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bodashboarddetail' + '/getList_parameter3datetype/').toPromise();
  }

  getList_menuid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bodashboarddetail' + '/getList_menuid').toPromise();
  }

  getList_reportid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bodashboarddetail' + '/getList_reportid/').toPromise();
  }


}

