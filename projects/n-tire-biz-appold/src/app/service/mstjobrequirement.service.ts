import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstjobrequirement } from '../model/mstjobrequirement.model';
import { mstjobstatus } from '../model/mstjobstatus.model';
import { environment } from '../../environments/environment';
import { ImstjobrequirementResponse } from '../model/mstjobrequirement.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class mstjobrequirementService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_mstjobrequirements(formData, mstjobstatuses,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        mstjobstatuses: mstjobstatuses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/mstjobrequirement', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstjobrequirement' + '/getdefaultdata').toPromise();
    }
  }
  get_mstjobrequirements_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstjobrequirement').toPromise();
    }
  }
  getListBy_jobid(jobid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstjobrequirement' + '/jobid/' + jobid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstjobrequirement' + '/param/' + key).toPromise();
    }
  }


  get_mstjobrequirements_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstjobrequirement' + '/e/' + id).toPromise();
    }
  }
  get_mstjobrequirements_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstjobrequirement' + '/' + id).toPromise();
    }
  }

  delete_mstjobrequirement(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/mstjobrequirement' + '/' + id).toPromise();
    }
  }

  getList_locations(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstjobrequirement' + '/getList_locations').toPromise();
  }

  getList_skills(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstjobrequirement' + '/getList_skills').toPromise();
  }

  getList_education(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstjobrequirement' + '/getList_education').toPromise();
  }

  getList_language(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstjobrequirement' + '/getList_language/').toPromise();
  }


}

