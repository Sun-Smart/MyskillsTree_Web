import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmssecondarycontact } from '../model/lmssecondarycontact.model';
import { environment } from '../../environments/environment';
import { IlmssecondarycontactResponse } from '../model/lmssecondarycontact.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmssecondarycontactService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmssecondarycontacts(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmssecondarycontact', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmssecondarycontact' + '/getdefaultdata').toPromise();
    }
  }
  get_lmssecondarycontacts_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmssecondarycontact').toPromise();
    }
  }
  getListBy_secondarycontactid(secondarycontactid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmssecondarycontact' + '/secondarycontactid/' + secondarycontactid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmssecondarycontact' + '/param/' + key).toPromise();
    }
  }


  get_lmssecondarycontacts_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmssecondarycontact' + '/e/' + id).toPromise();
    }
  }
  get_lmssecondarycontacts_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmssecondarycontact' + '/' + id).toPromise();
    }
  }

  delete_lmssecondarycontact(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmssecondarycontact' + '/' + id).toPromise();
    }
  }

  getList_branchid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmssecondarycontact' + '/getList_branchid').toPromise();
  }

  getList_opportunityid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmssecondarycontact' + '/getList_opportunityid').toPromise();
  }

  getList_secondarycontactid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmssecondarycontact' + '/getList_secondarycontactid').toPromise();
  }

  getList_campaignid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmssecondarycontact' + '/getList_campaignid').toPromise();
  }


}

