import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umsstudentmaster } from '../model/umsstudentmaster.model';
import { umsstudentmark } from '../model/umsstudentmark.model';
import { umsstudentfeemaster } from '../model/umsstudentfeemaster.model';
import { umsstudentcourse } from '../model/umsstudentcourse.model';
import { environment } from '../../environments/environment';
import { IumsstudentmasterResponse } from '../model/umsstudentmaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umsstudentmasterService {
  formData: umsstudentmaster;
  readonly rootURL = AppConstants.ntirelearnURL;
  umsstudentmarks: umsstudentmark[] = [];
  umsstudentfeemasters: umsstudentfeemaster[] = [];
  umsstudentcourses: umsstudentcourse[] = [];
  list: umsstudentmaster[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumsstudentmasters() {
    {
      var body = {
        ...this.formData,
        umsstudentmarks: this.umsstudentmarks.filter(function (el) { return Object.keys(el).length != 0; }),
        umsstudentfeemasters: this.umsstudentfeemasters.filter(function (el) { return Object.keys(el).length != 0; }),
        umsstudentcourses: this.umsstudentcourses.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsstudentmaster', body);
    }
  }

  saveOrUpdateumsstudentmastersList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsstudentmaster', body);
    }
  }

  getumsstudentmastersList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsstudentmaster').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsstudentmaster' + '/param/' + key).toPromise();
    }
  }

  getumsstudentmastersByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsstudentmaster' + '/' + id).toPromise();
    }
  }

  deleteumsstudentmaster(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umsstudentmaster' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.umsstudentmarks = [];
    this.umsstudentfeemasters = [];
    this.umsstudentcourses = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umsstudentmaster')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IumsstudentmasterResponse> {
    return this.http.get<IumsstudentmasterResponse>(AppConstants.ntirelearnURL + '/umsstudentmaster')
      .pipe(
        tap((response: IumsstudentmasterResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(umsstudentmaster => new umsstudentmaster(umsstudentmaster.studentid, umsstudentmaster.code, umsstudentmaster.firstname, umsstudentmaster.middlename, umsstudentmaster.lastname, umsstudentmaster.dob, umsstudentmaster.contactno, umsstudentmaster.email, umsstudentmaster.fathername, umsstudentmaster.mothername, umsstudentmaster.fathercontactno, umsstudentmaster.admissiondate, umsstudentmaster.validitystartdate, umsstudentmaster.validityenddate, umsstudentmaster.sectionid, umsstudentmaster.sectioniddesc, umsstudentmaster.courseid, umsstudentmaster.courseiddesc, umsstudentmaster.currentsemesterid, umsstudentmaster.currentsemesteriddesc, umsstudentmaster.customfield, umsstudentmaster.attachment, umsstudentmaster.status, "", "", ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(umsstudentmaster => umsstudentmaster.lastname.includes(filter.name))

          return response;
        })
      );
  }



}

