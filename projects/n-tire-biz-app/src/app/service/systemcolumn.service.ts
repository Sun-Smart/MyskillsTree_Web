import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { systemcolumn } from '../model/systemcolumn.model';
import { environment } from '../../environments/environment';
import { IsystemcolumnResponse } from '../model/systemcolumn.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class systemcolumnService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_systemcolumns(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/systemcolumn', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/systemcolumn' + '/getdefaultdata').toPromise();
    }
  }
  get_systemcolumns_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/systemcolumn').toPromise();
    }
  }
  getListBy_syscolumnid(syscolumnid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/systemcolumn' + '/syscolumnid/' + syscolumnid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/systemcolumn' + '/param/' + key).toPromise();
    }
  }


  get_systemcolumns_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/systemcolumn' + '/e/' + id).toPromise();
    }
  }
  get_systemcolumns_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/systemcolumn' + '/' + id).toPromise();
    }
  }

  delete_systemcolumn(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/systemcolumn' + '/' + id).toPromise();
    }
  }


}

