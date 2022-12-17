import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsassign } from '../model/lmsassign.model';
import { environment } from '../../environments/environment';
import { IlmsassignResponse } from '../model/lmsassign.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsassignService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmsassigns(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmsassign', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsassign' + '/getdefaultdata').toPromise();
    }
  }
  get_lmsassigns_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsassign').toPromise();
    }
  }
  getListBy_assignid(assignid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsassign' + '/assignid/' + assignid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsassign' + '/param/' + key).toPromise();
    }
  }


  get_lmsassigns_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsassign' + '/e/' + id).toPromise();
    }
  }
  get_lmsassigns_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsassign' + '/' + id).toPromise();
    }
  }

  delete_lmsassign(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmsassign' + '/' + id).toPromise();
    }
  }

  getList_productgroupid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsassign' + '/getList_productgroupid/').toPromise();
  }

  getList_productid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsassign' + '/getList_productid').toPromise();
  }

  getList_source(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsassign' + '/getList_source/').toPromise();
  }

  getList_assigntype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsassign' + '/getList_assigntype/').toPromise();
  }

  getList_assignuser(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsassign' + '/getList_assignuser').toPromise();
  }

  getList_assignrole(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsassign' + '/getList_assignrole').toPromise();
  }


}

