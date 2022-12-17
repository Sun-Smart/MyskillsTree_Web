import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmspatientfollowup } from '../model/hmspatientfollowup.model';
import { environment } from '../../environments/environment';
import { IhmspatientfollowupResponse } from '../model/hmspatientfollowup.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmspatientfollowupService {
  formData: hmspatientfollowup;
  readonly rootURL = AppConstants.baseURL;
  list: hmspatientfollowup[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmspatientfollowups() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmspatientfollowup', body);
    }
  }

  saveOrUpdatehmspatientfollowupsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmspatientfollowup', body);
    }
  }

  gethmspatientfollowupsList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspatientfollowup').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspatientfollowup' + '/param/' + key).toPromise();
    }
  }

  gethmspatientfollowupsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspatientfollowup' + '/' + id).toPromise();
    }
  }

  deletehmspatientfollowup(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmspatientfollowup' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmspatientfollowup')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

