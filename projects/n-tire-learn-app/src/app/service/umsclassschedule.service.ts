import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umsclassschedule } from '../model/umsclassschedule.model';
import { umsattendance } from '../model/umsattendance.model';
import { environment } from '../../environments/environment';
import { IumsclassscheduleResponse } from '../model/umsclassschedule.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umsclassscheduleService {
  formData: umsclassschedule;
  readonly rootURL = AppConstants.ntirelearnURL;
  umsattendances: umsattendance[] = [];
  Insertumsattendances: umsattendance[] = [];
  list: umsclassschedule[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumsclassschedules() {
    {
      var body = {
        ...this.formData,
        umsattendances: this.Insertumsattendances.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsclassschedule', body);
    }
  }

  saveOrUpdateumsclassschedulesList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsclassschedule', body);
    }
  }

  getumsclassschedulesList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsclassschedule').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsclassschedule' + '/param/' + key).toPromise();
    }
  }

  getumsclassschedulesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsclassschedule' + '/' + id).toPromise();
    }
  }

  deleteumsclassschedule(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umsclassschedule' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.umsattendances = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umsclassschedule')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

