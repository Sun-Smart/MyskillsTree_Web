import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bofinancialyear } from '../model/bofinancialyear.model';
import { environment } from '../../environments/environment';
import { IbofinancialyearResponse } from '../model/bofinancialyear.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bofinancialyearService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bofinancialyears(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/bofinancialyear', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bofinancialyear' + '/getdefaultdata').toPromise();
    }
  }
  get_bofinancialyears_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bofinancialyear').toPromise();
    }
  }
  getListBy_finyearid(finyearid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bofinancialyear' + '/finyearid/' + finyearid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bofinancialyear' + '/param/' + key).toPromise();
    }
  }


  get_bofinancialyears_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bofinancialyear' + '/e/' + id).toPromise();
    }
  }
  get_bofinancialyears_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bofinancialyear' + '/' + id).toPromise();
    }
  }

  delete_bofinancialyear(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bofinancialyear' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbofinancialyearResponse> {
    return this.http.get<IbofinancialyearResponse>(AppConstants.ntirebizURL + '/bofinancialyear')
      .pipe(
        tap((response: IbofinancialyearResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bofinancialyear => new bofinancialyear(bofinancialyear.finyearid, bofinancialyear.finyearname, bofinancialyear.startdate, bofinancialyear.enddate, bofinancialyear.currentyear, bofinancialyear.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bofinancialyear => bofinancialyear.finyearname.includes(filter.name))

          return response;
        })
      );
  }



}

