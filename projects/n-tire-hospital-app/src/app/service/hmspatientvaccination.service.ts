import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmspatientvaccination } from '../model/hmspatientvaccination.model';
import { environment } from '../../environments/environment';
import { IhmspatientvaccinationResponse } from '../model/hmspatientvaccination.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmspatientvaccinationService {
  formData: hmspatientvaccination;
  readonly rootURL = AppConstants.baseURL;
  list: hmspatientvaccination[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmspatientvaccinations() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmspatientvaccination', body);
    }
  }

  saveOrUpdatehmspatientvaccinationsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmspatientvaccination', body);
    }
  }

  gethmspatientvaccinationsList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspatientvaccination').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspatientvaccination' + '/param/' + key).toPromise();
    }
  }

  gethmspatientvaccinationsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspatientvaccination' + '/' + id).toPromise();
    }
  }

  deletehmspatientvaccination(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmspatientvaccination' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmspatientvaccination')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

