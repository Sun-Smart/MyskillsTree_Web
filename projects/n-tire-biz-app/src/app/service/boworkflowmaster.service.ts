import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boworkflowmaster } from '../model/boworkflowmaster.model';
import { boworkflow } from '../model/boworkflow.model';
import { boworkflowstep } from '../model/boworkflowstep.model';
import { environment } from '../../environments/environment';
import { IboworkflowmasterResponse } from '../model/boworkflowmaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boworkflowmasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_boworkflowmasters(formData, boworkflows, boworkflowsteps,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        boworkflows: boworkflows.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        boworkflowsteps: boworkflowsteps.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/boworkflowmaster', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boworkflowmaster' + '/getdefaultdata').toPromise();
    }
  }
  get_boworkflowmasters_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boworkflowmaster').toPromise();
    }
  }
  getListBy_workflowmasterid(workflowmasterid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boworkflowmaster' + '/workflowmasterid/' + workflowmasterid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boworkflowmaster' + '/param/' + key).toPromise();
    }
  }


  get_boworkflowmasters_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boworkflowmaster' + '/e/' + id).toPromise();
    }
  }
  get_boworkflowmasters_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boworkflowmaster' + '/' + id).toPromise();
    }
  }

  delete_boworkflowmaster(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/boworkflowmaster' + '/' + id).toPromise();
    }
  }

  getList_menucode(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boworkflowmaster' + '/getList_menucode').toPromise();
  }

  getList_tablecode(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boworkflowmaster' + '/getList_tablecode').toPromise();
  }


}

