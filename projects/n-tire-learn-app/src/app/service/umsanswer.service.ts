import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umsanswer } from '../model/umsanswer.model';
import { environment } from '../../environments/environment';
import { IumsanswerResponse } from '../model/umsanswer.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umsanswerService {
  formData: umsanswer;
  readonly rootURL = AppConstants.ntirelearnURL;
  list: umsanswer[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumsanswers() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsanswer', body);
    }
  }

  saveOrUpdateumsanswersList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsanswer', body);
    }
  }

  getumsanswersList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsanswer').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsanswer' + '/param/' + key).toPromise();
    }
  }

  getumsanswersByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsanswer' + '/' + id).toPromise();
    }
  }

  deleteumsanswer(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umsanswer' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umsanswer')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IumsanswerResponse> {
    return this.http.get<IumsanswerResponse>(AppConstants.ntirelearnURL + '/umsanswer')
      .pipe(
        tap((response: IumsanswerResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(umsanswer => new umsanswer(umsanswer.answerid, umsanswer.questionid, umsanswer.answer, umsanswer.sequence, umsanswer.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(umsanswer => umsanswer.answer.includes(filter.name))

          return response;
        })
      );
  }



}

