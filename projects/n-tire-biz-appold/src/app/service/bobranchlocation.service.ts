import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bobranchlocation } from '../model/bobranchlocation.model';
import { bobranchsublocation } from '../model/bobranchsublocation.model';
import { environment } from '../../environments/environment';
import { IbobranchlocationResponse } from '../model/bobranchlocation.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bobranchlocationService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bobranchlocations(formData, bobranchsublocations,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        bobranchsublocations: bobranchsublocations.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/bobranchlocation', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchlocation' + '/getdefaultdata').toPromise();
    }
  }
  get_bobranchlocations_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchlocation').toPromise();
    }
  }
  getListBy_locationid(locationid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchlocation' + '/locationid/' + locationid).toPromise();
    }
  }

  getListBy_branchid(branchid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchlocation' + '/branchid/' + branchid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchlocation' + '/param/' + key).toPromise();
    }
  }


  get_bobranchlocations_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchlocation' + '/e/' + id).toPromise();
    }
  }
  get_bobranchlocations_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchlocation' + '/' + id).toPromise();
    }
  }

  delete_bobranchlocation(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bobranchlocation' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbobranchlocationResponse> {
    return this.http.get<IbobranchlocationResponse>(AppConstants.ntirebizURL + '/bobranchlocation')
      .pipe(
        tap((response: IbobranchlocationResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bobranchlocation => new bobranchlocation(bobranchlocation.branchid, bobranchlocation.locationid, bobranchlocation.locationcode, bobranchlocation.locationcodedesc, bobranchlocation.locationname, bobranchlocation.tag, bobranchlocation.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bobranchlocation => bobranchlocation.locationname.includes(filter.name))

          return response;
        })
      );
  }


  getList_locationcode(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bobranchlocation' + '/getList_locationcode/').toPromise();
  }


}

