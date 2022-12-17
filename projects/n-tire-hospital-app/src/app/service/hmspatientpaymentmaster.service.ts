import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmspatientpaymentmaster } from '../model/hmspatientpaymentmaster.model';
import { hmspatientpaymentdetail } from '../model/hmspatientpaymentdetail.model';
import { environment } from '../../environments/environment';
import { IhmspatientpaymentmasterResponse } from '../model/hmspatientpaymentmaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmspatientpaymentmasterService {
  formData: hmspatientpaymentmaster;
  readonly rootURL = AppConstants.baseURL;
  hmspatientpaymentdetails: hmspatientpaymentdetail[] = [];
  list: hmspatientpaymentmaster[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmspatientpaymentmasters() {
    {
      var body = {
        ...this.formData,
        hmspatientpaymentdetails: this.hmspatientpaymentdetails.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmspatientpaymentmaster', body);
    }
  }

  saveOrUpdatehmspatientpaymentmastersList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmspatientpaymentmaster', body);
    }
  }

  gethmspatientpaymentmastersList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspatientpaymentmaster').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspatientpaymentmaster' + '/param/' + key).toPromise();
    }
  }

  gethmspatientpaymentmastersByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspatientpaymentmaster' + '/' + id).toPromise();
    }
  }

  deletehmspatientpaymentmaster(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmspatientpaymentmaster' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.hmspatientpaymentdetails = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmspatientpaymentmaster')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

