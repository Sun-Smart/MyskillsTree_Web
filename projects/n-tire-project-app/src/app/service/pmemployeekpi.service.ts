import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmemployeekpi } from '../model/pmemployeekpi.model';
import { environment } from '../../environments/environment';
import { IpmemployeekpiResponse } from '../model/pmemployeekpi.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmemployeekpiService {
  formData: pmemployeekpi;
  readonly rootURL = AppConstants.ntireprojectURL;
  list: pmemployeekpi[];
  DeletedpmemployeekpiIDs: string = "";

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatepmemployeekpis() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(this.rootURL + '/pmemployeekpi', body);
    }
  }

  saveOrUpdatepmemployeekpisList() {
    {
      var body = {
        list: this.list,
        DeletedpmemployeekpiIDs: this.DeletedpmemployeekpiIDs,
      };
      return this.http.post(this.rootURL + '/pmemployeekpi', body);
    }
  }

  getpmemployeekpisList() {
    {
      return this.http.get(this.rootURL + '/pmemployeekpi').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(this.rootURL + '/pmemployeekpi' + '/param/' + key).toPromise();
    }
  }

  getpmemployeekpisByID(id: number): any {
    {
      return this.http.get(this.rootURL + '/pmemployeekpi' + '/' + id).toPromise();
    }
  }

  deletepmemployeekpi(id: number) {
    {
      return this.http.delete(this.rootURL + '/pmemployeekpi' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(this.rootURL + '/pmemployeekpi')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

