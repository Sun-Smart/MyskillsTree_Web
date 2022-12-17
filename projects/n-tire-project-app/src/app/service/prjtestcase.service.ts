import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjtestcase } from '../model/prjtestcase.model';
import { environment } from '../../environments/environment';
import { IprjtestcaseResponse } from '../model/prjtestcase.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjtestcaseService {
  formData: prjtestcase;
  readonly rootURL = AppConstants.ntireprojectURL;
  list: prjtestcase[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateprjtestcases(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(this.rootURL + '/prjtestcase', body);
    }
  }

  saveOrUpdateprjtestcasesList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(this.rootURL + '/prjtestcase', body);
    }
  }

  getprjtestcasesList(): any {
    {
      return this.http.get(this.rootURL + '/prjtestcase').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(this.rootURL + '/prjtestcase' + '/param/' + key).toPromise();
    }
  }


  getprjtestcasesByEID(id: any): any {
    {
      return this.http.get(this.rootURL + '/prjtestcase' + '/e/' + id).toPromise();
    }
  }
  getprjtestcasesByID(id: number): any {
    {
      return this.http.get(this.rootURL + '/prjtestcase' + '/' + id).toPromise();
    }
  }

  deleteprjtestcase(id: number): any {
    {
      return this.http.delete(this.rootURL + '/prjtestcase' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(this.rootURL + '/prjtestcase')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

