import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmsestimate } from '../model/hmsestimate.model';
import { hmsestimatedetail } from '../model/hmsestimatedetail.model';
import { environment } from '../../environments/environment';
import { IhmsestimateResponse } from '../model/hmsestimate.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmsestimateService {
  formData: hmsestimate;
  readonly rootURL = AppConstants.baseURL;
  hmsestimatedetails: hmsestimatedetail[] = [];
  list: hmsestimate[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmsestimates() {
    {
      var body = {
        ...this.formData,
        hmsestimatedetails: this.hmsestimatedetails.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsestimate', body);
    }
  }

  saveOrUpdatehmsestimatesList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsestimate', body);
    }
  }

  gethmsestimatesList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsestimate').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsestimate' + '/param/' + key).toPromise();
    }
  }

  gethmsestimatesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsestimate' + '/' + id).toPromise();
    }
  }

  deletehmsestimate(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmsestimate' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.hmsestimatedetails = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmsestimate')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IhmsestimateResponse> {
    return this.http.get<IhmsestimateResponse>(AppConstants.ntirehospitalURL + '/hmsestimate')
      .pipe(
        tap((response: IhmsestimateResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(hmsestimate => new hmsestimate(hmsestimate.estimateid, hmsestimate.patientid, hmsestimate.estimatecode, hmsestimate.estimatedate, hmsestimate.estimatedamount, hmsestimate.discountpercentage, hmsestimate.discountamount, hmsestimate.taxpercentage, hmsestimate.taxamount, hmsestimate.netamount, hmsestimate.comments, hmsestimate.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(hmsestimate => hmsestimate.estimatecode.includes(filter.name))

          return response;
        })
      );
  }



}

