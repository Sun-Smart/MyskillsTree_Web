import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flmaccident } from '../model/flmaccident.model';
import { environment } from '../../environments/environment';
import { IflmaccidentResponse } from '../model/flmaccident.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class flmaccidentService {
  formData: flmaccident;
  readonly rootURL = AppConstants.ntirefleetURL;
  list: flmaccident[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateflmaccidents() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmaccident', body);
    }
  }

  saveOrUpdateflmaccidentsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmaccident', body);
    }
  }

  getflmaccidentsList() {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmaccident').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmaccident' + '/param/' + key).toPromise();
    }
  }

  getflmaccidentsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmaccident' + '/' + id).toPromise();
    }
  }

  deleteflmaccident(id: number) {
    {
      return this.http.delete(AppConstants.ntirefleetURL + '/flmaccident' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirefleetURL + '/flmaccident')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IflmaccidentResponse> {
    return this.http.get<IflmaccidentResponse>(AppConstants.ntirefleetURL + '/flmaccident')
      .pipe(
        tap((response: IflmaccidentResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(flmaccident => new flmaccident(flmaccident.accidentid, flmaccident.vehicleid, flmaccident.description, flmaccident.accidentdetails, flmaccident.driverid, flmaccident.driveriddesc, flmaccident.learnerlicense, flmaccident.licenseno, flmaccident.rto, flmaccident.copassengerdetails, flmaccident.goodscarried, flmaccident.accidenttype, flmaccident.accidentplace, flmaccident.accidentdate, flmaccident.accidenttime, flmaccident.policereportlodged, flmaccident.policestationname, flmaccident.firno, flmaccident.insuranceid, flmaccident.claimdate, flmaccident.claimamount, flmaccident.amountreceived, flmaccident.comments, flmaccident.attachment, flmaccident.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(flmaccident => flmaccident.description.includes(filter.name))

          return response;
        })
      );
  }



}

