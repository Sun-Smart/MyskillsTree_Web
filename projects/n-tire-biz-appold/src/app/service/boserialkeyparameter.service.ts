import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boserialkeyparameter } from '../model/boserialkeyparameter.model';
import { environment } from '../../environments/environment';
import { IboserialkeyparameterResponse } from '../model/boserialkeyparameter.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boserialkeyparameterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_boserialkeyparameters(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/boserialkeyparameter', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boserialkeyparameter' + '/getdefaultdata').toPromise();
    }
  }
  get_boserialkeyparameters_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boserialkeyparameter').toPromise();
    }
  }
  getListBy_serialkeyid(serialkeyid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boserialkeyparameter' + '/serialkeyid/' + serialkeyid).toPromise();
    }
  }

  getListBy_tablename(tablename: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boserialkeyparameter' + '/tablename/' + tablename).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boserialkeyparameter' + '/param/' + key).toPromise();
    }
  }


  get_boserialkeyparameters_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boserialkeyparameter' + '/e/' + id).toPromise();
    }
  }
  get_boserialkeyparameters_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boserialkeyparameter' + '/' + id).toPromise();
    }
  }

  delete_boserialkeyparameter(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/boserialkeyparameter' + '/' + id).toPromise();
    }
  }


}

