import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { systemtable } from '../model/systemtable.model';
import { systemtabletemplate } from '../model/systemtabletemplate.model';
import { environment } from '../../environments/environment';
import { IsystemtableResponse } from '../model/systemtable.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class systemtableService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_systemtables(formData, systemtabletemplates,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        systemtabletemplates: systemtabletemplates.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/systemtable', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/systemtable' + '/getdefaultdata').toPromise();
    }
  }
  get_systemtables_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/systemtable').toPromise();
    }
  }
  getListBy_tableid(tableid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/systemtable' + '/tableid/' + tableid).toPromise();
    }
  }

  getListBy_tablename(tablename: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/systemtable' + '/tablename/' + tablename).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/systemtable' + '/param/' + key).toPromise();
    }
  }


  get_systemtables_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/systemtable' + '/e/' + id).toPromise();
    }
  }
  get_systemtables_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/systemtable' + '/' + id).toPromise();
    }
  }

  delete_systemtable(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/systemtable' + '/' + id).toPromise();
    }
  }

  getList_remindercolorcode(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/systemtable' + '/getList_remindercolorcode/').toPromise();
  }

  getList_reminderpriority(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/systemtable' + '/getList_reminderpriority/').toPromise();
  }

  getList_remindericon(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/systemtable' + '/getList_remindericon/').toPromise();
  }


}

