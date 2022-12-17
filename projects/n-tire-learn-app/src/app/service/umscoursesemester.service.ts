import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umscoursesemester } from '../model/umscoursesemester.model';
import { environment } from '../../environments/environment';
import { IumscoursesemesterResponse } from '../model/umscoursesemester.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umscoursesemesterService {
  formData: umscoursesemester;
  readonly rootURL = AppConstants.ntirelearnURL;
  list: umscoursesemester[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumscoursesemesters() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umscoursesemester', body);
    }
  }

  saveOrUpdateumscoursesemestersList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umscoursesemester', body);
    }
  }

  getumscoursesemestersList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umscoursesemester').toPromise();
    }
  }
  getListBycourseid(courseid: number) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umscoursesemester' + '/courseid/' + courseid).toPromise();
    }
  }

  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umscoursesemester' + '/param/' + key).toPromise();
    }
  }

  getumscoursesemestersByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umscoursesemester' + '/' + id).toPromise();
    }
  }

  deleteumscoursesemester(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umscoursesemester' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umscoursesemester')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IumscoursesemesterResponse> {
    return this.http.get<IumscoursesemesterResponse>(AppConstants.ntirelearnURL + '/umscoursesemester')
      .pipe(
        tap((response: IumscoursesemesterResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(umscoursesemester => new umscoursesemester(umscoursesemester.semesterid, umscoursesemester.courseid, umscoursesemester.description, umscoursesemester.imageurl, umscoursesemester.semesterorder, umscoursesemester.responsiblepersonid, umscoursesemester.responsiblepersoniddesc, umscoursesemester.maxstrength, umscoursesemester.totalhours, umscoursesemester.customfield, umscoursesemester.attachment, umscoursesemester.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(umscoursesemester => umscoursesemester.description.includes(filter.name))

          return response;
        })
      );
  }



}

