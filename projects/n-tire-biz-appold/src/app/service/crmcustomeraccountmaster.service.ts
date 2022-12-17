import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crmcustomeraccountmaster } from '../model/crmcustomeraccountmaster.model';
import { crmcustomeraccounttransaction } from '../model/crmcustomeraccounttransaction.model';
import { environment } from '../../environments/environment';
import { IcrmcustomeraccountmasterResponse } from '../model/crmcustomeraccountmaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class crmcustomeraccountmasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_crmcustomeraccountmasters(formData, crmcustomeraccounttransactions,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        crmcustomeraccounttransactions: crmcustomeraccounttransactions.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/crmcustomeraccountmaster', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomeraccountmaster' + '/getdefaultdata').toPromise();
    }
  }
  get_crmcustomeraccountmasters_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomeraccountmaster').toPromise();
    }
  }
  getListBy_accountid(accountid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomeraccountmaster' + '/accountid/' + accountid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomeraccountmaster' + '/param/' + key).toPromise();
    }
  }


  get_crmcustomeraccountmasters_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomeraccountmaster' + '/e/' + id).toPromise();
    }
  }
  get_crmcustomeraccountmasters_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomeraccountmaster' + '/' + id).toPromise();
    }
  }

  delete_crmcustomeraccountmaster(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/crmcustomeraccountmaster' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IcrmcustomeraccountmasterResponse> {
    return this.http.get<IcrmcustomeraccountmasterResponse>(AppConstants.ntirebizURL + '/crmcustomeraccountmaster')
      .pipe(
        tap((response: IcrmcustomeraccountmasterResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(crmcustomeraccountmaster => new crmcustomeraccountmaster(crmcustomeraccountmaster.accountid, crmcustomeraccountmaster.customerid, crmcustomeraccountmaster.customeriddesc, crmcustomeraccountmaster.cifnumber, crmcustomeraccountmaster.accountnumber, crmcustomeraccountmaster.productid, crmcustomeraccountmaster.productiddesc, crmcustomeraccountmaster.accountopendate, crmcustomeraccountmaster.holdingtype, crmcustomeraccountmaster.holdingtypedesc, crmcustomeraccountmaster.customerholding, crmcustomeraccountmaster.customerholdingdesc, crmcustomeraccountmaster.customfield, crmcustomeraccountmaster.attachment, crmcustomeraccountmaster.status, ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(crmcustomeraccountmaster => crmcustomeraccountmaster.accountnumber.includes(filter.name))

          return response;
        })
      );
  }


  getList_customerid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomeraccountmaster' + '/getList_customerid').toPromise();
  }

  getList_productid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomeraccountmaster' + '/getList_productid').toPromise();
  }

  getList_holdingtype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomeraccountmaster' + '/getList_holdingtype/').toPromise();
  }

  getList_customerholding(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomeraccountmaster' + '/getList_customerholding/').toPromise();
  }


}

