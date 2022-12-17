import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsscoringfixedfieldspositive } from '../model/lmsscoringfixedfieldspositive.model';
import { environment } from '../../environments/environment';
import { IlmsscoringfixedfieldspositiveResponse } from '../model/lmsscoringfixedfieldspositive.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsscoringfixedfieldspositiveService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmsscoringfixedfieldspositives(formData, Deleted_lmsscoringfixedfieldspositive_IDs): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmsscoringfixedfieldspositive', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsscoringfixedfieldspositive' + '/getdefaultdata').toPromise();
    }
  }
  get_lmsscoringfixedfieldspositives_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsscoringfixedfieldspositive').toPromise();
    }
  }
  getListBy_lsfpid(lsfpid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsscoringfixedfieldspositive' + '/lsfpid/' + lsfpid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsscoringfixedfieldspositive' + '/param/' + key).toPromise();
    }
  }


  get_lmsscoringfixedfieldspositives_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsscoringfixedfieldspositive' + '/e/' + id).toPromise();
    }
  }
  get_lmsscoringfixedfieldspositives_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsscoringfixedfieldspositive' + '/' + id).toPromise();
    }
  }

  delete_lmsscoringfixedfieldspositive(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmsscoringfixedfieldspositive' + '/' + id).toPromise();
    }
  }


}

