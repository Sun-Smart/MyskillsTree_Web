import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bousertypemenuaccess } from '../model/bousertypemenuaccess.model';
import { environment } from '../../environments/environment';
import { IbousertypemenuaccessResponse } from '../model/bousertypemenuaccess.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bousertypemenuaccessService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bousertypemenuaccesses(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/bousertypemenuaccess', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousertypemenuaccess' + '/getdefaultdata').toPromise();
    }
  }
  get_bousertypemenuaccesses_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousertypemenuaccess').toPromise();
    }
  }
  getListBy_rolemenuaccessid(rolemenuaccessid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousertypemenuaccess' + '/rolemenuaccessid/' + rolemenuaccessid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousertypemenuaccess' + '/param/' + key).toPromise();
    }
  }


  get_bousertypemenuaccesses_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousertypemenuaccess' + '/e/' + id).toPromise();
    }
  }
  get_bousertypemenuaccesses_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousertypemenuaccess' + '/' + id).toPromise();
    }
  }

  delete_bousertypemenuaccess(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bousertypemenuaccess' + '/' + id).toPromise();
    }
  }


}

