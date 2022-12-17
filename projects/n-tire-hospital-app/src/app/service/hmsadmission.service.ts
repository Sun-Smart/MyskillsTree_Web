import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmsadmission } from '../model/hmsadmission.model';
import { environment } from '../../environments/environment';
import { IhmsadmissionResponse } from '../model/hmsadmission.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmsadmissionService {
  formData: hmsadmission;
  readonly rootURL = AppConstants.baseURL;
  list: hmsadmission[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmsadmissions() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsadmission', body);
    }
  }

  saveOrUpdatehmsadmissionsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsadmission', body);
    }
  }

  gethmsadmissionsList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsadmission').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsadmission' + '/param/' + key).toPromise();
    }
  }

  gethmsadmissionsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsadmission' + '/' + id).toPromise();
    }
  }

  deletehmsadmission(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmsadmission' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmsadmission')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

