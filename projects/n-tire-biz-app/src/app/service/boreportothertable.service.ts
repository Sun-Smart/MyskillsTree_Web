import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boreportothertable } from '../model/boreportothertable.model';
import { environment } from '../../environments/environment';
import { IboreportothertableResponse } from '../model/boreportothertable.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boreportothertableService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_boreportothertables(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/boreportothertable', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreportothertable' + '/getdefaultdata').toPromise();
    }
  }
  get_boreportothertables_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreportothertable').toPromise();
    }
  }
  getListBy_othertableid(othertableid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreportothertable' + '/othertableid/' + othertableid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreportothertable' + '/param/' + key).toPromise();
    }
  }


  get_boreportothertables_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreportothertable' + '/e/' + id).toPromise();
    }
  }
  get_boreportothertables_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreportothertable' + '/' + id).toPromise();
    }
  }

  delete_boreportothertable(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/boreportothertable' + '/' + id).toPromise();
    }
  }

  getList_jointype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boreportothertable' + '/getList_jointype/').toPromise();
  }


}

