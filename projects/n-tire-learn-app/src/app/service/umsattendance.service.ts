import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umsattendance } from '../model/umsattendance.model';
import { environment } from '../../environments/environment';
import { IumsattendanceResponse } from '../model/umsattendance.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umsattendanceService {
  formData: umsattendance;
  readonly rootURL = AppConstants.ntirelearnURL;
  list: umsattendance[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumsattendances() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsattendance', body);
    }
  }

  saveOrUpdateumsattendancesList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsattendance', body);
    }
  }

  getumsattendancesList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsattendance').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsattendance' + '/param/' + key).toPromise();
    }
  }

  getumsattendancesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsattendance' + '/' + id).toPromise();
    }
  }

  deleteumsattendance(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umsattendance' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umsattendance')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

