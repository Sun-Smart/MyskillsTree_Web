import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpfacostcenter } from '../model/erpfacostcenter.model';
import { environment } from '../../environments/environment';
import { IerpfacostcenterResponse } from '../model/erpfacostcenter.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpfacostcenterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_erpfacostcenters(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/erpfacostcenter', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/erpfacostcenter' + '/getdefaultdata').toPromise();
    }
  }
  get_erpfacostcenters_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/erpfacostcenter').toPromise();
    }
  }
  getListBy_costcenterid(costcenterid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/erpfacostcenter' + '/costcenterid/' + costcenterid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/erpfacostcenter' + '/param/' + key).toPromise();
    }
  }


  get_erpfacostcenters_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/erpfacostcenter' + '/e/' + id).toPromise();
    }
  }
  get_erpfacostcenters_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/erpfacostcenter' + '/' + id).toPromise();
    }
  }

  delete_erpfacostcenter(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/erpfacostcenter' + '/' + id).toPromise();
    }
  }

  getList_mode(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/erpfacostcenter' + '/getList_mode/').toPromise();
  }


}

