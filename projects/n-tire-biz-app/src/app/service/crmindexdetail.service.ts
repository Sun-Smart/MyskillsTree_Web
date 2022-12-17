import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crmindexdetail } from '../model/crmindexdetail.model';
import { environment } from '../../environments/environment';
import { IcrmindexdetailResponse } from '../model/crmindexdetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class crmindexdetailService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_crmindexdetails(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/crmindexdetail', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmindexdetail' + '/getdefaultdata').toPromise();
    }
  }
  get_crmindexdetails_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmindexdetail').toPromise();
    }
  }
  getListBy_indexdetailid(indexdetailid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmindexdetail' + '/indexdetailid/' + indexdetailid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmindexdetail' + '/param/' + key).toPromise();
    }
  }


  get_crmindexdetails_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmindexdetail' + '/e/' + id).toPromise();
    }
  }
  get_crmindexdetails_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmindexdetail' + '/' + id).toPromise();
    }
  }

  delete_crmindexdetail(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/crmindexdetail' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IcrmindexdetailResponse> {
    return this.http.get<IcrmindexdetailResponse>(AppConstants.ntirebizURL + '/crmindexdetail')
      .pipe(
        tap((response: IcrmindexdetailResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(crmindexdetail => new crmindexdetail(crmindexdetail.indexid, crmindexdetail.indexdetailid, crmindexdetail.value, crmindexdetail.parentindexdetail, crmindexdetail.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(crmindexdetail => crmindexdetail.value.includes(filter.name))

          return response;
        })
      );
  }



}

