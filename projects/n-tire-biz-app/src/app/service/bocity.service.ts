import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bocity } from '../model/bocity.model';
import { bolocation } from '../model/bolocation.model';
import { environment } from '../../environments/environment';
import { IbocityResponse } from '../model/bocity.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bocityService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bocities(formData, bolocations,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        bolocations: bolocations.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/bocity', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocity' + '/getdefaultdata').toPromise();
    }
  }
  get_bocities_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocity').toPromise();
    }
  }
  getListBy_cityid(cityid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocity' + '/cityid/' + cityid).toPromise();
    }
  }

  getListBy_stateid(stateid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocity' + '/stateid/' + stateid).toPromise();
    }
  }

  getListBy_countryid(countryid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocity' + '/countryid/' + countryid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocity' + '/param/' + key).toPromise();
    }
  }


  get_bocities_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocity' + '/e/' + id).toPromise();
    }
  }
  get_bocities_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocity' + '/' + id).toPromise();
    }
  }

  delete_bocity(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bocity' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbocityResponse> {
    return this.http.get<IbocityResponse>(AppConstants.ntirebizURL + '/bocity')
      .pipe(
        tap((response: IbocityResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bocity => new bocity(bocity.cityid, bocity.code, bocity.name, bocity.stateid, bocity.countryid, bocity.countryiddesc, bocity.metro, bocity.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bocity => bocity.name.includes(filter.name))

          return response;
        })
      );
  }


  getList_countryid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bocity' + '/getList_countryid').toPromise();
  }


}

