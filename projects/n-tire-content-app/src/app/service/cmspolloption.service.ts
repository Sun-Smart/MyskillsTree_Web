import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cmspolloption } from '../model/cmspolloption.model';
import { environment } from '../../environments/environment';
import { IcmspolloptionResponse } from '../model/cmspolloption.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class cmspolloptionService {
  formData: cmspolloption;
  readonly rootURL = AppConstants.ntirecontentURL;
  list: cmspolloption[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatecmspolloptions() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirecontentURL + '/cmspolloption', body);
    }
  }

  saveOrUpdatecmspolloptionsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirecontentURL + '/cmspolloption', body);
    }
  }

  getcmspolloptionsList() {
    {
      return this.http.get(AppConstants.ntirecontentURL + '/cmspolloption').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirecontentURL + '/cmspolloption' + '/param/' + key).toPromise();
    }
  }

  getcmspolloptionsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirecontentURL + '/cmspolloption' + '/' + id).toPromise();
    }
  }

  deletecmspolloption(id: number) {
    {
      return this.http.delete(AppConstants.ntirecontentURL + '/cmspolloption' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirecontentURL + '/cmspolloption')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

