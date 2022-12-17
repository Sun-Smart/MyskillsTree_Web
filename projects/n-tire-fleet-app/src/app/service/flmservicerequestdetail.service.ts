import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flmservicerequestdetail } from '../model/flmservicerequestdetail.model';
import { environment } from '../../environments/environment';
import { IflmservicerequestdetailResponse } from '../model/flmservicerequestdetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class flmservicerequestdetailService {
  formData: flmservicerequestdetail;
  readonly rootURL = AppConstants.ntirefleetURL;
  list: flmservicerequestdetail[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateflmservicerequestdetails() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmservicerequestdetail', body);
    }
  }

  saveOrUpdateflmservicerequestdetailsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmservicerequestdetail', body);
    }
  }

  getflmservicerequestdetailsList() {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmservicerequestdetail').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmservicerequestdetail' + '/param/' + key).toPromise();
    }
  }

  getflmservicerequestdetailsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmservicerequestdetail' + '/' + id).toPromise();
    }
  }

  deleteflmservicerequestdetail(id: number) {
    {
      return this.http.delete(AppConstants.ntirefleetURL + '/flmservicerequestdetail' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirefleetURL + '/flmservicerequestdetail')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IflmservicerequestdetailResponse> {
    return this.http.get<IflmservicerequestdetailResponse>(AppConstants.ntirefleetURL + '/flmservicerequestdetail')
      .pipe(
        tap((response: IflmservicerequestdetailResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(flmservicerequestdetail => new flmservicerequestdetail(flmservicerequestdetail.servicetaskid, flmservicerequestdetail.servicerequestid, flmservicerequestdetail.taskid, flmservicerequestdetail.taskiddesc, flmservicerequestdetail.description, flmservicerequestdetail.vehicleissueid1, flmservicerequestdetail.vehicleissueid2, flmservicerequestdetail.labourcost, flmservicerequestdetail.itemcost, flmservicerequestdetail.remarks, flmservicerequestdetail.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(flmservicerequestdetail => flmservicerequestdetail.description.includes(filter.name))

          return response;
        })
      );
  }



}

