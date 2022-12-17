import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bomenumaster } from '../model/bomenumaster.model';
import { bomenuaction } from '../model/bomenuaction.model';
import { environment } from '../../environments/environment';
import { IbomenumasterResponse } from '../model/bomenumaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bomenumasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bomenumasters(formData, bomenuactions,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        bomenuactions: bomenuactions.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/bomenumaster', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomenumaster' + '/getdefaultdata').toPromise();
    }
  }
  get_bomenumasters_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomenumaster').toPromise();
    }
  }
  getListBy_menuid(menuid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomenumaster' + '/menuid/' + menuid).toPromise();
    }
  }

  getListBy_menuurl(menuurl: string): any {
    debugger
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomenumaster' + '/menuurl/' + menuurl).toPromise();
    }
  }

  getListBy_menucode(menucode: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomenumaster' + '/menucode/' + menucode).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomenumaster' + '/param/' + key).toPromise();
    }
  }


  get_bomenumasters_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomenumaster' + '/e/' + id).toPromise();
    }
  }
  get_bomenumasters_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomenumaster' + '/' + id).toPromise();
    }
  }

  delete_bomenumaster(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bomenumaster' + '/' + id).toPromise();
    }
  }
  get_bousermenumaster_List(param: any = 0): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bomenumaster/bousermenumaster/' + param).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbomenumasterResponse> {
    return this.http.get<IbomenumasterResponse>(AppConstants.ntirebizURL + '/bomenumaster')
      .pipe(
        tap((response: IbomenumasterResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bomenumaster => new bomenumaster(bomenumaster.menuid, bomenumaster.menucode, bomenumaster.menudescription, bomenumaster.menuurl, bomenumaster.actionkey, bomenumaster.iconname, bomenumaster.helpurl, bomenumaster.helptext, bomenumaster.parentid, bomenumaster.parentiddesc, bomenumaster.orderno, bomenumaster.action, bomenumaster.showcheckbox, bomenumaster.showstatus, bomenumaster.checkboxcolumn, bomenumaster.nonew, bomenumaster.noedit, bomenumaster.nodelete, bomenumaster.wherecondition, bomenumaster.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bomenumaster => bomenumaster.menudescription.includes(filter.name))

          return response;
        })
      );
  }


  getList_parentid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bomenumaster' + '/getList_parentid').toPromise();
  }


}

