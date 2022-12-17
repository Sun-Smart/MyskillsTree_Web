import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmreviewdetail } from '../model/pmreviewdetail.model';
import { environment } from '../../environments/environment';
import { IpmreviewdetailResponse } from '../model/pmreviewdetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmreviewdetailService {
  formData: pmreviewdetail;
  readonly rootURL = AppConstants.ntireprojectURL;
  list: pmreviewdetail[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatepmreviewdetails() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(this.rootURL + '/pmreviewdetail', body);
    }
  }

  saveOrUpdatepmreviewdetailsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(this.rootURL + '/pmreviewdetail', body);
    }
  }

  getpmreviewdetailsList() {
    {
      return this.http.get(this.rootURL + '/pmreviewdetail').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(this.rootURL + '/pmreviewdetail' + '/param/' + key).toPromise();
    }
  }

  getpmreviewdetailsByID(id: number): any {
    {
      return this.http.get(this.rootURL + '/pmreviewdetail' + '/' + id).toPromise();
    }
  }

  deletepmreviewdetail(id: number) {
    {
      return this.http.delete(this.rootURL + '/pmreviewdetail' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(this.rootURL + '/pmreviewdetail')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

