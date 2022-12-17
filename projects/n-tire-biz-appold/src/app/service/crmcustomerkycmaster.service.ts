import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crmcustomerkycmaster } from '../model/crmcustomerkycmaster.model';
import { environment } from '../../environments/environment';
import { IcrmcustomerkycmasterResponse } from '../model/crmcustomerkycmaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class crmcustomerkycmasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_crmcustomerkycmasters(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/crmcustomerkycmaster', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomerkycmaster' + '/getdefaultdata').toPromise();
    }
  }
  get_crmcustomerkycmasters_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomerkycmaster').toPromise();
    }
  }
  getListBy_kycid(kycid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomerkycmaster' + '/kycid/' + kycid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomerkycmaster' + '/param/' + key).toPromise();
    }
  }


  get_crmcustomerkycmasters_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomerkycmaster' + '/e/' + id).toPromise();
    }
  }
  get_crmcustomerkycmasters_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomerkycmaster' + '/' + id).toPromise();
    }
  }

  delete_crmcustomerkycmaster(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/crmcustomerkycmaster' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IcrmcustomerkycmasterResponse> {
    return this.http.get<IcrmcustomerkycmasterResponse>(AppConstants.ntirebizURL + '/crmcustomerkycmaster')
      .pipe(
        tap((response: IcrmcustomerkycmasterResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(crmcustomerkycmaster => new crmcustomerkycmaster(crmcustomerkycmaster.kycid, crmcustomerkycmaster.customerid, crmcustomerkycmaster.customeriddesc, crmcustomerkycmaster.identityname, crmcustomerkycmaster.identitynamedesc, crmcustomerkycmaster.identitynumber, crmcustomerkycmaster.issuedate, crmcustomerkycmaster.expirydate, crmcustomerkycmaster.renewalrequired, crmcustomerkycmaster.customfield, crmcustomerkycmaster.attachment, crmcustomerkycmaster.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(crmcustomerkycmaster => crmcustomerkycmaster.identitynumber.includes(filter.name))

          return response;
        })
      );
  }


  getList_customerid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomerkycmaster' + '/getList_customerid').toPromise();
  }

  getList_identityname(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomerkycmaster' + '/getList_identityname/').toPromise();
  }


}

