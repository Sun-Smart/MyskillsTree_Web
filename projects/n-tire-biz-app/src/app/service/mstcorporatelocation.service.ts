import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstcorporatelocation } from '../model/mstcorporatelocation.model';
import { environment } from '../../environments/environment';
import { ImstcorporatelocationResponse } from '../model/mstcorporatelocation.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class mstcorporatelocationService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_mstcorporatelocations(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/mstcorporatelocation', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstcorporatelocation' + '/getdefaultdata').toPromise();
    }
  }
  get_mstcorporatelocations_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstcorporatelocation').toPromise();
    }
  }
  getListBy_locationid(locationid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstcorporatelocation' + '/locationid/' + locationid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstcorporatelocation' + '/param/' + key).toPromise();
    }
  }


  get_mstcorporatelocations_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstcorporatelocation' + '/e/' + id).toPromise();
    }
  }
  get_mstcorporatelocations_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstcorporatelocation' + '/' + id).toPromise();
    }
  }

  delete_mstcorporatelocation(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/mstcorporatelocation' + '/' + id).toPromise();
    }
  }

  getList_countryid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstcorporatelocation' + '/getList_countryid').toPromise();
  }

  getList_stateid(stateid): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstcorporatelocation' + '/getList_stateid/' + stateid).toPromise();
  }

  getList_cityid(cityid): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstcorporatelocation' + '/getList_cityid/' + cityid).toPromise();
  }


}

