import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boworkflowstep } from '../model/boworkflowstep.model';
import { environment } from '../../environments/environment';
import { IboworkflowstepResponse } from '../model/boworkflowstep.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boworkflowstepService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_boworkflowsteps(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/boworkflowstep', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boworkflowstep' + '/getdefaultdata').toPromise();
    }
  }
  get_boworkflowsteps_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boworkflowstep').toPromise();
    }
  }
  getListBy_workflowstepid(workflowstepid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boworkflowstep' + '/workflowstepid/' + workflowstepid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boworkflowstep' + '/param/' + key).toPromise();
    }
  }


  get_boworkflowsteps_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boworkflowstep' + '/e/' + id).toPromise();
    }
  }
  get_boworkflowsteps_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/boworkflowstep' + '/' + id).toPromise();
    }
  }

  delete_boworkflowstep(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/boworkflowstep' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IboworkflowstepResponse> {
    return this.http.get<IboworkflowstepResponse>(AppConstants.ntirebizURL + '/boworkflowstep')
      .pipe(
        tap((response: IboworkflowstepResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(boworkflowstep => new boworkflowstep(boworkflowstep.workflowstepid, boworkflowstep.workflowmasterid, boworkflowstep.stepno, boworkflowstep.stepname, boworkflowstep.tat, boworkflowstep.task, boworkflowstep.taskdesc, boworkflowstep.condition, boworkflowstep.yesstep, boworkflowstep.yesstepdesc, boworkflowstep.nostep, boworkflowstep.nostepdesc, boworkflowstep.approver, boworkflowstep.workflowuserfieldtype, boworkflowstep.workflowuserfieldtypedesc, boworkflowstep.workflowuserfieldname, boworkflowstep.parentid, boworkflowstep.parentiddesc, boworkflowstep.noedittransaction, boworkflowstep.autoapproval, boworkflowstep.autodenial, boworkflowstep.waitduration, boworkflowstep.remainderduration, boworkflowstep.escalationuser, boworkflowstep.cc, boworkflowstep.customfieldid, boworkflowstep.customfieldiddesc, boworkflowstep.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(boworkflowstep => boworkflowstep.stepname.includes(filter.name))

          return response;
        })
      );
  }


  getList_task(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boworkflowstep' + '/getList_task/').toPromise();
  }

  getList_yesstep(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boworkflowstep' + '/getList_yesstep').toPromise();
  }

  getList_nostep(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boworkflowstep' + '/getList_nostep').toPromise();
  }

  getList_workflowuserfieldtype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boworkflowstep' + '/getList_workflowuserfieldtype/').toPromise();
  }

  getList_parentid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boworkflowstep' + '/getList_parentid').toPromise();
  }

  getList_customfieldid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/boworkflowstep' + '/getList_customfieldid').toPromise();
  }


}

