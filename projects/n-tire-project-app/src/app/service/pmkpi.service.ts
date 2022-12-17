import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmkpi } from '../model/pmkpi.model';
import { environment } from '../../environments/environment';
import { IpmkpiResponse } from '../model/pmkpi.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmkpiService {
  formData: pmkpi;
  readonly rootURL = AppConstants.ntireprojectURL;
  list: pmkpi[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatepmkpis() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(this.rootURL + '/pmkpi', body);
    }
  }

  saveOrUpdatepmkpisList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(this.rootURL + '/pmkpi', body);
    }
  }

  getpmkpisList() {
    {
      return this.http.get(this.rootURL + '/pmkpi').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(this.rootURL + '/pmkpi' + '/param/' + key).toPromise();
    }
  }

  getpmkpisByID(id: number): any {
    {
      return this.http.get(this.rootURL + '/pmkpi' + '/' + id).toPromise();
    }
  }

  deletepmkpi(id: number) {
    {
      return this.http.delete(this.rootURL + '/pmkpi' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(this.rootURL + '/pmkpi')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

