import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bootpvalidationdetail } from '../model/bootpvalidationdetail.model';
import { environment } from '../../environments/environment';
import { IbootpvalidationdetailResponse } from '../model/bootpvalidationdetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bootpvalidationdetailService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bootpvalidationdetails(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/bootpvalidationdetail', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bootpvalidationdetail' + '/getdefaultdata').toPromise();
    }
  }
  get_bootpvalidationdetails_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bootpvalidationdetail').toPromise();
    }
  }
  getListBy_otpid(otpid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bootpvalidationdetail' + '/otpid/' + otpid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bootpvalidationdetail' + '/param/' + key).toPromise();
    }
  }


  get_bootpvalidationdetails_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bootpvalidationdetail' + '/e/' + id).toPromise();
    }
  }
  get_bootpvalidationdetails_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bootpvalidationdetail' + '/' + id).toPromise();
    }
  }

  delete_bootpvalidationdetail(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bootpvalidationdetail' + '/' + id).toPromise();
    }
  }

  getList_userid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bootpvalidationdetail' + '/getList_userid').toPromise();
  }


}

