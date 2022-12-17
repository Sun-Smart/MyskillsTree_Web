import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hlpslapriority } from '../model/hlpslapriority.model';
import { environment } from '../../environments/environment';
import { IhlpslapriorityResponse } from '../model/hlpslapriority.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hlpslapriorityService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_hlpslapriorities(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/hlpslapriority', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpslapriority' + '/getdefaultdata').toPromise();
    }
  }
  get_hlpslapriorities_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpslapriority').toPromise();
    }
  }
  getListBy_servicelevelpriorityid(servicelevelpriorityid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpslapriority' + '/servicelevelpriorityid/' + servicelevelpriorityid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpslapriority' + '/param/' + key).toPromise();
    }
  }


  get_hlpslapriorities_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpslapriority' + '/e/' + id).toPromise();
    }
  }
  get_hlpslapriorities_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/hlpslapriority' + '/' + id).toPromise();
    }
  }

  delete_hlpslapriority(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/hlpslapriority' + '/' + id).toPromise();
    }
  }

  getList_priorityid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/hlpslapriority' + '/getList_priorityid/').toPromise();
  }


}

