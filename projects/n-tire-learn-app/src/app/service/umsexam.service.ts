import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umsexam } from '../model/umsexam.model';
import { umsstudentmark } from '../model/umsstudentmark.model';
import { umsexamtopic } from '../model/umsexamtopic.model';
import { environment } from '../../environments/environment';
import { IumsexamResponse } from '../model/umsexam.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umsexamService {
  formData: umsexam;
  readonly rootURL = AppConstants.ntirelearnURL;
  umsstudentmarks: umsstudentmark[] = [];
  umsexamtopics: umsexamtopic[] = [];
  Insertumsexamtopics: umsexamtopic[] = [];
  list: umsexam[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumsexams() {
    {
      var body = {
        ...this.formData,
        umsstudentmarks: this.umsstudentmarks.filter(function (el) { return Object.keys(el).length != 0; }),
        umsexamtopics: this.Insertumsexamtopics.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsexam', body);
    }
  }

  saveOrUpdateumsexamsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsexam', body);
    }
  }

  getumsexamsList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsexam').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsexam' + '/param/' + key).toPromise();
    }
  }

  getumsexamsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsexam' + '/' + id).toPromise();
    }
  }

  deleteumsexam(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umsexam' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.umsstudentmarks = [];
    this.umsexamtopics = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umsexam')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IumsexamResponse> {
    return this.http.get<IumsexamResponse>(AppConstants.ntirelearnURL + '/umsexam')
      .pipe(
        tap((response: IumsexamResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(umsexam => new umsexam(umsexam.examid, umsexam.courseid, umsexam.courseiddesc, umsexam.semesterid, umsexam.semesteriddesc, umsexam.examtype, umsexam.examtypedesc, umsexam.examtitle, umsexam.questions, umsexam.instructions, umsexam.totalmarks, umsexam.examdate, umsexam.fromtime, umsexam.totime, umsexam.sectionid, umsexam.sectioniddesc, umsexam.status, "", ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(umsexam => umsexam.description.includes(filter.name))

          return response;
        })
      );
  }



}

