import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flmexpense } from '../model/flmexpense.model';
import { environment } from '../../environments/environment';
import { IflmexpenseResponse } from '../model/flmexpense.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class flmexpenseService {
  formData: flmexpense;
  readonly rootURL = AppConstants.ntirefleetURL;
  list: flmexpense[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateflmexpenses() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmexpense', body);
    }
  }

  saveOrUpdateflmexpensesList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmexpense', body);
    }
  }

  getflmexpensesList() {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmexpense').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmexpense' + '/param/' + key).toPromise();
    }
  }

  getflmexpensesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmexpense' + '/' + id).toPromise();
    }
  }

  deleteflmexpense(id: number) {
    {
      return this.http.delete(AppConstants.ntirefleetURL + '/flmexpense' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirefleetURL + '/flmexpense')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IflmexpenseResponse> {
    return this.http.get<IflmexpenseResponse>(AppConstants.ntirefleetURL + '/flmexpense')
      .pipe(
        tap((response: IflmexpenseResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(flmexpense => new flmexpense(flmexpense.expenseid, flmexpense.vehicleid, flmexpense.description, flmexpense.expensetype, flmexpense.expensedate, flmexpense.amount, flmexpense.vendorid, flmexpense.vendoriddesc, flmexpense.remarks, flmexpense.customfield, flmexpense.attachment, flmexpense.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(flmexpense => flmexpense.description.includes(filter.name))

          return response;
        })
      );
  }



}

