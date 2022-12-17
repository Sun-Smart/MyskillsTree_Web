import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flmvehicleissue } from '../model/flmvehicleissue.model';
import { environment } from '../../environments/environment';
import { IflmvehicleissueResponse } from '../model/flmvehicleissue.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class flmvehicleissueService {
  formData: flmvehicleissue;
  readonly rootURL = AppConstants.ntirefleetURL;
  list: flmvehicleissue[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateflmvehicleissues() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmvehicleissue', body);
    }
  }

  saveOrUpdateflmvehicleissuesList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmvehicleissue', body);
    }
  }

  getflmvehicleissuesList() {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmvehicleissue').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmvehicleissue' + '/param/' + key).toPromise();
    }
  }

  getflmvehicleissuesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmvehicleissue' + '/' + id).toPromise();
    }
  }

  deleteflmvehicleissue(id: number) {
    {
      return this.http.delete(AppConstants.ntirefleetURL + '/flmvehicleissue' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirefleetURL + '/flmvehicleissue')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IflmvehicleissueResponse> {
    return this.http.get<IflmvehicleissueResponse>(AppConstants.ntirefleetURL + '/flmvehicleissue')
      .pipe(
        tap((response: IflmvehicleissueResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(flmvehicleissue => new flmvehicleissue(flmvehicleissue.issueid, flmvehicleissue.description, flmvehicleissue.vehicleid, flmvehicleissue.issuedate, flmvehicleissue.detaildescription, flmvehicleissue.odometer, flmvehicleissue.issuecategory, flmvehicleissue.issuecategorydesc, flmvehicleissue.severity, flmvehicleissue.severitydesc, flmvehicleissue.priority, flmvehicleissue.prioritydesc, flmvehicleissue.reportedby, flmvehicleissue.reportedbydesc, flmvehicleissue.assignedto, flmvehicleissue.assignedtodesc, flmvehicleissue.attachment, flmvehicleissue.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(flmvehicleissue => flmvehicleissue.description.includes(filter.name))

          return response;
        })
      );
  }



}

