import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmsreceipts } from '../model/hmsreceipts.model';
import { environment } from '../../environments/environment';
import { IhmsreceiptsResponse } from '../model/hmsreceipts.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmsreceiptsService {
  formData: hmsreceipts;
  readonly rootURL = AppConstants.baseURL;
  list: hmsreceipts[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmsreceipts() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsreceipts', body);
    }
  }

  saveOrUpdatehmsreceiptsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsreceipts', body);
    }
  }

  gethmsreceiptsList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsreceipts').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsreceipts' + '/param/' + key).toPromise();
    }
  }

  gethmsreceiptsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsreceipts' + '/' + id).toPromise();
    }
  }

  deletehmsreceipts(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmsreceipts' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmsreceipts')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IhmsreceiptsResponse> {
    return this.http.get<IhmsreceiptsResponse>(AppConstants.ntirehospitalURL + '/hmsreceipts')
      .pipe(
        tap((response: IhmsreceiptsResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(hmsreceipts => new hmsreceipts(hmsreceipts.receiptid, hmsreceipts.patientid, hmsreceipts.doctorid, hmsreceipts.doctoriddesc, hmsreceipts.receiptcode, hmsreceipts.receiptdate, hmsreceipts.receipttime, hmsreceipts.paymentcategory, hmsreceipts.paymentcategorydesc, hmsreceipts.outstandingamount, hmsreceipts.paymentmode, hmsreceipts.paymentmodedesc, hmsreceipts.paidamount, hmsreceipts.reference, hmsreceipts.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(hmsreceipts => hmsreceipts.receiptcode.includes(filter.name))

          return response;
        })
      );
  }



}

