import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hlpslasupporthour } from '../model/hlpslasupporthour.model';
import { environment } from '../../environments/environment';
import { IhlpslasupporthourResponse } from '../model/hlpslasupporthour.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hlpslasupporthourService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_hlpslasupporthours(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/hlpslasupporthour', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpslasupporthour' + '/getdefaultdata').toPromise();
    }
  }
  get_hlpslasupporthours_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpslasupporthour').toPromise();
    }
  }
  getListBy_supportid(supportid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpslasupporthour' + '/supportid/' + supportid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpslasupporthour' + '/param/' + key).toPromise();
    }
  }


  get_hlpslasupporthours_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpslasupporthour' + '/e/' + id).toPromise();
    }
  }
  get_hlpslasupporthours_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpslasupporthour' + '/' + id).toPromise();
    }
  }

  delete_hlpslasupporthour(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/hlpslasupporthour' + '/' + id).toPromise();
    }
  }

  getList_weekday(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpslasupporthour' + '/getList_weekday/').toPromise();
  }


}

