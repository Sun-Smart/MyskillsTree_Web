import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boreportcolumn } from '../model/boreportcolumn.model';
import { environment } from '../../environments/environment';
import { IboreportcolumnResponse } from '../model/boreportcolumn.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boreportcolumnService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_boreportcolumns(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/boreportcolumn', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreportcolumn' + '/getdefaultdata').toPromise();
    }
  }
  get_boreportcolumns_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreportcolumn').toPromise();
    }
  }
  getListBy_reportcolumnid(reportcolumnid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreportcolumn' + '/reportcolumnid/' + reportcolumnid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreportcolumn' + '/param/' + key).toPromise();
    }
  }


  get_boreportcolumns_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreportcolumn' + '/e/' + id).toPromise();
    }
  }
  get_boreportcolumns_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreportcolumn' + '/' + id).toPromise();
    }
  }

  delete_boreportcolumn(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/boreportcolumn' + '/' + id).toPromise();
    }
  }

  getList_datatype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boreportcolumn' + '/getList_datatype/').toPromise();
  }

  getList_filtertype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boreportcolumn' + '/getList_filtertype/').toPromise();
  }


}

