import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umsstudentfeedback } from '../model/umsstudentfeedback.model';
import { umsfeedbackrating } from '../model/umsfeedbackrating.model';
import { environment } from '../../environments/environment';
import { IumsstudentfeedbackResponse } from '../model/umsstudentfeedback.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umsstudentfeedbackService {
  formData: umsstudentfeedback;
  readonly rootURL = AppConstants.ntirelearnURL;
  umsfeedbackratings: umsfeedbackrating[] = [];
  list: umsstudentfeedback[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumsstudentfeedbacks() {
    {
      var body = {
        ...this.formData,
        umsfeedbackratings: this.umsfeedbackratings.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsstudentfeedback', body);
    }
  }

  saveOrUpdateumsstudentfeedbacksList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsstudentfeedback', body);
    }
  }

  getumsstudentfeedbacksList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsstudentfeedback').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsstudentfeedback' + '/param/' + key).toPromise();
    }
  }

  getumsstudentfeedbacksByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsstudentfeedback' + '/' + id).toPromise();
    }
  }

  deleteumsstudentfeedback(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umsstudentfeedback' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.umsfeedbackratings = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umsstudentfeedback')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

