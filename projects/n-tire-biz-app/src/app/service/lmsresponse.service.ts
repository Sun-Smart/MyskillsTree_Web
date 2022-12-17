import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsresponse } from '../model/lmsresponse.model';
import { lmssubresponse } from '../model/lmssubresponse.model';
import { environment } from '../../environments/environment';
import { IlmsresponseResponse } from '../model/lmsresponse.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsresponseService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmsresponses(formData, lmssubresponses,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        lmssubresponses: lmssubresponses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmsresponse', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsresponse' + '/getdefaultdata').toPromise();
    }
  }
  get_lmsresponses_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsresponse').toPromise();
    }
  }
  getListBy_responseid(responseid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsresponse' + '/responseid/' + responseid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsresponse' + '/param/' + key).toPromise();
    }
  }


  get_lmsresponses_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsresponse' + '/e/' + id).toPromise();
    }
  }
  get_lmsresponses_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsresponse' + '/' + id).toPromise();
    }
  }

  delete_lmsresponse(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmsresponse' + '/' + id).toPromise();
    }
  }

  getList_productgroupid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsresponse' + '/getList_productgroupid/').toPromise();
  }

  getList_baseresponse(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsresponse' + '/getList_baseresponse/').toPromise();
  }

  getList_workflowrole(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsresponse' + '/getList_workflowrole').toPromise();
  }

  getList_colorcode(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsresponse' + '/getList_colorcode/').toPromise();
  }


}

