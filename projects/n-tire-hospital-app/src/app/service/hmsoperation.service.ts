import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmsoperation } from '../model/hmsoperation.model';
import { environment } from '../../environments/environment';
import { IhmsoperationResponse } from '../model/hmsoperation.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmsoperationService {
  formData: hmsoperation;
  readonly rootURL = AppConstants.baseURL;
  list: hmsoperation[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmsoperations() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsoperation', body);
    }
  }

  saveOrUpdatehmsoperationsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsoperation', body);
    }
  }

  gethmsoperationsList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsoperation').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsoperation' + '/param/' + key).toPromise();
    }
  }

  gethmsoperationsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsoperation' + '/' + id).toPromise();
    }
  }

  deletehmsoperation(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmsoperation' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmsoperation')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

