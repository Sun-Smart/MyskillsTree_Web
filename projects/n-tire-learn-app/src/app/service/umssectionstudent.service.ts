import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umssectionstudent } from '../model/umssectionstudent.model';
import { environment } from '../../environments/environment';
import { IumssectionstudentResponse } from '../model/umssectionstudent.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umssectionstudentService {
  formData: umssectionstudent;
  readonly rootURL = AppConstants.ntirelearnURL;
  list: umssectionstudent[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumssectionstudents() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umssectionstudent', body);
    }
  }

  saveOrUpdateumssectionstudentsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umssectionstudent', body);
    }
  }

  getumssectionstudentsList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umssectionstudent').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umssectionstudent' + '/param/' + key).toPromise();
    }
  }

  getumssectionstudentsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umssectionstudent' + '/' + id).toPromise();
    }
  }

  deleteumssectionstudent(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umssectionstudent' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umssectionstudent')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

