import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bosubconfigvalue } from '../model/bosubconfigvalue.model';
import { environment } from '../../environments/environment';
import { IbosubconfigvalueResponse } from '../model/bosubconfigvalue.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bosubconfigvalueService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bosubconfigvalues(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/bosubconfigvalue', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bosubconfigvalue' + '/getdefaultdata').toPromise();
    }
  }
  get_bosubconfigvalues_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bosubconfigvalue').toPromise();
    }
  }
  getListBy_subcategoryid(subcategoryid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bosubconfigvalue' + '/subcategoryid/' + subcategoryid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bosubconfigvalue' + '/param/' + key).toPromise();
    }
  }


  get_bosubconfigvalues_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bosubconfigvalue' + '/e/' + id).toPromise();
    }
  }
  get_bosubconfigvalues_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bosubconfigvalue' + '/' + id).toPromise();
    }
  }

  delete_bosubconfigvalue(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bosubconfigvalue' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbosubconfigvalueResponse> {
    return this.http.get<IbosubconfigvalueResponse>(AppConstants.ntirebizURL + '/bosubconfigvalue')
      .pipe(
        tap((response: IbosubconfigvalueResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bosubconfigvalue => new bosubconfigvalue(bosubconfigvalue.subcategoryid, bosubconfigvalue.configkey, bosubconfigvalue.configkeydesc, bosubconfigvalue.subconfigcode, bosubconfigvalue.subconfigcodedesc, bosubconfigvalue.subcategoryname, bosubconfigvalue.orderno, bosubconfigvalue.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bosubconfigvalue => bosubconfigvalue.subcategoryname.includes(filter.name))

          return response;
        })
      );
  }


  getList_configkey(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bosubconfigvalue' + '/getList_configkey/').toPromise();
  }

  getList_subconfigcode(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bosubconfigvalue' + '/getList_subconfigcode/').toPromise();
  }


}

