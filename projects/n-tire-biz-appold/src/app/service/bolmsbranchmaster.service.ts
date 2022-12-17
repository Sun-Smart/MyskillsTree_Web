import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bolmsbranchmaster } from '../model/bolmsbranchmaster.model';
import { environment } from '../../environments/environment';
import { IbolmsbranchmasterResponse } from '../model/bolmsbranchmaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bolmsbranchmasterService {
  formData: bolmsbranchmaster;
  readonly rootURL = AppConstants.baseURL;
  list: bolmsbranchmaster[];

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatebobranchmasters(): any {
    if (this.valid()) {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/bolmsbranchmaster', body);
    }
  }

  saveOrUpdatebobranchmastersList(): any {
    if (this.valid()) {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirebizURL + '/bolmsbranchmaster', body);
    }
  }

  getbobranchmastersList(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bolmsbranchmaster').toPromise();
    }
  }
  getListBybranchid(branchid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bolmsbranchmaster' + '/branchid/' + branchid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bolmsbranchmaster' + '/param/' + key).toPromise();
    }
  }


  getbobranchmastersByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bolmsbranchmaster' + '/e/' + id).toPromise();
    }
  }
  getbobranchmastersByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bolmsbranchmaster' + '/' + id).toPromise();
    }
  }

  deletebobranchmaster(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bolmsbranchmaster' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    if (this.valid()) {
      this.http.get(AppConstants.ntirebizURL + '/bobranchmaster')
        .toPromise()
        .then(res => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbolmsbranchmasterResponse> {
    return this.http.get<IbolmsbranchmasterResponse>(AppConstants.ntirebizURL + '/bolmsbranchmaster')
      .pipe(
        tap((response: IbolmsbranchmasterResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bobranchmaster => new bobranchmaster(bobranchmaster.branchid, bobranchmaster.branchcode, bobranchmaster.branchname, bobranchmaster.thumbnail, bobranchmaster.address1, bobranchmaster.address2, bobranchmaster.countryid, bobranchmaster.countryiddesc, bobranchmaster.stateid, bobranchmaster.stateiddesc, bobranchmaster.cityid, bobranchmaster.cityiddesc, bobranchmaster.locationid, bobranchmaster.locationiddesc, bobranchmaster.pin, bobranchmaster.latlong, bobranchmaster.starttime, bobranchmaster.endtime, bobranchmaster.weekoff1, bobranchmaster.weekoff1desc, bobranchmaster.weekoff2, bobranchmaster.weekoff2desc, bobranchmaster.remarks, bobranchmaster.totalregions, bobranchmaster.accounts, bobranchmaster.salespeople, bobranchmaster.resourceallocation, bobranchmaster.resourceallocationdesc, bobranchmaster.growthopportunity, bobranchmaster.growthopportunitydesc, bobranchmaster.salesdirector, bobranchmaster.salesdirectordesc, bobranchmaster.customersuccessdirector, bobranchmaster.customersuccessdirectordesc, bobranchmaster.customfield, bobranchmaster.attachment, bobranchmaster.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bobranchmaster => bobranchmaster.branchname.includes(filter.name))

          return response;
        })
      );
  }



}

