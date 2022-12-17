import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bosubcategorymaster } from '../model/bosubcategorymaster.model';
import { environment } from '../../environments/environment';
import { IbosubcategorymasterResponse } from '../model/bosubcategorymaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bosubcategorymasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bosubcategorymasters(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/bosubcategorymaster', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bosubcategorymaster' + '/getdefaultdata').toPromise();
    }
  }
  get_bosubcategorymasters_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bosubcategorymaster').toPromise();
    }
  }
  getListBy_subcategoryid(subcategoryid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bosubcategorymaster' + '/subcategoryid/' + subcategoryid).toPromise();
    }
  }

  getListBy_categoryid(categoryid: number): any {

    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bosubcategorymaster' + '/categoryid/' + categoryid).toPromise();
    }
  }

  getList(key: string): any {

    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bosubcategorymaster' + '/param/' + key).toPromise();
    }
  }


  get_bosubcategorymasters_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bosubcategorymaster' + '/e/' + id).toPromise();
    }
  }
  get_bosubcategorymasters_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bosubcategorymaster' + '/' + id).toPromise();
    }
  }

  delete_bosubcategorymaster(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bosubcategorymaster' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbosubcategorymasterResponse> {
    return this.http.get<IbosubcategorymasterResponse>(AppConstants.ntirebizURL + '/bosubcategorymaster')
      .pipe(
        tap((response: IbosubcategorymasterResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bosubcategorymaster => new bosubcategorymaster(bosubcategorymaster.subcategoryid, bosubcategorymaster.categoryid, bosubcategorymaster.subcategoryname, bosubcategorymaster.orderno, bosubcategorymaster.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bosubcategorymaster => bosubcategorymaster.subcategoryname.includes(filter.name))

          return response;
        })
      );
  }



}

