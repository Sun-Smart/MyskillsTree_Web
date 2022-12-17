import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjdailystandup } from '../model/prjdailystandup.model';
import { prjdailystandupdetail } from '../model/prjdailystandupdetail.model';
import { environment } from '../../environments/environment';
import { IprjdailystandupResponse } from '../model/prjdailystandup.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjdailystandupService {
  formData: prjdailystandup;
  readonly rootURL = AppConstants.ntireprojectURL;
  prjdailystandupdetails: prjdailystandupdetail[] = [];
  list: prjdailystandup[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateprjdailystandups(): any {
    {
      var body = {
        ...this.formData,
        prjdailystandupdetails: this.prjdailystandupdetails.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(this.rootURL + '/prjdailystandup', body);
    }
  }

  saveOrUpdateprjdailystandupsList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(this.rootURL + '/prjdailystandup', body);
    }
  }

  getprjdailystandupsList(): any {
    {
      return this.http.get(this.rootURL + '/prjdailystandup').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(this.rootURL + '/prjdailystandup' + '/param/' + key).toPromise();
    }
  }


  getprjdailystandupsByEID(id: any): any {
    {
      return this.http.get(this.rootURL + '/prjdailystandup' + '/e/' + id).toPromise();
    }
  }
  getprjdailystandupsByID(id: number): any {
    {
      return this.http.get(this.rootURL + '/prjdailystandup' + '/' + id).toPromise();
    }
  }

  deleteprjdailystandup(id: number): any {
    {
      return this.http.delete(this.rootURL + '/prjdailystandup' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.prjdailystandupdetails = [];
  }
  refreshList(): any {
    {
      this.http.get(this.rootURL + '/prjdailystandup')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

