import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bouserbranchaccess } from '../model/bouserbranchaccess.model';
import { environment } from '../../environments/environment';
import { IbouserbranchaccessResponse } from '../model/bouserbranchaccess.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bouserbranchaccessService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bouserbranchaccesses(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/bouserbranchaccess', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bouserbranchaccess' + '/getdefaultdata').toPromise();
    }
  }
  get_bouserbranchaccesses_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bouserbranchaccess').toPromise();
    }
  }
  getListBy_accessid(accessid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bouserbranchaccess' + '/accessid/' + accessid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bouserbranchaccess' + '/param/' + key).toPromise();
    }
  }


  get_bouserbranchaccesses_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bouserbranchaccess' + '/e/' + id).toPromise();
    }
  }
  get_bouserbranchaccesses_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bouserbranchaccess' + '/' + id).toPromise();
    }
  }

  delete_bouserbranchaccess(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bouserbranchaccess' + '/' + id).toPromise();
    }
  }



}

