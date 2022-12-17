import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmsward } from '../model/hmsward.model';
import { hmswardround } from '../model/hmswardround.model';
import { hmsbed } from '../model/hmsbed.model';
import { hmswardincharge } from '../model/hmswardincharge.model';
import { environment } from '../../environments/environment';
import { IhmswardResponse } from '../model/hmsward.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmswardService {
  formData: hmsward;
  readonly rootURL = AppConstants.baseURL;
  hmswardrounds: hmswardround[] = [];
  hmsbeds: hmsbed[] = [];
  hmswardincharges: hmswardincharge[] = [];
  list: hmsward[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmswards() {
    {
      var body = {
        ...this.formData,
        hmswardrounds: this.hmswardrounds.filter(function (el) { return Object.keys(el).length != 0; }),
        hmsbeds: this.hmsbeds.filter(function (el) { return Object.keys(el).length != 0; }),
        hmswardincharges: this.hmswardincharges.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsward', body);
    }
  }

  saveOrUpdatehmswardsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsward', body);
    }
  }

  gethmswardsList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsward').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsward' + '/param/' + key).toPromise();
    }
  }

  gethmswardsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsward' + '/' + id).toPromise();
    }
  }

  deletehmsward(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmsward' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.hmswardrounds = [];
    this.hmsbeds = [];
    this.hmswardincharges = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmsward')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IhmswardResponse> {
    return this.http.get<IhmswardResponse>(AppConstants.ntirehospitalURL + '/hmsward')
      .pipe(
        tap((response: IhmswardResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(hmsward => new hmsward(hmsward.wardid, hmsward.wardname, hmsward.responsibilityid, hmsward.responsibilityiddesc, hmsward.beds, hmsward.imageurl, hmsward.notes, hmsward.customfield, hmsward.attachment, hmsward.status, "", "", ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(hmsward => hmsward.wardname.includes(filter.name))

          return response;
        })
      );
  }



}

