import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umscourse } from '../model/umscourse.model';
import { umscoursesemester } from '../model/umscoursesemester.model';
import { umssemestertopic } from '../model/umssemestertopic.model';
import { environment } from '../../environments/environment';
import { IumscourseResponse } from '../model/umscourse.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umscourseService {
  formData: umscourse;
  readonly rootURL = AppConstants.ntirelearnURL;
  umscoursesemesters: umscoursesemester[] = [];
  umssemestertopics: umssemestertopic[] = [];
  Insertumssemestertopics: umssemestertopic[] = [];
  list: umscourse[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumscourses() {
    {
      var body = {
        ...this.formData,
        umscoursesemesters: this.umscoursesemesters.filter(function (el) { return Object.keys(el).length != 0; }),
        umssemestertopics: this.Insertumssemestertopics.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umscourse', body);
    }
  }

  saveOrUpdateumscoursesList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umscourse', body);
    }
  }

  getumscoursesList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umscourse').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umscourse' + '/param/' + key).toPromise();
    }
  }

  getumscoursesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umscourse' + '/' + id).toPromise();
    }
  }

  deleteumscourse(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umscourse' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.umscoursesemesters = [];
    this.umssemestertopics = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umscourse')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IumscourseResponse> {
    return this.http.get<IumscourseResponse>(AppConstants.ntirelearnURL + '/umscourse')
      .pipe(
        tap((response: IumscourseResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(umscourse => new umscourse(umscourse.courseid, umscourse.code, umscourse.coursename, umscourse.description, umscourse.language, umscourse.languagedesc, umscourse.imageurl, umscourse.totalhours, umscourse.totalfee, umscourse.generatecertificate, umscourse.mailcertificate, umscourse.customfield, umscourse.attachment, umscourse.status, "", ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(umscourse => umscourse.description.includes(filter.name))

          return response;
        })
      );
  }



}

