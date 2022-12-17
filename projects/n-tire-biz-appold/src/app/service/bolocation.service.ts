import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bolocation } from '../model/bolocation.model';
import { environment } from '../../environments/environment';
import { IbolocationResponse } from '../model/bolocation.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bolocationService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bolocations(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/bolocation', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bolocation' + '/getdefaultdata').toPromise();
    }
  }
  get_bolocations_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bolocation').toPromise();
    }
  }
  getListBy_locationid(locationid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bolocation' + '/locationid/' + locationid).toPromise();
    }
  }

  getListBy_cityid(cityid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bolocation' + '/cityid/' + cityid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bolocation' + '/param/' + key).toPromise();
    }
  }


  get_bolocations_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bolocation' + '/e/' + id).toPromise();
    }
  }
  get_bolocations_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bolocation' + '/' + id).toPromise();
    }
  }

  delete_bolocation(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bolocation' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbolocationResponse> {
    return this.http.get<IbolocationResponse>(AppConstants.ntirebizURL + '/bolocation')
      .pipe(
        tap((response: IbolocationResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bolocation => new bolocation(bolocation.locationid, bolocation.locationiddesc, bolocation.branchid, bolocation.branchiddesc, bolocation.code, bolocation.name, bolocation.postalcode, bolocation.state, bolocation.stateid, bolocation.city, bolocation.cityid, bolocation.latitude, bolocation.longitude, bolocation.areadetails, bolocation.population, bolocation.remarks, bolocation.customfield, bolocation.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bolocation => bolocation.name.includes(filter.name))

          return response;
        })
      );
  }


  getList_locationid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bolocation' + '/getList_locationid').toPromise();
  }

  getList_branchid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bolocation' + '/getList_branchid').toPromise();
  }


}

