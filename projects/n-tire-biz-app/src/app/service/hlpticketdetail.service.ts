import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hlpticketdetail } from '../model/hlpticketdetail.model';
import { environment } from '../../environments/environment';
import { IhlpticketdetailResponse } from '../model/hlpticketdetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hlpticketdetailService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_hlpticketdetails(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/hlpticketdetail', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticketdetail' + '/getdefaultdata').toPromise();
    }
  }
  get_hlpticketdetails_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticketdetail').toPromise();
    }
  }
  getListBy_ticketdetailid(ticketdetailid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticketdetail' + '/ticketdetailid/' + ticketdetailid).toPromise();
    }
  }

  getListBy_sourcereference(sourcereference: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticketdetail' + '/sourcereference/' + sourcereference).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticketdetail' + '/param/' + key).toPromise();
    }
  }


  get_hlpticketdetails_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticketdetail' + '/e/' + id).toPromise();
    }
  }
  get_hlpticketdetails_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpticketdetail' + '/' + id).toPromise();
    }
  }

  delete_hlpticketdetail(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/hlpticketdetail' + '/' + id).toPromise();
    }
  }

  getList_ticketid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpticketdetail' + '/getList_ticketid').toPromise();
  }

  getList_actionuser(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpticketdetail' + '/getList_actionuser').toPromise();
  }


}

