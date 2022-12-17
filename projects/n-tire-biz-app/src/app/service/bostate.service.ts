import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bostate } from '../model/bostate.model';
import { bocity } from '../model/bocity.model';
import { environment } from '../../environments/environment';
import { IbostateResponse } from '../model/bostate.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bostateService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bostates(formData, bocities,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        bocities: bocities.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/bostate', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bostate' + '/getdefaultdata').toPromise();
    }
  }
  get_bostates_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bostate').toPromise();
    }
  }
  getListBy_stateid(stateid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bostate' + '/stateid/' + stateid).toPromise();
    }
  }

  getListBy_countryid(countryid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bostate' + '/countryid/' + countryid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bostate' + '/param/' + key).toPromise();
    }
  }


  get_bostates_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bostate' + '/e/' + id).toPromise();
    }
  }
  get_bostates_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bostate' + '/' + id).toPromise();
    }
  }

  delete_bostate(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bostate' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbostateResponse> {
    return this.http.get<IbostateResponse>(AppConstants.ntirebizURL + '/bostate')
      .pipe(
        tap((response: IbostateResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bostate => new bostate(bostate.stateid, bostate.code, bostate.name, bostate.countryid, bostate.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bostate => bostate.name.includes(filter.name))

          return response;
        })
      );
  }



}

