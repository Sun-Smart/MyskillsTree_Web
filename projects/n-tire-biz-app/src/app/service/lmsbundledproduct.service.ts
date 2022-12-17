import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsbundledproduct } from '../model/lmsbundledproduct.model';
import { environment } from '../../environments/environment';
import { IlmsbundledproductResponse } from '../model/lmsbundledproduct.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsbundledproductService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmsbundledproducts(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmsbundledproduct', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsbundledproduct' + '/getdefaultdata').toPromise();
    }
  }
  get_lmsbundledproducts_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsbundledproduct').toPromise();
    }
  }
  getListBy_bundleproductid(bundleproductid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsbundledproduct' + '/bundleproductid/' + bundleproductid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsbundledproduct' + '/param/' + key).toPromise();
    }
  }


  get_lmsbundledproducts_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsbundledproduct' + '/e/' + id).toPromise();
    }
  }
  get_lmsbundledproducts_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsbundledproduct' + '/' + id).toPromise();
    }
  }

  delete_lmsbundledproduct(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmsbundledproduct' + '/' + id).toPromise();
    }
  }


}

