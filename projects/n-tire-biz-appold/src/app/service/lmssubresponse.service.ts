import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmssubresponse } from '../model/lmssubresponse.model';
import { environment } from '../../environments/environment';
import { IlmssubresponseResponse } from '../model/lmssubresponse.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmssubresponseService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmssubresponses(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmssubresponse', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmssubresponse' + '/getdefaultdata').toPromise();
    }
  }
  get_lmssubresponses_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmssubresponse').toPromise();
    }
  }
  getListBy_subresponseid(subresponseid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmssubresponse' + '/subresponseid/' + subresponseid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmssubresponse' + '/param/' + key).toPromise();
    }
  }


  get_lmssubresponses_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmssubresponse' + '/e/' + id).toPromise();
    }
  }
  get_lmssubresponses_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmssubresponse' + '/' + id).toPromise();
    }
  }

  delete_lmssubresponse(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmssubresponse' + '/' + id).toPromise();
    }
  }


}

