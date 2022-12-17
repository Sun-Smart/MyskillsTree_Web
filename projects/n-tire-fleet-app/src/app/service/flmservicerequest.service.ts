import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flmservicerequest } from '../model/flmservicerequest.model';
import { flmservicerequestdetail } from '../model/flmservicerequestdetail.model';
import { environment } from '../../environments/environment';
import { IflmservicerequestResponse } from '../model/flmservicerequest.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class flmservicerequestService {
  formData: flmservicerequest;
  readonly rootURL = AppConstants.ntirefleetURL;
  flmservicerequestdetails: flmservicerequestdetail[] = [];
  list: flmservicerequest[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateflmservicerequests() {
    {
      var body = {
        ...this.formData,
        flmservicerequestdetails: this.flmservicerequestdetails.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmservicerequest', body);
    }
  }

  saveOrUpdateflmservicerequestsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmservicerequest', body);
    }
  }

  getflmservicerequestsList() {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmservicerequest').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmservicerequest' + '/param/' + key).toPromise();
    }
  }

  getflmservicerequestsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmservicerequest' + '/' + id).toPromise();
    }
  }

  deleteflmservicerequest(id: number) {
    {
      return this.http.delete(AppConstants.ntirefleetURL + '/flmservicerequest' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.flmservicerequestdetails = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirefleetURL + '/flmservicerequest')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IflmservicerequestResponse> {
    return this.http.get<IflmservicerequestResponse>(AppConstants.ntirefleetURL + '/flmservicerequest')
      .pipe(
        tap((response: IflmservicerequestResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(flmservicerequest => new flmservicerequest(flmservicerequest.servicerequestid, flmservicerequest.vehicleid, flmservicerequest.servicecategory, flmservicerequest.servicecategorydesc, flmservicerequest.description, flmservicerequest.odometerreading, flmservicerequest.startdate, flmservicerequest.starttime, flmservicerequest.enddate, flmservicerequest.endtime, flmservicerequest.vendorid, flmservicerequest.vendoriddesc, flmservicerequest.reference, flmservicerequest.details, flmservicerequest.labourcost, flmservicerequest.partscost, flmservicerequest.discountpercentage, flmservicerequest.discountamount, flmservicerequest.tax, flmservicerequest.taxamount, flmservicerequest.totalcost, flmservicerequest.comments, flmservicerequest.attachment, flmservicerequest.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(flmservicerequest => flmservicerequest.description.includes(filter.name))

          return response;
        })
      );
  }



}

