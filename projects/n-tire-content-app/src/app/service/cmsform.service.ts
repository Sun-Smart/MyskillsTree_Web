import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cmsform } from '../model/cmsform.model';
import { cmsformpage } from '../model/cmsformpage.model';
import { environment } from '../../environments/environment';
import { IcmsformResponse } from '../model/cmsform.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class cmsformService {
  formData: cmsform;
  readonly rootURL = AppConstants.ntirecontentURL;
  cmsformpages: cmsformpage[] = [];
  list: cmsform[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatecmsforms() {
    {
      var body = {
        ...this.formData,
        cmsformpages: this.cmsformpages.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirecontentURL + '/cmsform', body);
    }
  }

  saveOrUpdatecmsformsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirecontentURL + '/cmsform', body);
    }
  }

  getcmsformsList() {
    {
      return this.http.get(AppConstants.ntirecontentURL + '/cmsform').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirecontentURL + '/cmsform' + '/param/' + key).toPromise();
    }
  }

  getcmsformsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirecontentURL + '/cmsform' + '/' + id).toPromise();
    }
  }

  deletecmsform(id: number) {
    {
      return this.http.delete(AppConstants.ntirecontentURL + '/cmsform' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.cmsformpages = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirecontentURL + '/cmsform')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

