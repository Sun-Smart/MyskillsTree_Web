import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstprofileaccessdetail } from '../model/mstprofileaccessdetail.model';
import { environment } from '../../environments/environment';
import { ImstprofileaccessdetailResponse } from '../model/mstprofileaccessdetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class mstprofileaccessdetailService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_mstprofileaccessdetails(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/mstprofileaccessdetail', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstprofileaccessdetail' + '/getdefaultdata').toPromise();
    }
  }
  get_mstprofileaccessdetails_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstprofileaccessdetail').toPromise();
    }
  }
  getListBy_viewid(viewid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstprofileaccessdetail' + '/viewid/' + viewid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstprofileaccessdetail' + '/param/' + key).toPromise();
    }
  }


  get_mstprofileaccessdetails_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstprofileaccessdetail' + '/e/' + id).toPromise();
    }
  }
  get_mstprofileaccessdetails_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstprofileaccessdetail' + '/' + id).toPromise();
    }
  }

  delete_mstprofileaccessdetail(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/mstprofileaccessdetail' + '/' + id).toPromise();
    }
  }

  getList_userid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstprofileaccessdetail' + '/getList_userid').toPromise();
  }

  getList_viewuserid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstprofileaccessdetail' + '/getList_viewuserid').toPromise();
  }


}

