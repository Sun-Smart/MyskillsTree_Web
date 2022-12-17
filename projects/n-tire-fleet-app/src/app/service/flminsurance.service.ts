import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flminsurance } from '../model/flminsurance.model';
import { environment } from '../../environments/environment';
import { IflminsuranceResponse } from '../model/flminsurance.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class flminsuranceService {
  formData: flminsurance;
  readonly rootURL = AppConstants.ntirefleetURL;
  list: flminsurance[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateflminsurances() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flminsurance', body);
    }
  }

  saveOrUpdateflminsurancesList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flminsurance', body);
    }
  }

  getflminsurancesList() {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flminsurance').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flminsurance' + '/param/' + key).toPromise();
    }
  }

  getflminsurancesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flminsurance' + '/' + id).toPromise();
    }
  }

  deleteflminsurance(id: number) {
    {
      return this.http.delete(AppConstants.ntirefleetURL + '/flminsurance' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirefleetURL + '/flminsurance')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IflminsuranceResponse> {
    return this.http.get<IflminsuranceResponse>(AppConstants.ntirefleetURL + '/flminsurance')
      .pipe(
        tap((response: IflminsuranceResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(flminsurance => new flminsurance(flminsurance.insuranceid, flminsurance.vehicleid, flminsurance.insurancecompany, flminsurance.policyid, flminsurance.startdate, flminsurance.expireddate, flminsurance.coveragetype, flminsurance.coveragetypedesc, flminsurance.coverageamount, flminsurance.attachment, flminsurance.remarks, flminsurance.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(flminsurance => flminsurance.insurancecompany.includes(filter.name))

          return response;
        })
      );
  }



}

