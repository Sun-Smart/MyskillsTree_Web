import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bousergroupaccess } from '../model/bousergroupaccess.model';
import { environment } from '../../environments/environment';
import { IbousergroupaccessResponse } from '../model/bousergroupaccess.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bousergroupaccessService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bousergroupaccesses(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/bousergroupaccess', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousergroupaccess' + '/getdefaultdata').toPromise();
    }
  }
  get_bousergroupaccesses_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousergroupaccess').toPromise();
    }
  }
  getListBy_accessid(accessid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousergroupaccess' + '/accessid/' + accessid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousergroupaccess' + '/param/' + key).toPromise();
    }
  }


  get_bousergroupaccesses_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousergroupaccess' + '/e/' + id).toPromise();
    }
  }
  get_bousergroupaccesses_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousergroupaccess' + '/' + id).toPromise();
    }
  }

  delete_bousergroupaccess(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bousergroupaccess' + '/' + id).toPromise();
    }
  }

  getList_usergroupid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousergroupaccess' + '/getList_usergroupid').toPromise();
  }


}

