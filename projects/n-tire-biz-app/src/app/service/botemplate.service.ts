import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { botemplate } from '../model/botemplate.model';
import { environment } from '../../environments/environment';
import { IbotemplateResponse } from '../model/botemplate.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class botemplateService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_botemplates(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/botemplate', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/botemplate' + '/getdefaultdata').toPromise();
    }
  }
  get_botemplates_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/botemplate').toPromise();
    }
  }
  getListBy_templateid(templateid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/botemplate' + '/templateid/' + templateid).toPromise();
    }
  }

  getListBy_templatecode(templatecode: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/botemplate' + '/templatecode/' + templatecode).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/botemplate' + '/param/' + key).toPromise();
    }
  }


  get_botemplates_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/botemplate' + '/e/' + id).toPromise();
    }
  }
  get_botemplates_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/botemplate' + '/' + id).toPromise();
    }
  }

  delete_botemplate(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/botemplate' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbotemplateResponse> {
    return this.http.get<IbotemplateResponse>(AppConstants.ntirebizURL + '/botemplate')
      .pipe(
        tap((response: IbotemplateResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(botemplate => new botemplate(botemplate.templateid, botemplate.templatetype, botemplate.templatetypedesc, botemplate.templatecode, botemplate.templatetext, botemplate.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(botemplate => botemplate.templatecode.includes(filter.name))

          return response;
        })
      );
  }


  getList_templatetype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/botemplate' + '/getList_templatetype/').toPromise();
  }


}

