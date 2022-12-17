import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsapplicationcareer } from '../model/hrmsapplicationcareer.model';
import { environment } from '../../environments/environment';
import { IhrmsapplicationcareerResponse } from '../model/hrmsapplicationcareer.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsapplicationcareerService {
  formData: hrmsapplicationcareer;
  readonly rootURL = AppConstants.ntirehrmsURL;
  list: hrmsapplicationcareer[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehrmsapplicationcareers() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsapplicationcareer', body);
    }
  }

  saveOrUpdatehrmsapplicationcareersList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsapplicationcareer', body);
    }
  }

  gethrmsapplicationcareersList() {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicationcareer').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicationcareer' + '/param/' + key).toPromise();
    }
  }

  gethrmsapplicationcareersByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicationcareer' + '/' + id).toPromise();
    }
  }

  deletehrmsapplicationcareer(id: number) {
    {
      return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsapplicationcareer' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicationcareer')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

