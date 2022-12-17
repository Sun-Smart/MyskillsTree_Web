import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boworkflow } from '../model/boworkflow.model';
import { environment } from '../../environments/environment';
import { IboworkflowResponse } from '../model/boworkflow.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boworkflowService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_boworkflows(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/boworkflow', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boworkflow' + '/getdefaultdata').toPromise();
    }
  }
  get_boworkflows_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boworkflow').toPromise();
    }
  }
  getListBy_workflowid(workflowid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boworkflow' + '/workflowid/' + workflowid).toPromise();
    }
  }

  getListBy_pkvalue(pkvalue: number, modulename: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boworkflow' + '/pkvalue/' + pkvalue + '/' + modulename).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boworkflow' + '/param/' + key).toPromise();
    }
  }


  get_boworkflows_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boworkflow' + '/e/' + id).toPromise();
    }
  }
  get_boworkflows_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boworkflow' + '/' + id).toPromise();
    }
  }

  delete_boworkflow(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/boworkflow' + '/' + id).toPromise();
    }
  }

  getList_currentapproved(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boworkflow' + '/getList_currentapproved').toPromise();
  }

  getList_standardrating(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boworkflow' + '/getList_standardrating/').toPromise();
  }

  getList_performancerating(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boworkflow' + '/getList_performancerating/').toPromise();
  }

  getList_performancestatus(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boworkflow' + '/getList_performancestatus/').toPromise();
  }

  getList_workflowstatus(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boworkflow' + '/getList_workflowstatus/').toPromise();
  }


}

