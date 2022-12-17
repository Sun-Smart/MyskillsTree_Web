import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmstask } from '../model/lmstask.model';
import { lmstaskresponse } from '../model/lmstaskresponse.model';
import { environment } from '../../environments/environment';
import { IlmstaskResponse } from '../model/lmstask.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmstaskService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmstasks(formData, lmstaskresponses,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        lmstaskresponses: lmstaskresponses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmstask', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstask' + '/getdefaultdata').toPromise();
    }
  }
  get_lmstasks_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstask').toPromise();
    }
  }
  getListBy_taskid(taskid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstask' + '/taskid/' + taskid).toPromise();
    }
  }

  getListBy_taskstatus(taskstatus: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstask' + '/taskstatus/' + taskstatus).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstask' + '/param/' + key).toPromise();
    }
  }


  get_lmstasks_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstask' + '/e/' + id).toPromise();
    }
  }
  get_lmstasks_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstask' + '/' + id).toPromise();
    }
  }

  delete_lmstask(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmstask' + '/' + id).toPromise();
    }
  }
  getlmstasksListbytaskstatus(dt: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstask/' + dt + '').toPromise();
    }
  }

  getlmstasksListbymonthwise(dt: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstask/' + dt + '').toPromise();
    }
  }


  getList_leadid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmstask' + '/getList_leadid').toPromise();
  }

  getList_opportunityid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmstask' + '/getList_opportunityid').toPromise();
  }

  getList_assignto(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmstask' + '/getList_assignto').toPromise();
  }

  getList_priority(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmstask' + '/getList_priority/').toPromise();
  }

  getList_taskstatus(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmstask' + '/getList_taskstatus/').toPromise();
  }

  getList_performancestatus(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmstask' + '/getList_performancestatus/').toPromise();
  }

  getList_productid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmstask' + '/getList_productid').toPromise();
  }


}

