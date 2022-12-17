import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmstests } from '../model/hmstests.model';
import { environment } from '../../environments/environment';
import { IhmstestsResponse } from '../model/hmstests.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmstestsService {
  formData: hmstests;
  readonly rootURL = AppConstants.baseURL;
  list: hmstests[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmstests() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmstests', body);
    }
  }

  saveOrUpdatehmstestsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmstests', body);
    }
  }

  gethmstestsList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmstests').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmstests' + '/param/' + key).toPromise();
    }
  }

  gethmstestsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmstests' + '/' + id).toPromise();
    }
  }

  deletehmstests(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmstests' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmstests')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IhmstestsResponse> {
    return this.http.get<IhmstestsResponse>(AppConstants.ntirehospitalURL + '/hmstests')
      .pipe(
        tap((response: IhmstestsResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(hmstests => new hmstests(hmstests.testid, hmstests.testname, hmstests.cost, hmstests.instructions, hmstests.notes, hmstests.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(hmstests => hmstests.testname.includes(filter.name))

          return response;
        })
      );
  }



}

