import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstterm } from '../model/mstterm.model';
import { environment } from '../../environments/environment';
import { ImsttermResponse } from '../model/mstterm.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class msttermService {
  readonly rootURL = AppConstants.baseURL;
  Authorization_token: string;
  constructor(private http: HttpClient, private sessionService: SessionService) {
    this.Authorization_token = localStorage.getItem('token')
  }

  valid() {
    return true;

  }
  saveOrUpdate_mstterms(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/mstterm', body);
    }
  }
  // saveOrUpdate_termmstterms(): any {
  //   let headers = new HttpHeaders().set('Authorization', this.Authorization_token);
  //   return this.http.get(AppConstants.ntirebizURL +'/mstuseracceptedterm/acceptedterms',{headers:headers})
  // }
  saveOrUpdate_termmstterms(): any {
    debugger
    if (this.valid()) {
      let option = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Authorization_token);

      return this.http.get(AppConstants.ntirebizURL + '/mstuseracceptedterm/acceptedterms', { headers: option });
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstterm/getdefaultdata').toPromise();
    }
  }
  get_mstterms_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstterm').toPromise();
    }
  }
  getListBy_termid(termid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstterm/termid/' + termid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstterm/param/' + key).toPromise();
    }
  }


  get_mstterms_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstterm/e/' + id).toPromise();
    }
  }
  get_mstterms_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstterm/' + id).toPromise();
    }
  }

  delete_mstterm(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/mstterm/' + id).toPromise();
    }
  }


}

