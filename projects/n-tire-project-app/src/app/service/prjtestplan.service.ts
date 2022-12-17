import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjtestplan } from '../model/prjtestplan.model';
import { prjtestcase } from '../model/prjtestcase.model';
import { environment } from '../../environments/environment';
import { IprjtestplanResponse } from '../model/prjtestplan.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjtestplanService {
  formData: prjtestplan;
  readonly rootURL = AppConstants.ntireprojectURL;
  prjtestcases: prjtestcase[] = [];
  list: prjtestplan[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateprjtestplans(): any {
    {
      var body = {
        ...this.formData,
        prjtestcases: this.prjtestcases.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(this.rootURL + '/prjtestplan', body);
    }
  }

  saveOrUpdateprjtestplansList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(this.rootURL + '/prjtestplan', body);
    }
  }

  getprjtestplansList(): any {
    {
      return this.http.get(this.rootURL + '/prjtestplan').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(this.rootURL + '/prjtestplan' + '/param/' + key).toPromise();
    }
  }


  getprjtestplansByEID(id: any): any {
    {
      return this.http.get(this.rootURL + '/prjtestplan' + '/e/' + id).toPromise();
    }
  }
  getprjtestplansByID(id: number): any {
    {
      return this.http.get(this.rootURL + '/prjtestplan' + '/' + id).toPromise();
    }
  }

  deleteprjtestplan(id: number): any {
    {
      return this.http.delete(this.rootURL + '/prjtestplan' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.prjtestcases = [];
  }
  refreshList(): any {
    {
      this.http.get(this.rootURL + '/prjtestplan')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

