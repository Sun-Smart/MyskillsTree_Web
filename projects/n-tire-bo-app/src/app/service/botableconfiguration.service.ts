import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { botableconfiguration } from '../model/botableconfiguration.model';
import { botbldetailmainaccess } from '../model/botbldetailmainaccess.model';
import { environment } from '../../environments/environment';
import { IbotableconfigurationResponse } from '../model/botableconfiguration.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class botableconfigurationService {
  SessionUser = { companyid: 0, userid: 0, usercode: '', username: '', language: '' };
  formData: botableconfiguration;
  readonly rootURL = AppConstants.ntireboURL;
  botbldetailmainaccessess: botbldetailmainaccess[] = [];
  Insertbotbldetailmainaccessess: botbldetailmainaccess[] = [];
  list: botableconfiguration[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    var sessionuser = JSON.parse(this.sessionService.getItem("currentUser"));
    if (sessionuser != null) {
      this.SessionUser = sessionuser;
      return true;
    }
    return false;

  }
  saveOrUpdatebotableconfigurations() {
    {
      var body = {
        ...this.formData,
        botbldetailmainaccessess: this.Insertbotbldetailmainaccessess,
        SessionUser: this.SessionUser
      };
      return this.http.post(AppConstants.ntireboURL + '/botableconfiguration', body);
    }
  }

  saveOrUpdatebotableconfigurationsList() {
    {
      var body = {
        ...this.list,
        SessionUser: this.SessionUser
      };
      return this.http.post(AppConstants.ntireboURL + '/botableconfiguration', body);
    }
  }

  getbotableconfigurationsList() {
    {
      return this.http.get(AppConstants.ntireboURL + '/botableconfiguration').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntireboURL + '/botableconfiguration' + '/param/' + key).toPromise();
    }
  }

  getbotableconfigurationsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntireboURL + '/botableconfiguration' + '/' + id).toPromise();
    }
  }

  deletebotableconfiguration(id: number) {
    {
      return this.http.delete(AppConstants.ntireboURL + '/botableconfiguration' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.Insertbotbldetailmainaccessess = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntireboURL + '/botableconfiguration')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbotableconfigurationResponse> {
    return this.http.get<IbotableconfigurationResponse>(AppConstants.ntireboURL + '/botableconfiguration')
      .pipe(
        tap((response: IbotableconfigurationResponse) => {
          console.log(response);
          ////debugger;
          var response1;
          response1 = response;
          response.results = response1.map(botableconfiguration => new botableconfiguration(botableconfiguration.tableconfigid, botableconfiguration.templateid, botableconfiguration.description, botableconfiguration.company, botableconfiguration.listhtml, botableconfiguration.maintableid, botableconfiguration.maintableidDesc, botableconfiguration.type, botableconfiguration.usertype, botableconfiguration.addrecord, botableconfiguration.editrecord, botableconfiguration.viewrecord, botableconfiguration.deleterecord, botableconfiguration.hasheader, botableconfiguration.hascontent, botableconfiguration.hasfooter, botableconfiguration.headerheight, botableconfiguration.contentheight, botableconfiguration.footerheight, botableconfiguration.columnlist, botableconfiguration.tablestyletype, botableconfiguration.remarks, botableconfiguration.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(botableconfiguration => botableconfiguration.description.includes(filter.name))

          return response;
        })
      );
  }


}

