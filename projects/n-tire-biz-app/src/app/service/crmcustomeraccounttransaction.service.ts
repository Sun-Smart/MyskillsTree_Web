import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crmcustomeraccounttransaction } from '../model/crmcustomeraccounttransaction.model';
import { environment } from '../../environments/environment';
import { IcrmcustomeraccounttransactionResponse } from '../model/crmcustomeraccounttransaction.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class crmcustomeraccounttransactionService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_crmcustomeraccounttransactions(formData): any {
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/crmcustomeraccounttransaction', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomeraccounttransaction' + '/getdefaultdata').toPromise();
    }
  }
  get_crmcustomeraccounttransactions_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomeraccounttransaction').toPromise();
    }
  }
  getListBy_transactionid(transactionid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomeraccounttransaction' + '/transactionid/' + transactionid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomeraccounttransaction' + '/param/' + key).toPromise();
    }
  }


  get_crmcustomeraccounttransactions_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomeraccounttransaction' + '/e/' + id).toPromise();
    }
  }
  get_crmcustomeraccounttransactions_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomeraccounttransaction' + '/' + id).toPromise();
    }
  }

  delete_crmcustomeraccounttransaction(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/crmcustomeraccounttransaction' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IcrmcustomeraccounttransactionResponse> {
    return this.http.get<IcrmcustomeraccounttransactionResponse>(AppConstants.ntirebizURL + '/crmcustomeraccounttransaction')
      .pipe(
        tap((response: IcrmcustomeraccounttransactionResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(crmcustomeraccounttransaction => new crmcustomeraccounttransaction(crmcustomeraccounttransaction.transactionid, crmcustomeraccounttransaction.accountid, crmcustomeraccounttransaction.customerid, crmcustomeraccounttransaction.customeriddesc, crmcustomeraccounttransaction.cifnumber, crmcustomeraccounttransaction.accountnumber, crmcustomeraccounttransaction.date, crmcustomeraccounttransaction.description, crmcustomeraccounttransaction.amount, crmcustomeraccounttransaction.transactiontype, crmcustomeraccounttransaction.transactiontypedesc, crmcustomeraccounttransaction.closingbalance, crmcustomeraccounttransaction.customfield, crmcustomeraccounttransaction.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(crmcustomeraccounttransaction => crmcustomeraccounttransaction.description.includes(filter.name))

          return response;
        })
      );
  }


  getList_customerid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomeraccounttransaction' + '/getList_customerid').toPromise();
  }

  getList_transactiontype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomeraccounttransaction' + '/getList_transactiontype/').toPromise();
  }


}

