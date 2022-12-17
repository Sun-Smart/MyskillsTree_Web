import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umsinstructormaster } from '../model/umsinstructormaster.model';
import { umsinstructorskill } from '../model/umsinstructorskill.model';
import { environment } from '../../environments/environment';
import { IumsinstructormasterResponse } from '../model/umsinstructormaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umsinstructormasterService {
  formData: umsinstructormaster;
  readonly rootURL = AppConstants.ntirelearnURL;
  umsinstructorskills: umsinstructorskill[] = [];
  list: umsinstructormaster[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumsinstructormasters() {
    {
      var body = {
        ...this.formData,
        umsinstructorskills: this.umsinstructorskills.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsinstructormaster', body);
    }
  }

  saveOrUpdateumsinstructormastersList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsinstructormaster', body);
    }
  }

  getumsinstructormastersList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsinstructormaster').toPromise();
    }
  }
  getListByemployeeid(employeeid: number) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsinstructormaster' + '/employeeid/' + employeeid).toPromise();
    }
  }

  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsinstructormaster' + '/param/' + key).toPromise();
    }
  }

  getumsinstructormastersByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsinstructormaster' + '/' + id).toPromise();
    }
  }

  deleteumsinstructormaster(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umsinstructormaster' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.umsinstructorskills = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umsinstructormaster')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IumsinstructormasterResponse> {
    return this.http.get<IumsinstructormasterResponse>(AppConstants.ntirelearnURL + '/umsinstructormaster')
      .pipe(
        tap((response: IumsinstructormasterResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(umsinstructormaster => new umsinstructormaster(umsinstructormaster.instructorid, umsinstructormaster.name, umsinstructormaster.contactno, umsinstructormaster.email, umsinstructormaster.instructortype, umsinstructormaster.instructortypedesc, umsinstructormaster.employeeid, umsinstructormaster.employeeiddesc, umsinstructormaster.department, umsinstructormaster.departmentdesc, umsinstructormaster.remarks, umsinstructormaster.customfield, umsinstructormaster.attachment, umsinstructormaster.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(umsinstructormaster => umsinstructormaster.name.includes(filter.name))

          return response;
        })
      );
  }



}

