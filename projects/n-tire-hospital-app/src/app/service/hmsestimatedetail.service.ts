import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmsestimatedetail } from '../model/hmsestimatedetail.model';
import { environment } from '../../environments/environment';
import { IhmsestimatedetailResponse } from '../model/hmsestimatedetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmsestimatedetailService {
  formData: hmsestimatedetail;
  readonly rootURL = AppConstants.baseURL;
  list: hmsestimatedetail[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmsestimatedetails() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsestimatedetail', body);
    }
  }

  saveOrUpdatehmsestimatedetailsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsestimatedetail', body);
    }
  }

  gethmsestimatedetailsList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsestimatedetail').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsestimatedetail' + '/param/' + key).toPromise();
    }
  }

  gethmsestimatedetailsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsestimatedetail' + '/' + id).toPromise();
    }
  }

  deletehmsestimatedetail(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmsestimatedetail' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmsestimatedetail')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

