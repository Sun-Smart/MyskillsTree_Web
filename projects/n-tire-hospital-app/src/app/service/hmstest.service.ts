import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmstest } from '../model/hmstest.model';
import { environment } from '../../environments/environment';
import { IhmstestResponse } from '../model/hmstest.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmstestService {
  formData: hmstest;
  readonly rootURL = AppConstants.baseURL;
  list: hmstest[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmstests() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmstest', body);
    }
  }

  saveOrUpdatehmstestsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmstest', body);
    }
  }

  gethmstestsList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmstest').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmstest' + '/param/' + key).toPromise();
    }
  }

  gethmstestsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmstest' + '/' + id).toPromise();
    }
  }

  deletehmstest(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmstest' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmstest')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IhmstestResponse> {
    return this.http.get<IhmstestResponse>(AppConstants.ntirehospitalURL + '/hmstest')
      .pipe(
        tap((response: IhmstestResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(hmstest => new hmstest(hmstest.testid, hmstest.testname, hmstest.cost, hmstest.instructions, hmstest.notes, hmstest.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(hmstest => hmstest.testname.includes(filter.name))

          return response;
        })
      );
  }



}

