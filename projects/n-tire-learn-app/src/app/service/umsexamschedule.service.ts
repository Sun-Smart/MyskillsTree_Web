import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umsexamschedule } from '../model/umsexamschedule.model';
import { umsstudentmark } from '../model/umsstudentmark.model';
import { environment } from '../../environments/environment';
import { IumsexamscheduleResponse } from '../model/umsexamschedule.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umsexamscheduleService {
  formData: umsexamschedule;
  readonly rootURL = AppConstants.ntirelearnURL;
  umsstudentmarks: umsstudentmark[] = [];
  list: umsexamschedule[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumsexamschedules() {
    {
      var body = {
        ...this.formData,
        umsstudentmarks: this.umsstudentmarks.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsexamschedule', body);
    }
  }

  saveOrUpdateumsexamschedulesList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsexamschedule', body);
    }
  }

  getumsexamschedulesList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsexamschedule').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsexamschedule' + '/param/' + key).toPromise();
    }
  }

  getumsexamschedulesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsexamschedule' + '/' + id).toPromise();
    }
  }

  deleteumsexamschedule(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umsexamschedule' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.umsstudentmarks = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umsexamschedule')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IumsexamscheduleResponse> {
    return this.http.get<IumsexamscheduleResponse>(AppConstants.ntirelearnURL + '/umsexamschedule')
      .pipe(
        tap((response: IumsexamscheduleResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(umsexamschedule => new umsexamschedule(umsexamschedule.examid, umsexamschedule.courseid, umsexamschedule.courseiddesc, umsexamschedule.semesterid, umsexamschedule.semesteriddesc, umsexamschedule.description, umsexamschedule.examdate, umsexamschedule.fromtime, umsexamschedule.totime, umsexamschedule.totalmarks, umsexamschedule.sectionid, umsexamschedule.sectioniddesc, umsexamschedule.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(umsexamschedule => umsexamschedule.description.includes(filter.name))

          return response;
        })
      );
  }



}

