import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmscorporatesecondarycontact } from '../model/lmscorporatesecondarycontact.model';
import { environment } from '../../environments/environment';
import { IlmscorporatesecondarycontactResponse } from '../model/lmscorporatesecondarycontact.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmscorporatesecondarycontactService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmscorporatesecondarycontacts(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmscorporatesecondarycontact', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscorporatesecondarycontact' + '/getdefaultdata').toPromise();
    }
  }
  get_lmscorporatesecondarycontacts_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscorporatesecondarycontact').toPromise();
    }
  }
  getListBy_secondarycontactid(secondarycontactid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscorporatesecondarycontact' + '/secondarycontactid/' + secondarycontactid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscorporatesecondarycontact' + '/param/' + key).toPromise();
    }
  }


  get_lmscorporatesecondarycontacts_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscorporatesecondarycontact' + '/e/' + id).toPromise();
    }
  }
  get_lmscorporatesecondarycontacts_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmscorporatesecondarycontact' + '/' + id).toPromise();
    }
  }

  delete_lmscorporatesecondarycontact(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmscorporatesecondarycontact' + '/' + id).toPromise();
    }
  }

  getList_branchid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscorporatesecondarycontact' + '/getList_branchid').toPromise();
  }

  getList_designation(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscorporatesecondarycontact' + '/getList_designation').toPromise();
  }

  getList_category(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscorporatesecondarycontact' + '/getList_category/').toPromise();
  }

  getList_groupname(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmscorporatesecondarycontact' + '/getList_groupname/').toPromise();
  }


}

