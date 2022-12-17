import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsgrademasters } from '../model/hrmsgrademasters.model';
import { environment } from '../../environments/environment';
import { IhrmsgrademastersResponse } from '../model/hrmsgrademasters.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsgrademastersService {
  formData: hrmsgrademasters;
  readonly rootURL = AppConstants.ntirehrmsURL;
  list: hrmsgrademasters[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehrmsgrademasters() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsgrademasters', body);
    }
  }

  saveOrUpdatehrmsgrademastersList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsgrademasters', body);
    }
  }

  gethrmsgrademastersList() {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsgrademasters').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsgrademasters' + '/param/' + key).toPromise();
    }
  }

  gethrmsgrademastersByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsgrademasters' + '/' + id).toPromise();
    }
  }

  deletehrmsgrademasters(id: number) {
    {
      return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsgrademasters' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehrmsURL + '/hrmsgrademasters')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

