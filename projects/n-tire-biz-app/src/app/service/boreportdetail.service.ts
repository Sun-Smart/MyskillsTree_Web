import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boreportdetail } from '../model/boreportdetail.model';
import { environment } from '../../environments/environment';
import { IboreportdetailResponse } from '../model/boreportdetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boreportdetailService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_boreportdetails(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/boreportdetail', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreportdetail' + '/getdefaultdata').toPromise();
    }
  }
  get_boreportdetails_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreportdetail').toPromise();
    }
  }
  getListBy_reportdetailid(reportdetailid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreportdetail' + '/reportdetailid/' + reportdetailid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreportdetail' + '/param/' + key).toPromise();
    }
  }


  get_boreportdetails_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreportdetail' + '/e/' + id).toPromise();
    }
  }
  get_boreportdetails_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boreportdetail' + '/' + id).toPromise();
    }
  }

  delete_boreportdetail(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/boreportdetail' + '/' + id).toPromise();
    }
  }

  getList_separator(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boreportdetail' + '/getList_separator/').toPromise();
  }


}

