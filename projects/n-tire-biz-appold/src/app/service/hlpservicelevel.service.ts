import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hlpservicelevel } from '../model/hlpservicelevel.model';
import { hlpslapriority } from '../model/hlpslapriority.model';
import { hlpslasupporthour } from '../model/hlpslasupporthour.model';
import { environment } from '../../environments/environment';
import { IhlpservicelevelResponse } from '../model/hlpservicelevel.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hlpservicelevelService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_hlpservicelevels(formData, hlpslapriorities, hlpslasupporthours,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        hlpslapriorities: hlpslapriorities.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        hlpslasupporthours: hlpslasupporthours.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/hlpservicelevel', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpservicelevel' + '/getdefaultdata').toPromise();
    }
  }
  get_hlpservicelevels_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpservicelevel').toPromise();
    }
  }
  getListBy_servicelevelid(servicelevelid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpservicelevel' + '/servicelevelid/' + servicelevelid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpservicelevel' + '/param/' + key).toPromise();
    }
  }


  get_hlpservicelevels_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpservicelevel' + '/e/' + id).toPromise();
    }
  }
  get_hlpservicelevels_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpservicelevel' + '/' + id).toPromise();
    }
  }

  delete_hlpservicelevel(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/hlpservicelevel' + '/' + id).toPromise();
    }
  }

  getList_type(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpservicelevel' + '/getList_type/').toPromise();
  }

  getList_category(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpservicelevel' + '/getList_category/').toPromise();
  }

  getList_holidaylistid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpservicelevel' + '/getList_holidaylistid').toPromise();
  }


}

