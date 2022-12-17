import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bomenuaction } from '../model/bomenuaction.model';
import { environment } from '../../environments/environment';
import { IbomenuactionResponse } from '../model/bomenuaction.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bomenuactionService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bomenuactions(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/bomenuaction', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomenuaction' + '/getdefaultdata').toPromise();
    }
  }
  get_bomenuactions_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomenuaction').toPromise();
    }
  }
  getListBy_actionid(actionid: any): any {
    debugger;
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomenuaction' + '/actionid/' + actionid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomenuaction' + '/param/' + key).toPromise();
    }
  }


  get_bomenuactions_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomenuaction' + '/e/' + id).toPromise();
    }
  }
  get_bomenuactions_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomenuaction' + '/' + id).toPromise();
    }
  }

  delete_bomenuaction(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bomenuaction' + '/' + id).toPromise();
    }
  }

  getList_rowselecttype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bomenuaction' + '/getList_rowselecttype/').toPromise();
  }

  getList_actiontype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bomenuaction' + '/getList_actiontype/').toPromise();
  }


}

