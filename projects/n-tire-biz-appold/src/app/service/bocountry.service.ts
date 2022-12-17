import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bocountry } from '../model/bocountry.model';
import { bostate } from '../model/bostate.model';
import { environment } from '../../environments/environment';
import { IbocountryResponse } from '../model/bocountry.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bocountryService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bocountries(formData, bostates,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        bostates: bostates.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/bocountry', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocountry' + '/getdefaultdata').toPromise();
    }
  }
  get_bocountries_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocountry').toPromise();
    }
  }
  getListBy_countryid(countryid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocountry' + '/countryid/' + countryid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocountry' + '/param/' + key).toPromise();
    }
  }


  get_bocountries_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocountry' + '/e/' + id).toPromise();
    }
  }
  get_bocountries_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocountry' + '/' + id).toPromise();
    }
  }

  delete_bocountry(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bocountry' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbocountryResponse> {
    return this.http.get<IbocountryResponse>(AppConstants.ntirebizURL + '/bocountry')
      .pipe(
        tap((response: IbocountryResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bocountry => new bocountry(bocountry.countryid, bocountry.code, bocountry.name, bocountry.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bocountry => bocountry.name.includes(filter.name))

          return response;
        })
      );
  }



}

