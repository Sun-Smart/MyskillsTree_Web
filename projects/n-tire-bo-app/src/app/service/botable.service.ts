import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { botable } from '../model/botable.model';
import { botablemasterdetailmap } from '../model/botablemasterdetailmap.model';
import { environment } from '../../environments/environment';
import { IbotableResponse } from '../model/botable.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class botableService {
  SessionUser = { companyid: 0, userid: 0, usercode: '', username: '', language: '' };
  formData: botable;
  readonly rootURL = AppConstants.ntireboURL;
  botablemasterdetailmaps: botablemasterdetailmap[] = [];
  list: botable[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    var sessionuser = JSON.parse(this.sessionService.getItem("currentUser"));
    if (sessionuser != null) {
      this.SessionUser = sessionuser;
      return true;
    }
    return false;

  }
  saveOrUpdatebotables() {
    {
      var body = {
        ...this.formData,
        botablemasterdetailmaps: this.botablemasterdetailmaps,
        SessionUser: this.SessionUser
      };
      return this.http.post(AppConstants.ntireboURL + '/botable', body);
    }
  }

  saveOrUpdatebotablesList() {
    {
      var body = {
        ...this.list,
        SessionUser: this.SessionUser
      };
      return this.http.post(AppConstants.ntireboURL + '/botable', body);
    }
  }

  getbotablesList() {
    {
      return this.http.get(AppConstants.ntireboURL + '/botable').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntireboURL + '/botable' + '/param/' + key).toPromise();
    }
  }

  getbotablesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntireboURL + '/botable' + '/' + id).toPromise();
    }
  }

  deletebotable(id: number) {
    {
      return this.http.delete(AppConstants.ntireboURL + '/botable' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.botablemasterdetailmaps = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntireboURL + '/botable')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbotableResponse> {
    return this.http.get<IbotableResponse>(AppConstants.ntireboURL + '/botable')
      .pipe(
        tap((response: IbotableResponse) => {
          console.log(response);
          ////debugger;
          var response1;
          response1 = response;
          response.results = response1.map(botable => new botable(botable.tableid, botable.tablename, botable.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(botable => botable.description.includes(filter.name))

          return response;
        })
      );
  }


}

