import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bouserrolemaster } from '../model/bouserrolemaster.model';
import { bousertypemenuaccess } from '../model/bousertypemenuaccess.model';
import { environment } from '../../environments/environment';
import { IbouserrolemasterResponse } from '../model/bouserrolemaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bouserrolemasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bouserrolemasters(formData, bousertypemenuaccesses, Insertbousertypemenuaccesses,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        bousertypemenuaccesses: Insertbousertypemenuaccesses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/bouserrolemaster', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bouserrolemaster' + '/getdefaultdata').toPromise();
    }
  }
  get_bouserrolemasters_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bouserrolemaster').toPromise();
    }
  }
  getListBy_userroleid(userroleid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bouserrolemaster' + '/userroleid/' + userroleid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bouserrolemaster' + '/param/' + key).toPromise();
    }
  }


  get_bouserrolemasters_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bouserrolemaster' + '/e/' + id).toPromise();
    }
  }
  get_bouserrolemasters_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bouserrolemaster' + '/' + id).toPromise();
    }
  }

  delete_bouserrolemaster(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bouserrolemaster' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbouserrolemasterResponse> {
    return this.http.get<IbouserrolemasterResponse>(AppConstants.ntirebizURL + '/bouserrolemaster')
      .pipe(
        tap((response: IbouserrolemasterResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bouserrolemaster => new bouserrolemaster(bouserrolemaster.userroleid, bouserrolemaster.userrole, bouserrolemaster.additionalnotes, bouserrolemaster.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bouserrolemaster => bouserrolemaster.userrole.includes(filter.name))

          return response;
        })
      );
  }



}

