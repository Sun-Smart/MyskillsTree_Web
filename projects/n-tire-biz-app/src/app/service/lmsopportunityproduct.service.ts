import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsopportunityproduct } from '../model/lmsopportunityproduct.model';
import { environment } from '../../environments/environment';
import { IlmsopportunityproductResponse } from '../model/lmsopportunityproduct.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsopportunityproductService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmsopportunityproducts(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmsopportunityproduct', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsopportunityproduct' + '/getdefaultdata').toPromise();
    }
  }
  get_lmsopportunityproducts_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsopportunityproduct').toPromise();
    }
  }
  getListBy_opportunityproductid(opportunityproductid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsopportunityproduct' + '/opportunityproductid/' + opportunityproductid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsopportunityproduct' + '/param/' + key).toPromise();
    }
  }


  get_lmsopportunityproducts_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsopportunityproduct' + '/e/' + id).toPromise();
    }
  }
  get_lmsopportunityproducts_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsopportunityproduct' + '/' + id).toPromise();
    }
  }

  delete_lmsopportunityproduct(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmsopportunityproduct' + '/' + id).toPromise();
    }
  }

  getList_opportunityid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunityproduct' + '/getList_opportunityid').toPromise();
  }

  getList_productid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunityproduct' + '/getList_productid').toPromise();
  }

  getList_uom(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunityproduct' + '/getList_uom/').toPromise();
  }


}

