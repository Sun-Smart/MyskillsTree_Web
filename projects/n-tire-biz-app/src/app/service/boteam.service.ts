import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boteam } from '../model/boteam.model';
import { boteammember } from '../model/boteammember.model';
import { environment } from '../../environments/environment';
import { IboteamResponse } from '../model/boteam.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boteamService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_boteams(formData, boteammembers,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        boteammembers: boteammembers.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/boteam', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boteam' + '/getdefaultdata').toPromise();
    }
  }
  get_boteams_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boteam').toPromise();
    }
  }
  getListBy_teamid(teamid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boteam' + '/teamid/' + teamid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boteam' + '/param/' + key).toPromise();
    }
  }


  get_boteams_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boteam' + '/e/' + id).toPromise();
    }
  }
  get_boteams_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boteam' + '/' + id).toPromise();
    }
  }

  delete_boteam(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/boteam' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IboteamResponse> {
    return this.http.get<IboteamResponse>(AppConstants.ntirebizURL + '/boteam')
      .pipe(
        tap((response: IboteamResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(boteam => new boteam(boteam.teamid, boteam.managerid, boteam.manageriddesc, boteam.description, boteam.remarks, boteam.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(boteam => boteam.description.includes(filter.name))

          return response;
        })
      );
  }


  getList_managerid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boteam' + '/getList_managerid').toPromise();
  }


}

