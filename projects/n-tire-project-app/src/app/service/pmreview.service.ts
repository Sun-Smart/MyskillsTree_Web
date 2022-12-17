import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmreview } from '../model/pmreview.model';
import { pmreviewdetail } from '../model/pmreviewdetail.model';
import { environment } from '../../environments/environment';
import { IpmreviewResponse } from '../model/pmreview.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmreviewService {
  formData: pmreview;
  readonly rootURL = AppConstants.ntireprojectURL;
  pmreviewdetails: pmreviewdetail[] = [];
  list: pmreview[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatepmreviews() {
    {
      var body = {
        ...this.formData,
        pmreviewdetails: this.pmreviewdetails.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(this.rootURL + '/pmreview', body);
    }
  }

  saveOrUpdatepmreviewsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(this.rootURL + '/pmreview', body);
    }
  }

  getpmreviewsList() {
    {
      return this.http.get(this.rootURL + '/pmreview').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(this.rootURL + '/pmreview' + '/param/' + key).toPromise();
    }
  }

  getpmreviewsByID(id: number): any {
    {
      return this.http.get(this.rootURL + '/pmreview' + '/' + id).toPromise();
    }
  }

  deletepmreview(id: number) {
    {
      return this.http.delete(this.rootURL + '/pmreview' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.pmreviewdetails = [];
  }
  refreshList() {
    {
      this.http.get(this.rootURL + '/pmreview')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

