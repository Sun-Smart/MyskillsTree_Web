import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hlpplannedaction } from '../model/hlpplannedaction.model';
import { environment } from '../../environments/environment';
import { IhlpplannedactionResponse } from '../model/hlpplannedaction.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hlpplannedactionService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_hlpplannedactions(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/hlpplannedaction', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpplannedaction' + '/getdefaultdata').toPromise();
    }
  }
  get_hlpplannedactions_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpplannedaction').toPromise();
    }
  }
  getListBy_planid(planid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpplannedaction' + '/planid/' + planid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpplannedaction' + '/param/' + key).toPromise();
    }
  }


  get_hlpplannedactions_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpplannedaction' + '/e/' + id).toPromise();
    }
  }
  get_hlpplannedactions_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpplannedaction' + '/' + id).toPromise();
    }
  }

  delete_hlpplannedaction(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/hlpplannedaction' + '/' + id).toPromise();
    }
  }

  getList_ticketid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpplannedaction' + '/getList_ticketid').toPromise();
  }


}

