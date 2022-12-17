import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmspayment } from '../model/hmspayment.model';
import { environment } from '../../environments/environment';
import { IhmspaymentResponse } from '../model/hmspayment.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmspaymentService {
  formData: hmspayment;
  readonly rootURL = AppConstants.baseURL;
  list: hmspayment[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmspayments() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmspayment', body);
    }
  }

  saveOrUpdatehmspaymentsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmspayment', body);
    }
  }

  gethmspaymentsList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspayment').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspayment' + '/param/' + key).toPromise();
    }
  }

  gethmspaymentsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspayment' + '/' + id).toPromise();
    }
  }

  deletehmspayment(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmspayment' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmspayment')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IhmspaymentResponse> {
    return this.http.get<IhmspaymentResponse>(AppConstants.ntirehospitalURL + '/hmspayment')
      .pipe(
        tap((response: IhmspaymentResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(hmspayment => new hmspayment(hmspayment.paymentid, hmspayment.paymentreference, hmspayment.debitaccountid, hmspayment.debitaccountiddesc, hmspayment.creditaccountid, hmspayment.creditaccountiddesc, hmspayment.transactionamount, hmspayment.paymentmode, hmspayment.paymentmodedesc, hmspayment.narration, hmspayment.notes, hmspayment.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(hmspayment => hmspayment.paymentreference.includes(filter.name))

          return response;
        })
      );
  }



}

