import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmspatientvisit } from '../model/hmspatientvisit.model';
import { environment } from '../../environments/environment';
import { IhmspatientvisitResponse } from '../model/hmspatientvisit.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmspatientvisitService {
  formData: hmspatientvisit;
  readonly rootURL = AppConstants.baseURL;
  list: hmspatientvisit[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmspatientvisits() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmspatientvisit', body);
    }
  }

  saveOrUpdatehmspatientvisitsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmspatientvisit', body);
    }
  }

  gethmspatientvisitsList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspatientvisit').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspatientvisit' + '/param/' + key).toPromise();
    }
  }

  gethmspatientvisitsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspatientvisit' + '/' + id).toPromise();
    }
  }

  deletehmspatientvisit(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmspatientvisit' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmspatientvisit')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

