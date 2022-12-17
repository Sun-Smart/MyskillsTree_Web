import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cmspoll } from '../model/cmspoll.model';
import { cmspolloption } from '../model/cmspolloption.model';
import { environment } from '../../environments/environment';
import { IcmspollResponse } from '../model/cmspoll.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class cmspollService {
  formData: cmspoll;
  readonly rootURL = AppConstants.ntirecontentURL;
  cmspolloptions: cmspolloption[] = [];
  list: cmspoll[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatecmspolls() {
    {
      var body = {
        ...this.formData,
        cmspolloptions: this.cmspolloptions.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirecontentURL + '/cmspoll', body);
    }
  }

  saveOrUpdatecmspollsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirecontentURL + '/cmspoll', body);
    }
  }

  getcmspollsList() {
    {
      return this.http.get(AppConstants.ntirecontentURL + '/cmspoll').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirecontentURL + '/cmspoll' + '/param/' + key).toPromise();
    }
  }

  getcmspollsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirecontentURL + '/cmspoll' + '/' + id).toPromise();
    }
  }

  deletecmspoll(id: number) {
    {
      return this.http.delete(AppConstants.ntirecontentURL + '/cmspoll' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.cmspolloptions = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirecontentURL + '/cmspoll')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

