import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { botaskresponse } from '../model/botaskresponse.model';
import { environment } from '../../environments/environment';
import { IbotaskresponseResponse } from '../model/botaskresponse.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class botaskresponseService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_botaskresponses(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/botaskresponse', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/botaskresponse' + '/getdefaultdata').toPromise();
    }
  }
  get_botaskresponses_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/botaskresponse').toPromise();
    }
  }
  getListBy_responseid(responseid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/botaskresponse' + '/responseid/' + responseid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/botaskresponse' + '/param/' + key).toPromise();
    }
  }


  get_botaskresponses_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/botaskresponse' + '/e/' + id).toPromise();
    }
  }
  get_botaskresponses_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/botaskresponse' + '/' + id).toPromise();
    }
  }

  delete_botaskresponse(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/botaskresponse' + '/' + id).toPromise();
    }
  }


}

