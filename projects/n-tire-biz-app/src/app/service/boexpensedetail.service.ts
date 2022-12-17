import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boexpensedetail } from '../model/boexpensedetail.model';
import { environment } from '../../environments/environment';
import { IboexpensedetailResponse } from '../model/boexpensedetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boexpensedetailService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_boexpensedetails(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/boexpensedetail', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boexpensedetail' + '/getdefaultdata').toPromise();
    }
  }
  get_boexpensedetails_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boexpensedetail').toPromise();
    }
  }
  getListBy_expensedetailid(expensedetailid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boexpensedetail' + '/expensedetailid/' + expensedetailid).toPromise();
    }
  }

  getListBy_sourcereference(sourcereference: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boexpensedetail' + '/sourcereference/' + sourcereference).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boexpensedetail' + '/param/' + key).toPromise();
    }
  }


  get_boexpensedetails_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boexpensedetail' + '/e/' + id).toPromise();
    }
  }
  get_boexpensedetails_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boexpensedetail' + '/' + id).toPromise();
    }
  }

  delete_boexpensedetail(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/boexpensedetail' + '/' + id).toPromise();
    }
  }


}

