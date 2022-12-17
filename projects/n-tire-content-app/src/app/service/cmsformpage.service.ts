import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cmsformpage } from '../model/cmsformpage.model';
import { cmspagequestion } from '../model/cmspagequestion.model';
import { environment } from '../../environments/environment';
import { IcmsformpageResponse } from '../model/cmsformpage.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class cmsformpageService {
  formData: cmsformpage;
  readonly rootURL = AppConstants.ntirecontentURL;
  cmspagequestions: cmspagequestion[] = [];
  list: cmsformpage[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatecmsformpages() {
    {
      var body = {
        ...this.formData,
        cmspagequestions: this.cmspagequestions.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirecontentURL + '/cmsformpage', body);
    }
  }

  saveOrUpdatecmsformpagesList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirecontentURL + '/cmsformpage', body);
    }
  }

  getcmsformpagesList() {
    {
      return this.http.get(AppConstants.ntirecontentURL + '/cmsformpage').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirecontentURL + '/cmsformpage' + '/param/' + key).toPromise();
    }
  }

  getcmsformpagesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirecontentURL + '/cmsformpage' + '/' + id).toPromise();
    }
  }

  deletecmsformpage(id: number) {
    {
      return this.http.delete(AppConstants.ntirecontentURL + '/cmsformpage' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.cmspagequestions = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirecontentURL + '/cmsformpage')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

