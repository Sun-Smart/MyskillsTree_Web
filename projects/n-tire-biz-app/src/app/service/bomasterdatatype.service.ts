import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bomasterdatatype } from '../model/bomasterdatatype.model';
import { bomasterdata } from '../model/bomasterdata.model';
import { environment } from '../../environments/environment';
import { IbomasterdatatypeResponse } from '../model/bomasterdatatype.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bomasterdatatypeService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bomasterdatatypes(formData, bomasterdatas,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        bomasterdatas: bomasterdatas.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/bomasterdatatype', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomasterdatatype' + '/getdefaultdata').toPromise();
    }
  }
  get_bomasterdatatypes_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomasterdatatype').toPromise();
    }
  }
  getListBy_datatypeid(datatypeid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomasterdatatype' + '/datatypeid/' + datatypeid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomasterdatatype' + '/param/' + key).toPromise();
    }
  }


  get_bomasterdatatypes_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomasterdatatype' + '/e/' + id).toPromise();
    }
  }
  get_bomasterdatatypes_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomasterdatatype' + '/' + id).toPromise();
    }
  }

  delete_bomasterdatatype(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bomasterdatatype' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbomasterdatatypeResponse> {
    return this.http.get<IbomasterdatatypeResponse>(AppConstants.ntirebizURL + '/bomasterdatatype')
      .pipe(
        tap((response: IbomasterdatatypeResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bomasterdatatype => new bomasterdatatype(bomasterdatatype.datatypeid, bomasterdatatype.code, bomasterdatatype.codedesc, bomasterdatatype.masterdataname, bomasterdatatype.hassubcategory, bomasterdatatype.canadd, bomasterdatatype.canedit, bomasterdatatype.candelete, bomasterdatatype.erp, bomasterdatatype.cams, bomasterdatatype.crm, bomasterdatatype.procurement, bomasterdatatype.legal, bomasterdatatype.hrms, bomasterdatatype.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bomasterdatatype => bomasterdatatype.masterdataname.includes(filter.name))

          return response;
        })
      );
  }


  getList_code(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bomasterdatatype' + '/getList_code/').toPromise();
  }


}

