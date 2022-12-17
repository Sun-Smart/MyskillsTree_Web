import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmstaskresponse } from '../model/lmstaskresponse.model';
import { environment } from '../../environments/environment';
import { IlmstaskresponseResponse } from '../model/lmstaskresponse.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmstaskresponseService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmstaskresponses(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmstaskresponse', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstaskresponse' + '/getdefaultdata').toPromise();
    }
  }
  get_lmstaskresponses_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstaskresponse').toPromise();
    }
  }
  getListBy_responseid(responseid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstaskresponse' + '/responseid/' + responseid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstaskresponse' + '/param/' + key).toPromise();
    }
  }


  get_lmstaskresponses_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstaskresponse' + '/e/' + id).toPromise();
    }
  }
  get_lmstaskresponses_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmstaskresponse' + '/' + id).toPromise();
    }
  }

  delete_lmstaskresponse(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmstaskresponse' + '/' + id).toPromise();
    }
  }

  getList_opportunityid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmstaskresponse' + '/getList_opportunityid').toPromise();
  }



}

