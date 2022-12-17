import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boteammember } from '../model/boteammember.model';
import { environment } from '../../environments/environment';
import { IboteammemberResponse } from '../model/boteammember.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boteammemberService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_boteammembers(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/boteammember', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boteammember' + '/getdefaultdata').toPromise();
    }
  }
  get_boteammembers_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boteammember').toPromise();
    }
  }
  getListBy_teammemberid(teammemberid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boteammember' + '/teammemberid/' + teammemberid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boteammember' + '/param/' + key).toPromise();
    }
  }


  get_boteammembers_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boteammember' + '/e/' + id).toPromise();
    }
  }
  get_boteammembers_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boteammember' + '/' + id).toPromise();
    }
  }

  delete_boteammember(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/boteammember' + '/' + id).toPromise();
    }
  }

  getList_teamid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boteammember' + '/getList_teamid').toPromise();
  }

  getList_userid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boteammember' + '/getList_userid').toPromise();
  }

  getList_memberstatus(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boteammember' + '/getList_memberstatus/').toPromise();
  }


}

