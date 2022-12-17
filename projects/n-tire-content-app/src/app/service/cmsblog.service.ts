import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cmsblog } from '../model/cmsblog.model';
import { environment } from '../../environments/environment';
import { IcmsblogResponse } from '../model/cmsblog.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class cmsblogService {
  formData: cmsblog;
  readonly rootURL = AppConstants.ntirecontentURL;
  list: cmsblog[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatecmsblogs() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirecontentURL + '/cmsblog', body);
    }
  }

  saveOrUpdatecmsblogsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirecontentURL + '/cmsblog', body);
    }
  }

  getcmsblogsList() {
    {
      return this.http.get(AppConstants.ntirecontentURL + '/cmsblog').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirecontentURL + '/cmsblog' + '/param/' + key).toPromise();
    }
  }

  getcmsblogsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirecontentURL + '/cmsblog' + '/' + id).toPromise();
    }
  }

  deletecmsblog(id: number) {
    {
      return this.http.delete(AppConstants.ntirecontentURL + '/cmsblog' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirecontentURL + '/cmsblog')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

