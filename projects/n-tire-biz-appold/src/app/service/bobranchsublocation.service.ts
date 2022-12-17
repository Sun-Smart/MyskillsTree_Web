import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bobranchsublocation } from '../model/bobranchsublocation.model';
import { environment } from '../../environments/environment';
import { IbobranchsublocationResponse } from '../model/bobranchsublocation.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bobranchsublocationService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bobranchsublocations(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/bobranchsublocation', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchsublocation' + '/getdefaultdata').toPromise();
    }
  }
  get_bobranchsublocations_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchsublocation').toPromise();
    }
  }
  getListBy_sublocationid(sublocationid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchsublocation' + '/sublocationid/' + sublocationid).toPromise();
    }
  }

  getListBy_locationid(locationid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchsublocation' + '/locationid/' + locationid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchsublocation' + '/param/' + key).toPromise();
    }
  }


  get_bobranchsublocations_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchsublocation' + '/e/' + id).toPromise();
    }
  }
  get_bobranchsublocations_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bobranchsublocation' + '/' + id).toPromise();
    }
  }

  delete_bobranchsublocation(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bobranchsublocation' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbobranchsublocationResponse> {
    return this.http.get<IbobranchsublocationResponse>(AppConstants.ntirebizURL + '/bobranchsublocation')
      .pipe(
        tap((response: IbobranchsublocationResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bobranchsublocation => new bobranchsublocation(bobranchsublocation.branchid, bobranchsublocation.sublocationid, bobranchsublocation.locationid, bobranchsublocation.locationiddesc, bobranchsublocation.locationname, bobranchsublocation.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bobranchsublocation => bobranchsublocation.locationname.includes(filter.name))

          return response;
        })
      );
  }


  getList_locationid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bobranchsublocation' + '/getList_locationid').toPromise();
  }


}

