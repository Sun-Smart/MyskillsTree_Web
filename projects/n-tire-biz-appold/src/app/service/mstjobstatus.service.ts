import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstjobstatus } from '../model/mstjobstatus.model';
import { environment } from '../../environments/environment';
import { ImstjobstatusResponse } from '../model/mstjobstatus.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class mstjobstatusService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_mstjobstatuses(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/mstjobstatus', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstjobstatus' + '/getdefaultdata').toPromise();
    }
  }
  get_mstjobstatuses_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstjobstatus').toPromise();
    }
  }
  getListBy_viewid(viewid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstjobstatus' + '/viewid/' + viewid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstjobstatus' + '/param/' + key).toPromise();
    }
  }


  get_mstjobstatuses_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstjobstatus' + '/e/' + id).toPromise();
    }
  }
  get_mstjobstatuses_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstjobstatus' + '/' + id).toPromise();
    }
  }

  delete_mstjobstatus(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/mstjobstatus' + '/' + id).toPromise();
    }
  }

  getList_applicantid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstjobstatus' + '/getList_applicantid').toPromise();
  }

  getList_corporateid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstjobstatus' + '/getList_corporateid').toPromise();
  }

  getList_jobid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstjobstatus' + '/getList_jobid').toPromise();
  }


}

