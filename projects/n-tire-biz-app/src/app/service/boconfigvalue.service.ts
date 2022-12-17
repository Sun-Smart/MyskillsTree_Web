import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boconfigvalue } from '../model/boconfigvalue.model';
import { bosubconfigvalue } from '../model/bosubconfigvalue.model';
import { environment } from '../../environments/environment';
import { IboconfigvalueResponse } from '../model/boconfigvalue.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boconfigvalueService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_boconfigvalues(formData, bosubconfigvalues,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        bosubconfigvalues: bosubconfigvalues.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/boconfigvalue', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boconfigvalue' + '/getdefaultdata').toPromise();
    }
  }
  get_boconfigvalues_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boconfigvalue').toPromise();
    }
  }
  getListBy_configid(configid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boconfigvalue' + '/configid/' + configid).toPromise();
    }
  }

  getListBy_param(param: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boconfigvalue' + '/param/' + param).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boconfigvalue' + '/param/' + key).toPromise();
    }
  }


  get_boconfigvalues_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boconfigvalue' + '/e/' + id).toPromise();
    }
  }
  get_boconfigvalues_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boconfigvalue' + '/' + id).toPromise();
    }
  }

  delete_boconfigvalue(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/boconfigvalue' + '/' + id).toPromise();
    }
  }


}

