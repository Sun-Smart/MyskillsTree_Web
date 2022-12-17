import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umsexamtopic } from '../model/umsexamtopic.model';
import { environment } from '../../environments/environment';
import { IumsexamtopicResponse } from '../model/umsexamtopic.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umsexamtopicService {
  formData: umsexamtopic;
  readonly rootURL = AppConstants.ntirelearnURL;
  list: umsexamtopic[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumsexamtopics() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsexamtopic', body);
    }
  }

  saveOrUpdateumsexamtopicsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsexamtopic', body);
    }
  }

  getumsexamtopicsList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsexamtopic').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsexamtopic' + '/param/' + key).toPromise();
    }
  }

  getumsexamtopicsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsexamtopic' + '/' + id).toPromise();
    }
  }

  deleteumsexamtopic(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umsexamtopic' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umsexamtopic')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

