import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bomasterdata } from '../model/bomasterdata.model';
import { bosubcategorymaster } from '../model/bosubcategorymaster.model';
import { environment } from '../../environments/environment';
import { IbomasterdataResponse } from '../model/bomasterdata.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bomasterdataService {
  boarray:any[]=[]
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bomasterdatas(formData, bosubcategorymasters,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        bosubcategorymasters: bosubcategorymasters.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/bomasterdata', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomasterdata' + '/getdefaultdata').toPromise();
    }
  }
  get_bomasterdatas_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomasterdata').toPromise();
    }
  }
  getListBy_masterdataid(masterdataid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomasterdata' + '/masterdataid/' + masterdataid).toPromise();
    }
  }

  getList(key: string): any {
    debugger
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomasterdata' + '/param/' + key).toPromise();

    }
  }


  get_bomasterdatas_ByEID(id: any): any {
    debugger
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomasterdata' + '/e/' + id).toPromise();
    }
  }
  get_bomasterdatas_ByID(id: number): any {
    debugger
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomasterdata' + '/' + id).toPromise();
    }
  }

  delete_bomasterdata(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bomasterdata' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbomasterdataResponse> {
    return this.http.get<IbomasterdataResponse>(AppConstants.ntirebizURL + '/bomasterdata')
      .pipe(
        tap((response: IbomasterdataResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bomasterdata => new bomasterdata(bomasterdata.masterdataid, bomasterdata.masterdatatypeid, bomasterdata.masterdatatypeiddesc, bomasterdata.masterdatacode, bomasterdata.masterdatadescription, bomasterdata.orderno, bomasterdata.htmlcode, bomasterdata.param1, bomasterdata.param2, bomasterdata.helptext, bomasterdata.flag, bomasterdata.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bomasterdata => bomasterdata.masterdatadescription.includes(filter.name))

          return response;
        })
      );
  }


  getList_masterdatatypeid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bomasterdata' + '/getList_masterdatatypeid').toPromise();
  }


}

