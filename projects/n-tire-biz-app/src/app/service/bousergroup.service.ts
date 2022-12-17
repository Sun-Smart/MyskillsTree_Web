import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bousergroup } from '../model/bousergroup.model';
import { bousergroupaccess } from '../model/bousergroupaccess.model';
import { environment } from '../../environments/environment';
import { IbousergroupResponse } from '../model/bousergroup.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bousergroupService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bousergroups(formData, bousergroupaccesses, Insertbousergroupaccesses,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        bousergroupaccesses: Insertbousergroupaccesses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/bousergroup', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousergroup' + '/getdefaultdata').toPromise();
    }
  }
  get_bousergroups_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousergroup').toPromise();
    }
  }
  getListBy_usergroupid(usergroupid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousergroup' + '/usergroupid/' + usergroupid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousergroup' + '/param/' + key).toPromise();
    }
  }


  get_bousergroups_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousergroup' + '/e/' + id).toPromise();
    }
  }
  get_bousergroups_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousergroup' + '/' + id).toPromise();
    }
  }

  delete_bousergroup(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bousergroup' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbousergroupResponse> {
    return this.http.get<IbousergroupResponse>(AppConstants.ntirebizURL + '/bousergroup')
      .pipe(
        tap((response: IbousergroupResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bousergroup => new bousergroup(bousergroup.usergroupid, bousergroup.groupname, bousergroup.notes, bousergroup.customfield, bousergroup.attachment, bousergroup.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bousergroup => bousergroup.groupname.includes(filter.name))

          return response;
        })
      );
  }



}

