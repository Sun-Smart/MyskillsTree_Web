import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { umstopicmaster } from '../model/umstopicmaster.model';
import { umsquestion } from '../model/umsquestion.model';
import { environment } from '../../environments/environment';
import { IumstopicmasterResponse } from '../model/umstopicmaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class umstopicmasterService {
  formData: umstopicmaster;
  readonly rootURL = AppConstants.ntirelearnURL;
  umsquestions: umsquestion[] = [];
  list: umstopicmaster[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateumstopicmasters() {
    {
      var body = {
        ...this.formData,
        umsquestions: this.umsquestions.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umstopicmaster', body);
    }
  }

  saveOrUpdateumstopicmastersList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirelearnURL + '/umstopicmaster', body);
    }
  }

  getumstopicmastersList() {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umstopicmaster').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umstopicmaster' + '/param/' + key).toPromise();
    }
  }

  getumstopicmastersByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirelearnURL + '/umstopicmaster' + '/' + id).toPromise();
    }
  }

  deleteumstopicmaster(id: number) {
    {
      return this.http.delete(AppConstants.ntirelearnURL + '/umstopicmaster' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.umsquestions = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirelearnURL + '/umstopicmaster')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

