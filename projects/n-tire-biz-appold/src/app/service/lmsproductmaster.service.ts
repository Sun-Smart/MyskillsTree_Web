import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsproductmaster } from '../model/lmsproductmaster.model';
import { lmsbundledproduct } from '../model/lmsbundledproduct.model';
import { environment } from '../../environments/environment';
import { IlmsproductmasterResponse } from '../model/lmsproductmaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsproductmasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmsproductmasters(formData, lmsbundledproducts, Insertlmsbundledproducts,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        lmsbundledproducts: Insertlmsbundledproducts.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmsproductmaster', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsproductmaster' + '/getdefaultdata').toPromise();
    }
  }
  get_lmsproductmasters_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsproductmaster').toPromise();
    }
  }
  getListBy_productid(productid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsproductmaster' + '/productid/' + productid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsproductmaster' + '/param/' + key).toPromise();
    }
  }


  get_lmsproductmasters_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsproductmaster' + '/e/' + id).toPromise();
    }
  }
  get_lmsproductmasters_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsproductmaster' + '/' + id).toPromise();
    }
  }

  delete_lmsproductmaster(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmsproductmaster' + '/' + id).toPromise();
    }
  }

  getList_productgroup(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsproductmaster' + '/getList_productgroup/').toPromise();
  }


}

