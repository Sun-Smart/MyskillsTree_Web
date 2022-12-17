import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umsstudentcourse } from '../model/umsstudentcourse.model';
import { environment } from '../../environments/environment';
import { IumsstudentcourseResponse } from '../model/umsstudentcourse.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umsstudentcourseService {
  formData: umsstudentcourse;
  readonly rootURL = AppConstants.ntirelearnURL;
  list: umsstudentcourse[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumsstudentcourses() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsstudentcourse', body);
    }
  }

  saveOrUpdateumsstudentcoursesList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsstudentcourse', body);
    }
  }

  getumsstudentcoursesList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsstudentcourse').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsstudentcourse' + '/param/' + key).toPromise();
    }
  }

  getumsstudentcoursesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsstudentcourse' + '/' + id).toPromise();
    }
  }

  deleteumsstudentcourse(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umsstudentcourse' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umsstudentcourse')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

