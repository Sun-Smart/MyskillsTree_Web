import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bobranchmaster } from '../model/bobranchmaster.model';
import { bobranchholiday } from '../model/bobranchholiday.model';
import { bouserbranchaccess } from '../model/bouserbranchaccess.model';
import { bobranchlocation } from '../model/bobranchlocation.model';
import { environment } from '../../environments/environment';
import { IbobranchmasterResponse } from '../model/bobranchmaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bobranchmasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bobranchmasters(formData, bobranchholidays, bouserbranchaccesses, Insertbouserbranchaccesses, bobranchlocations,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        bobranchholidays: bobranchholidays.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        bouserbranchaccesses: Insertbouserbranchaccesses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        bobranchlocations: bobranchlocations.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/bobranchmaster', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchmaster' + '/getdefaultdata').toPromise();
    }
  }
  get_bobranchmasters_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchmaster').toPromise();
    }
  }
  getListBy_branchid(branchid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchmaster' + '/branchid/' + branchid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchmaster' + '/param/' + key).toPromise();
    }
  }


  get_bobranchmasters_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchmaster' + '/e/' + id).toPromise();
    }
  }
  get_bobranchmasters_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchmaster' + '/' + id).toPromise();
    }
  }

  delete_bobranchmaster(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bobranchmaster' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbobranchmasterResponse> {
    return this.http.get<IbobranchmasterResponse>(AppConstants.ntirebizURL + '/bobranchmaster')
      .pipe(
        tap((response: IbobranchmasterResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bobranchmaster => new bobranchmaster(bobranchmaster.branchid, bobranchmaster.branchcode, bobranchmaster.branchname, bobranchmaster.thumbnail, bobranchmaster.address1, bobranchmaster.address2, bobranchmaster.countryid, bobranchmaster.countryiddesc, bobranchmaster.stateid, bobranchmaster.stateiddesc, bobranchmaster.cityid, bobranchmaster.cityiddesc, bobranchmaster.locationid, bobranchmaster.locationiddesc, bobranchmaster.pin, bobranchmaster.latlong, bobranchmaster.starttime, bobranchmaster.endtime, bobranchmaster.weekoff1, bobranchmaster.weekoff1desc, bobranchmaster.weekoff2, bobranchmaster.weekoff2desc, bobranchmaster.remarks, bobranchmaster.totalregions, bobranchmaster.accounts, bobranchmaster.salespeople, bobranchmaster.resourceallocation, bobranchmaster.resourceallocationdesc, bobranchmaster.growthopportunity, bobranchmaster.growthopportunitydesc, bobranchmaster.salesdirector, bobranchmaster.salesdirectordesc, bobranchmaster.customersuccessdirector, bobranchmaster.customersuccessdirectordesc, bobranchmaster.customfield, bobranchmaster.attachment, bobranchmaster.status, "", "", ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bobranchmaster => bobranchmaster.branchname.includes(filter.name))

          return response;
        })
      );
  }


  getList_countryid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bobranchmaster' + '/getList_countryid').toPromise();
  }

  getList_stateid(countryid): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bobranchmaster' + '/getList_stateid/countryid').toPromise();
  }

  getList_cityid(stateid): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bobranchmaster' + '/getList_cityid/stateid').toPromise();
  }

  getList_locationid(cityid): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bobranchmaster' + '/getList_locationid/cityid').toPromise();
  }

  getList_weekoff1(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bobranchmaster' + '/getList_weekoff1/').toPromise();
  }

  getList_weekoff2(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bobranchmaster' + '/getList_weekoff2/').toPromise();
  }

  getList_resourceallocation(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bobranchmaster' + '/getList_resourceallocation/').toPromise();
  }

  getList_growthopportunity(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bobranchmaster' + '/getList_growthopportunity/').toPromise();
  }

  getList_salesdirector(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bobranchmaster' + '/getList_salesdirector').toPromise();
  }

  getList_customersuccessdirector(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bobranchmaster' + '/getList_customersuccessdirector').toPromise();
  }


}

