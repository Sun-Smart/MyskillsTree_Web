import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bodynamicform } from '../model/bodynamicform.model';
import { bodynamicformdetail } from '../model/bodynamicformdetail.model';
import { environment } from '../../environments/environment';
import { IbodynamicformResponse } from '../model/bodynamicform.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bodynamicformService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bodynamicforms(formData, bodynamicformdetails,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        bodynamicformdetails: bodynamicformdetails.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/bodynamicform', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodynamicform' + '/getdefaultdata').toPromise();
    }
  }
  get_bodynamicforms_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodynamicform').toPromise();
    }
  }
  getListBy_formid(formid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodynamicform' + '/formid/' + formid).toPromise();
    }
  }

  getListBy_tableiddesc(tableiddesc: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodynamicform' + '/tableiddesc/' + tableiddesc).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodynamicform' + '/param/' + key).toPromise();
    }
  }


  get_bodynamicforms_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodynamicform' + '/e/' + id).toPromise();
    }
  }
  get_bodynamicforms_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bodynamicform' + '/' + id).toPromise();
    }
  }

  delete_bodynamicform(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bodynamicform' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbodynamicformResponse> {
    return this.http.get<IbodynamicformResponse>(AppConstants.ntirebizURL + '/bodynamicform')
      .pipe(
        tap((response: IbodynamicformResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bodynamicform => new bodynamicform(bodynamicform.tableid, bodynamicform.tableiddesc, bodynamicform.tableiddesc, bodynamicform.conditionfield, bodynamicform.conditionvalue, bodynamicform.formid, bodynamicform.formname, bodynamicform.formtype, bodynamicform.formtypedesc, bodynamicform.formhtml, bodynamicform.cols, bodynamicform.templatehtml, bodynamicform.hasattachments, bodynamicform.sequence, bodynamicform.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bodynamicform => bodynamicform.formname.includes(filter.name))

          return response;
        })
      );
  }


  getList_tableid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bodynamicform' + '/getList_tableid').toPromise();
  }

  getList_formtype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bodynamicform' + '/getList_formtype/').toPromise();
  }


}

