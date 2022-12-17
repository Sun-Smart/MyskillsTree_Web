import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crmticket } from '../model/crmticket.model';
import { crmticketdetail } from '../model/crmticketdetail.model';
import { environment } from '../../environments/environment';
import { IcrmticketResponse } from '../model/crmticket.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class crmticketService {
  formData: crmticket;
  readonly rootURL = AppConstants.ntirecrmURL;
  crmticketdetails: crmticketdetail[] = [];
  list: crmticket[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatecrmtickets() {
    {
      var body = {
        ...this.formData,
        crmticketdetails: this.crmticketdetails.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirecrmURL + '/crmticket', body);
    }
  }

  saveOrUpdatecrmticketsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirecrmURL + '/crmticket', body);
    }
  }

  getcrmticketsList() {
    {
      return this.http.get(AppConstants.ntirecrmURL + '/crmticket').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirecrmURL + '/crmticket' + '/param/' + key).toPromise();
    }
  }

  getcrmticketsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirecrmURL + '/crmticket' + '/' + id).toPromise();
    }
  }

  deletecrmticket(id: number) {
    {
      return this.http.delete(AppConstants.ntirecrmURL + '/crmticket' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.crmticketdetails = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirecrmURL + '/crmticket')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IcrmticketResponse> {
    return this.http.get<IcrmticketResponse>(AppConstants.ntirecrmURL + '/crmticket')
      .pipe(
        tap((response: IcrmticketResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(crmticket => new crmticket(crmticket.ticketid, crmticket.ticketreference, crmticket.customerid, crmticket.customeriddesc, crmticket.accountnumber, crmticket.tickettype, crmticket.tickettypedesc, crmticket.criticality, crmticket.criticalitydesc, crmticket.source, crmticket.sourcedesc, crmticket.category, crmticket.subject, crmticket.ticketdetails, crmticket.rca, crmticket.rcadesc, crmticket.observation, crmticket.rcacompletedon, crmticket.customfield, crmticket.attachment, crmticket.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(crmticket => crmticket.subject.includes(filter.name))

          return response;
        })
      );
  }



}

