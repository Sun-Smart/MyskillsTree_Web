import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmspatientpaymentdetail } from '../model/hmspatientpaymentdetail.model';
import { environment } from '../../environments/environment';
import { IhmspatientpaymentdetailResponse } from '../model/hmspatientpaymentdetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmspatientpaymentdetailService {
  formData: hmspatientpaymentdetail;
  readonly rootURL = AppConstants.baseURL;
  list: hmspatientpaymentdetail[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmspatientpaymentdetails() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmspatientpaymentdetail', body);
    }
  }

  saveOrUpdatehmspatientpaymentdetailsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmspatientpaymentdetail', body);
    }
  }

  gethmspatientpaymentdetailsList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspatientpaymentdetail').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspatientpaymentdetail' + '/param/' + key).toPromise();
    }
  }

  gethmspatientpaymentdetailsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspatientpaymentdetail' + '/' + id).toPromise();
    }
  }

  deletehmspatientpaymentdetail(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmspatientpaymentdetail' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmspatientpaymentdetail')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

