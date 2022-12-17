import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmspatientdischarge } from '../model/hmspatientdischarge.model';
import { environment } from '../../environments/environment';
import { IhmspatientdischargeResponse } from '../model/hmspatientdischarge.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmspatientdischargeService {
  formData: hmspatientdischarge;
  readonly rootURL = AppConstants.baseURL;
  list: hmspatientdischarge[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmspatientdischarges() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmspatientdischarge', body);
    }
  }

  saveOrUpdatehmspatientdischargesList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmspatientdischarge', body);
    }
  }

  gethmspatientdischargesList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspatientdischarge').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspatientdischarge' + '/param/' + key).toPromise();
    }
  }

  gethmspatientdischargesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspatientdischarge' + '/' + id).toPromise();
    }
  }

  deletehmspatientdischarge(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmspatientdischarge' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmspatientdischarge')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

