import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umsinstructorskill } from '../model/umsinstructorskill.model';
import { environment } from '../../environments/environment';
import { IumsinstructorskillResponse } from '../model/umsinstructorskill.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umsinstructorskillService {
  formData: umsinstructorskill;
  readonly rootURL = AppConstants.ntirelearnURL;
  list: umsinstructorskill[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumsinstructorskills() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsinstructorskill', body);
    }
  }

  saveOrUpdateumsinstructorskillsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsinstructorskill', body);
    }
  }

  getumsinstructorskillsList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsinstructorskill').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsinstructorskill' + '/param/' + key).toPromise();
    }
  }

  getumsinstructorskillsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsinstructorskill' + '/' + id).toPromise();
    }
  }

  deleteumsinstructorskill(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umsinstructorskill' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umsinstructorskill')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

