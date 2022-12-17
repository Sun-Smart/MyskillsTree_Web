import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crmindexmaster } from '../model/crmindexmaster.model';
import { crmindexdetail } from '../model/crmindexdetail.model';
import { environment } from '../../environments/environment';
import { IcrmindexmasterResponse } from '../model/crmindexmaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class crmindexmasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_crmindexmasters(formData, crmindexdetails,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        crmindexdetails: crmindexdetails.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/crmindexmaster', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmindexmaster' + '/getdefaultdata').toPromise();
    }
  }
  get_crmindexmasters_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmindexmaster').toPromise();
    }
  }
  getListBy_indexid(indexid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmindexmaster' + '/indexid/' + indexid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmindexmaster' + '/param/' + key).toPromise();
    }
  }


  get_crmindexmasters_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmindexmaster' + '/e/' + id).toPromise();
    }
  }
  get_crmindexmasters_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmindexmaster' + '/' + id).toPromise();
    }
  }

  delete_crmindexmaster(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/crmindexmaster' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IcrmindexmasterResponse> {
    return this.http.get<IcrmindexmasterResponse>(AppConstants.ntirebizURL + '/crmindexmaster')
      .pipe(
        tap((response: IcrmindexmasterResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(crmindexmaster => new crmindexmaster(crmindexmaster.indexid, crmindexmaster.indexname, crmindexmaster.valuenode, crmindexmaster.valuenodedesc, crmindexmaster.parentindex, crmindexmaster.value, crmindexmaster.mandatory, crmindexmaster.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(crmindexmaster => crmindexmaster.indexname.includes(filter.name))

          return response;
        })
      );
  }


  getList_valuenode(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmindexmaster' + '/getList_valuenode/').toPromise();
  }


}

