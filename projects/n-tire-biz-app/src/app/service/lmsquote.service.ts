import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsquote } from '../model/lmsquote.model';
import { lmsquotedetail } from '../model/lmsquotedetail.model';
import { lmsquotepaymentterm } from '../model/lmsquotepaymentterm.model';
import { environment } from '../../environments/environment';
import { IlmsquoteResponse } from '../model/lmsquote.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsquoteService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmsquotes(formData, lmsquotedetails, lmsquotepaymentterms,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        lmsquotedetails: lmsquotedetails.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        lmsquotepaymentterms: lmsquotepaymentterms.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmsquote', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsquote' + '/getdefaultdata').toPromise();
    }
  }
  get_lmsquotes_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsquote').toPromise();
    }
  }
  getListBy_quoteid(quoteid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsquote' + '/quoteid/' + quoteid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsquote' + '/param/' + key).toPromise();
    }
  }


  get_lmsquotes_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsquote' + '/e/' + id).toPromise();
    }
  }
  get_lmsquotes_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsquote' + '/' + id).toPromise();
    }
  }

  delete_lmsquote(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmsquote' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IlmsquoteResponse> {
    return this.http.get<IlmsquoteResponse>(AppConstants.ntirebizURL + '/lmsquote')
      .pipe(
        tap((response: IlmsquoteResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(lmsquote => new lmsquote(lmsquote.branchid, lmsquote.leadid, lmsquote.opportunityid, lmsquote.opportunityiddesc, lmsquote.quoteid, lmsquote.reference, lmsquote.quotedate, lmsquote.details, lmsquote.assignedto, lmsquote.quoteamount, lmsquote.currency, lmsquote.currencydesc, lmsquote.expirationdate, lmsquote.taxid, lmsquote.taxiddesc, lmsquote.shippingruleid, lmsquote.totalamount, lmsquote.taxamount, lmsquote.charges, lmsquote.paymenttermid, lmsquote.paymenttermiddesc, lmsquote.termid, lmsquote.termiddesc, lmsquote.terms, lmsquote.comments, lmsquote.campaignid, lmsquote.leadsource, lmsquote.leadsourcedesc, lmsquote.supplierquotationid, lmsquote.customfield, lmsquote.attachment, lmsquote.quotestatus, lmsquote.quotestatusdesc, lmsquote.status, "", ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(lmsquote => lmsquote.details.includes(filter.name))

          return response;
        })
      );
  }


  getList_opportunityid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquote' + '/getList_opportunityid').toPromise();
  }

  getList_currency(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquote' + '/getList_currency/').toPromise();
  }

  getList_taxid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquote' + '/getList_taxid').toPromise();
  }

  getList_paymenttermid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquote' + '/getList_paymenttermid').toPromise();
  }

  getList_termid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquote' + '/getList_termid').toPromise();
  }

  getList_leadsource(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquote' + '/getList_leadsource/').toPromise();
  }

  getList_quotestatus(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquote' + '/getList_quotestatus/').toPromise();
  }


}

