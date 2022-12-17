import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umsstudentfeemaster } from '../model/umsstudentfeemaster.model';
import { environment } from '../../environments/environment';
import { IumsstudentfeemasterResponse } from '../model/umsstudentfeemaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umsstudentfeemasterService {
  formData: umsstudentfeemaster;
  readonly rootURL = AppConstants.ntirelearnURL;
  list: umsstudentfeemaster[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumsstudentfeemasters() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsstudentfeemaster', body);
    }
  }

  saveOrUpdateumsstudentfeemastersList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umsstudentfeemaster', body);
    }
  }

  getumsstudentfeemastersList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsstudentfeemaster').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsstudentfeemaster' + '/param/' + key).toPromise();
    }
  }

  getumsstudentfeemastersByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umsstudentfeemaster' + '/' + id).toPromise();
    }
  }

  deleteumsstudentfeemaster(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umsstudentfeemaster' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umsstudentfeemaster')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

