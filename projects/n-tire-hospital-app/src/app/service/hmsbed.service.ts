import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmsbed } from '../model/hmsbed.model';
import { environment } from '../../environments/environment';
import { IhmsbedResponse } from '../model/hmsbed.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmsbedService {
  formData: hmsbed;
  readonly rootURL = AppConstants.baseURL;
  list: hmsbed[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmsbeds() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsbed', body);
    }
  }

  saveOrUpdatehmsbedsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsbed', body);
    }
  }

  gethmsbedsList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsbed').toPromise();
    }
  }
  getListBywardid(wardid: number) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsbed' + '/wardid/' + wardid).toPromise();
    }
  }

  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsbed' + '/param/' + key).toPromise();
    }
  }

  gethmsbedsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsbed' + '/' + id).toPromise();
    }
  }

  deletehmsbed(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmsbed' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmsbed')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IhmsbedResponse> {
    return this.http.get<IhmsbedResponse>(AppConstants.ntirehospitalURL + '/hmsbed')
      .pipe(
        tap((response: IhmsbedResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(hmsbed => new hmsbed(hmsbed.bedid, hmsbed.wardid, hmsbed.bedname, hmsbed.bedtype, hmsbed.bedtypedesc, hmsbed.imageurl, hmsbed.roomlength, hmsbed.roomwidth, hmsbed.facilities, hmsbed.remarks, hmsbed.customfield, hmsbed.attachment, hmsbed.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(hmsbed => hmsbed.bedname.includes(filter.name))

          return response;
        })
      );
  }



}

