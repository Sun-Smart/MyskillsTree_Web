import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmsconsent } from '../model/hmsconsent.model';
import { environment } from '../../environments/environment';
import { IhmsconsentResponse } from '../model/hmsconsent.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmsconsentService {
  formData: hmsconsent;
  readonly rootURL = AppConstants.baseURL;
  list: hmsconsent[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmsconsents() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsconsent', body);
    }
  }

  saveOrUpdatehmsconsentsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsconsent', body);
    }
  }

  gethmsconsentsList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsconsent').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsconsent' + '/param/' + key).toPromise();
    }
  }

  gethmsconsentsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsconsent' + '/' + id).toPromise();
    }
  }

  deletehmsconsent(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmsconsent' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmsconsent')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

