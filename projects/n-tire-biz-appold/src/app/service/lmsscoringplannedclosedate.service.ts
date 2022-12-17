import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsscoringplannedclosedate } from '../model/lmsscoringplannedclosedate.model';
import { environment } from '../../environments/environment';
import { IlmsscoringplannedclosedateResponse } from '../model/lmsscoringplannedclosedate.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsscoringplannedclosedateService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmsscoringplannedclosedates(formData, Deleted_lmsscoringplannedclosedate_IDs): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmsscoringplannedclosedate', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsscoringplannedclosedate' + '/getdefaultdata').toPromise();
    }
  }
  get_lmsscoringplannedclosedates_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsscoringplannedclosedate').toPromise();
    }
  }
  getListBy_lspcid(lspcid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsscoringplannedclosedate' + '/lspcid/' + lspcid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsscoringplannedclosedate' + '/param/' + key).toPromise();
    }
  }


  get_lmsscoringplannedclosedates_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsscoringplannedclosedate' + '/e/' + id).toPromise();
    }
  }
  get_lmsscoringplannedclosedates_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsscoringplannedclosedate' + '/' + id).toPromise();
    }
  }

  delete_lmsscoringplannedclosedate(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmsscoringplannedclosedate' + '/' + id).toPromise();
    }
  }


}

