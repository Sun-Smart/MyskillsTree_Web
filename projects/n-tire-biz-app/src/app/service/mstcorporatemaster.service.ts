import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstcorporatemaster } from '../model/mstcorporatemaster.model';
import { mstcorporatelocation } from '../model/mstcorporatelocation.model';
import { mstjobrequirement } from '../model/mstjobrequirement.model';
import { mstjobstatus } from '../model/mstjobstatus.model';
import { environment } from '../../environments/environment';
import { ImstcorporatemasterResponse } from '../model/mstcorporatemaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class mstcorporatemasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_mstcorporatemasters(formData, mstcorporatelocations, mstjobrequirements, mstjobstatuses,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        mstcorporatelocations: mstcorporatelocations.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        mstjobrequirements: mstjobrequirements.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        mstjobstatuses: mstjobstatuses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/mstcorporatemaster', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstcorporatemaster' + '/getdefaultdata').toPromise();
    }
  }
  get_mstcorporatemasters_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstcorporatemaster').toPromise();
    }
  }
  getListBy_corporateid(corporateid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstcorporatemaster' + '/corporateid/' + corporateid).toPromise();
    }
  }

  getListBy_userid(userid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstcorporatemaster' + '/userid/' + userid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstcorporatemaster' + '/param/' + key).toPromise();
    }
  }


  get_mstcorporatemasters_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstcorporatemaster' + '/e/' + id).toPromise();
    }
  }
  get_mstcorporatemasters_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstcorporatemaster' + '/' + id).toPromise();
    }
  }

  delete_mstcorporatemaster(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/mstcorporatemaster' + '/' + id).toPromise();
    }
  }


}

