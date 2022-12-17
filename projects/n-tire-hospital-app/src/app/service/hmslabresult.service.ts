import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmslabresult } from '../model/hmslabresult.model';
import { environment } from '../../environments/environment';
import { IhmslabresultResponse } from '../model/hmslabresult.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmslabresultService {
  formData: hmslabresult;
  readonly rootURL = AppConstants.baseURL;
  list: hmslabresult[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmslabresults() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmslabresult', body);
    }
  }

  saveOrUpdatehmslabresultsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmslabresult', body);
    }
  }

  gethmslabresultsList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmslabresult').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmslabresult' + '/param/' + key).toPromise();
    }
  }

  gethmslabresultsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmslabresult' + '/' + id).toPromise();
    }
  }

  deletehmslabresult(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmslabresult' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmslabresult')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

