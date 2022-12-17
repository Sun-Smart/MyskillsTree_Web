import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umsstudentmark } from '../model/umsstudentmark.model';
import { environment } from '../../environments/environment';
import { IumsstudentmarkResponse } from '../model/umsstudentmark.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umsstudentmarkService {
  formData: umsstudentmark;
  readonly rootURL = AppConstants.ntirelearnURL;
  list: umsstudentmark[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumsstudentmarks() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsstudentmark', body);
    }
  }

  saveOrUpdateumsstudentmarksList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsstudentmark', body);
    }
  }

  getumsstudentmarksList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsstudentmark').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsstudentmark' + '/param/' + key).toPromise();
    }
  }

  getumsstudentmarksByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsstudentmark' + '/' + id).toPromise();
    }
  }

  deleteumsstudentmark(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umsstudentmark' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umsstudentmark')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

