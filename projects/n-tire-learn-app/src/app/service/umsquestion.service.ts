import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umsquestion } from '../model/umsquestion.model';
import { umsanswer } from '../model/umsanswer.model';
import { environment } from '../../environments/environment';
import { IumsquestionResponse } from '../model/umsquestion.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umsquestionService {
  formData: umsquestion;
  readonly rootURL = AppConstants.ntirelearnURL;
  umsanswers: umsanswer[] = [];
  list: umsquestion[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumsquestions() {
    {
      var body = {
        ...this.formData,
        umsanswers: this.umsanswers.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsquestion', body);
    }
  }

  saveOrUpdateumsquestionsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsquestion', body);
    }
  }

  getumsquestionsList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsquestion').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsquestion' + '/param/' + key).toPromise();
    }
  }

  getumsquestionsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsquestion' + '/' + id).toPromise();
    }
  }

  deleteumsquestion(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umsquestion' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.umsanswers = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umsquestion')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IumsquestionResponse> {
    return this.http.get<IumsquestionResponse>(AppConstants.ntirelearnURL + '/umsquestion')
      .pipe(
        tap((response: IumsquestionResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(umsquestion => new umsquestion(umsquestion.topicid, umsquestion.questionid, umsquestion.categoryid, umsquestion.categoryiddesc, umsquestion.question, umsquestion.questiontype, umsquestion.questiontypedesc, umsquestion.answertype, umsquestion.answertypedesc, umsquestion.correctanswer, umsquestion.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(umsquestion => umsquestion.question.includes(filter.name))

          return response;
        })
      );
  }



}

