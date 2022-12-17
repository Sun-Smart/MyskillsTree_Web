import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmswardincharge } from '../model/hmswardincharge.model';
import { environment } from '../../environments/environment';
import { IhmswardinchargeResponse } from '../model/hmswardincharge.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmswardinchargeService {
  formData: hmswardincharge;
  readonly rootURL = AppConstants.baseURL;
  list: hmswardincharge[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmswardincharges() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmswardincharge', body);
    }
  }

  saveOrUpdatehmswardinchargesList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmswardincharge', body);
    }
  }

  gethmswardinchargesList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmswardincharge').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmswardincharge' + '/param/' + key).toPromise();
    }
  }

  gethmswardinchargesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmswardincharge' + '/' + id).toPromise();
    }
  }

  deletehmswardincharge(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmswardincharge' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmswardincharge')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

