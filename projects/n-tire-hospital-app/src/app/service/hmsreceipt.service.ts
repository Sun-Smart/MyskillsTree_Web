import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmsreceipt } from '../model/hmsreceipt.model';
import { environment } from '../../environments/environment';
import { IhmsreceiptResponse } from '../model/hmsreceipt.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmsreceiptService {
  formData: hmsreceipt;
  readonly rootURL = AppConstants.baseURL;
  list: hmsreceipt[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmsreceipts() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsreceipt', body);
    }
  }

  saveOrUpdatehmsreceiptsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmsreceipt', body);
    }
  }

  gethmsreceiptsList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsreceipt').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsreceipt' + '/param/' + key).toPromise();
    }
  }

  gethmsreceiptsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmsreceipt' + '/' + id).toPromise();
    }
  }

  deletehmsreceipt(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmsreceipt' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmsreceipt')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IhmsreceiptResponse> {
    return this.http.get<IhmsreceiptResponse>(AppConstants.ntirehospitalURL + '/hmsreceipt')
      .pipe(
        tap((response: IhmsreceiptResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(hmsreceipt => new hmsreceipt(hmsreceipt.receiptid, hmsreceipt.patientid, hmsreceipt.doctorid, hmsreceipt.doctoriddesc, hmsreceipt.receiptcode, hmsreceipt.receiptdate, hmsreceipt.receipttime, hmsreceipt.paymentcategory, hmsreceipt.paymentcategorydesc, hmsreceipt.outstandingamount, hmsreceipt.paymentmode, hmsreceipt.paymentmodedesc, hmsreceipt.paidamount, hmsreceipt.reference, hmsreceipt.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(hmsreceipt => hmsreceipt.receiptcode.includes(filter.name))

          return response;
        })
      );
  }



}

