import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boexpense } from '../model/boexpense.model';
import { boexpensedetail } from '../model/boexpensedetail.model';
import { environment } from '../../environments/environment';
import { IboexpenseResponse } from '../model/boexpense.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boexpenseService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_boexpenses(formData, boexpensedetails,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        boexpensedetails: boexpensedetails.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/boexpense', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boexpense' + '/getdefaultdata').toPromise();
    }
  }
  get_boexpenses_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boexpense').toPromise();
    }
  }
  getListBy_expenseid(expenseid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boexpense' + '/expenseid/' + expenseid).toPromise();
    }
  }

  getListBy_sourcereference(sourcereference: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boexpense' + '/sourcereference/' + sourcereference).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boexpense' + '/param/' + key).toPromise();
    }
  }


  get_boexpenses_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boexpense' + '/e/' + id).toPromise();
    }
  }
  get_boexpenses_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boexpense' + '/' + id).toPromise();
    }
  }

  delete_boexpense(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/boexpense' + '/' + id).toPromise();
    }
  }

  getList_requesteduserid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boexpense' + '/getList_requesteduserid').toPromise();
  }

  getList_expensetype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boexpense' + '/getList_expensetype/').toPromise();
  }

  getList_expensecategory(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boexpense' + '/getList_expensecategory/').toPromise();
  }

  getList_currency(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boexpense' + '/getList_currency/').toPromise();
  }

  getList_basecurrency(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boexpense' + '/getList_basecurrency/').toPromise();
  }

  getList_costcenterid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boexpense' + '/getList_costcenterid').toPromise();
  }


}

