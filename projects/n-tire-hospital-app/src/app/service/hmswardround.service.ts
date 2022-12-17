import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmswardround } from '../model/hmswardround.model';
import { environment } from '../../environments/environment';
import { IhmswardroundResponse } from '../model/hmswardround.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmswardroundService {
  formData: hmswardround;
  readonly rootURL = AppConstants.baseURL;
  list: hmswardround[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmswardrounds() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmswardround', body);
    }
  }

  saveOrUpdatehmswardroundsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmswardround', body);
    }
  }

  gethmswardroundsList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmswardround').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmswardround' + '/param/' + key).toPromise();
    }
  }

  gethmswardroundsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmswardround' + '/' + id).toPromise();
    }
  }

  deletehmswardround(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmswardround' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmswardround')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

