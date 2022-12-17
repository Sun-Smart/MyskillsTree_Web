import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpcontractorderdetails } from '../model/erpcontractorderdetails.model';
import { environment } from '../../environments/environment';
import { IerpcontractorderdetailsResponse } from '../model/erpcontractorderdetails.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpcontractorderdetailsService {
  formData: erpcontractorderdetails;
  readonly rootURL = AppConstants.ntireprocurementURL;
  list: erpcontractorderdetails[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateerpcontractorderdetails() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntireprocurementURL + '/erpcontractorderdetails', body);
    }
  }

  saveOrUpdateerpcontractorderdetailsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntireprocurementURL + '/erpcontractorderdetails', body);
    }
  }

  geterpcontractorderdetailsList() {
    {
      return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderdetails').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderdetails' + '/param/' + key).toPromise();
    }
  }

  geterpcontractorderdetailsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderdetails' + '/' + id).toPromise();
    }
  }

  deleteerpcontractorderdetails(id: number) {
    {
      return this.http.delete(AppConstants.ntireprocurementURL + '/erpcontractorderdetails' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderdetails')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IerpcontractorderdetailsResponse> {
    return this.http.get<IerpcontractorderdetailsResponse>(AppConstants.ntireprocurementURL + '/erpcontractorderdetails')
      .pipe(
        tap((response: IerpcontractorderdetailsResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(erpcontractorderdetails => new erpcontractorderdetails(erpcontractorderdetails.contractid, erpcontractorderdetails.supplierid, erpcontractorderdetails.versionnumber, erpcontractorderdetails.contractdetailid, erpcontractorderdetails.detailtype, erpcontractorderdetails.detailtypedesc, erpcontractorderdetails.itemid, erpcontractorderdetails.itemiddesc, erpcontractorderdetails.service, erpcontractorderdetails.quantity, erpcontractorderdetails.uom, erpcontractorderdetails.uomdesc, erpcontractorderdetails.currency, erpcontractorderdetails.currencydesc, erpcontractorderdetails.unitprice, erpcontractorderdetails.discountpercent, erpcontractorderdetails.discounttype, erpcontractorderdetails.discounttypedesc, erpcontractorderdetails.saleprice, erpcontractorderdetails.tax1name, erpcontractorderdetails.tax1value, erpcontractorderdetails.tax2name, erpcontractorderdetails.tax2value, erpcontractorderdetails.othercharges, erpcontractorderdetails.totalquotevalue, erpcontractorderdetails.basecurrency, erpcontractorderdetails.basevalue, erpcontractorderdetails.expecteddelivery, erpcontractorderdetails.size, erpcontractorderdetails.color, erpcontractorderdetails.weight, erpcontractorderdetails.notes, erpcontractorderdetails.paymenttermtype, erpcontractorderdetails.paymenttermtypedesc, erpcontractorderdetails.remarks, erpcontractorderdetails.status))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(erpcontractorderdetails => erpcontractorderdetails.service.includes(filter.name))

          return response;
        })
      );
  }



}

