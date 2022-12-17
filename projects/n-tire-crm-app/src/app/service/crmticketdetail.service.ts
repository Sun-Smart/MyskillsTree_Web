import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crmticketdetail } from '../model/crmticketdetail.model';
import { environment } from '../../environments/environment';
import { IcrmticketdetailResponse } from '../model/crmticketdetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class crmticketdetailService {
  formData: crmticketdetail;
  readonly rootURL = AppConstants.ntirecrmURL;
  list: crmticketdetail[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatecrmticketdetails() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirecrmURL + '/crmticketdetail', body);
    }
  }

  saveOrUpdatecrmticketdetailsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirecrmURL + '/crmticketdetail', body);
    }
  }

  getcrmticketdetailsList() {
    {
      return this.http.get(AppConstants.ntirecrmURL + '/crmticketdetail').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirecrmURL + '/crmticketdetail' + '/param/' + key).toPromise();
    }
  }

  getcrmticketdetailsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirecrmURL + '/crmticketdetail' + '/' + id).toPromise();
    }
  }

  deletecrmticketdetail(id: number) {
    {
      return this.http.delete(AppConstants.ntirecrmURL + '/crmticketdetail' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirecrmURL + '/crmticketdetail')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

