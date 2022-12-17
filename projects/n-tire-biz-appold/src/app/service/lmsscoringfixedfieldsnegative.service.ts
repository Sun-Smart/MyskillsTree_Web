import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsscoringfixedfieldsnegative } from '../model/lmsscoringfixedfieldsnegative.model';
import { environment } from '../../environments/environment';
import { IlmsscoringfixedfieldsnegativeResponse } from '../model/lmsscoringfixedfieldsnegative.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsscoringfixedfieldsnegativeService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmsscoringfixedfieldsnegatives(formData, Deleted_lmsscoringfixedfieldsnegative_IDs): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmsscoringfixedfieldsnegative', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsscoringfixedfieldsnegative' + '/getdefaultdata').toPromise();
    }
  }
  get_lmsscoringfixedfieldsnegatives_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsscoringfixedfieldsnegative').toPromise();
    }
  }
  getListBy_lsfnid(lsfnid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsscoringfixedfieldsnegative' + '/lsfnid/' + lsfnid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsscoringfixedfieldsnegative' + '/param/' + key).toPromise();
    }
  }


  get_lmsscoringfixedfieldsnegatives_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsscoringfixedfieldsnegative' + '/e/' + id).toPromise();
    }
  }
  get_lmsscoringfixedfieldsnegatives_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsscoringfixedfieldsnegative' + '/' + id).toPromise();
    }
  }

  delete_lmsscoringfixedfieldsnegative(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmsscoringfixedfieldsnegative' + '/' + id).toPromise();
    }
  }


}

