import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flmvehiclepermit } from '../model/flmvehiclepermit.model';
import { environment } from '../../environments/environment';
import { IflmvehiclepermitResponse } from '../model/flmvehiclepermit.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class flmvehiclepermitService {
  formData: flmvehiclepermit;
  readonly rootURL = AppConstants.ntirefleetURL;
  list: flmvehiclepermit[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateflmvehiclepermits() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmvehiclepermit', body);
    }
  }

  saveOrUpdateflmvehiclepermitsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmvehiclepermit', body);
    }
  }

  getflmvehiclepermitsList() {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmvehiclepermit').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmvehiclepermit' + '/param/' + key).toPromise();
    }
  }

  getflmvehiclepermitsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmvehiclepermit' + '/' + id).toPromise();
    }
  }

  deleteflmvehiclepermit(id: number) {
    {
      return this.http.delete(AppConstants.ntirefleetURL + '/flmvehiclepermit' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirefleetURL + '/flmvehiclepermit')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IflmvehiclepermitResponse> {
    return this.http.get<IflmvehiclepermitResponse>(AppConstants.ntirefleetURL + '/flmvehiclepermit')
      .pipe(
        tap((response: IflmvehiclepermitResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(flmvehiclepermit => new flmvehiclepermit(flmvehiclepermit.permitid, flmvehiclepermit.vehicleid, flmvehiclepermit.validenddate, flmvehiclepermit.issuingauthority, flmvehiclepermit.fitnesscertificateenddate, flmvehiclepermit.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(flmvehiclepermit => flmvehiclepermit.issuingauthority.includes(filter.name))

          return response;
        })
      );
  }



}

