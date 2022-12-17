import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crmcustomermaster } from '../model/crmcustomermaster.model';
import { crmcustomeraccountmaster } from '../model/crmcustomeraccountmaster.model';
import { crmcustomerkycmaster } from '../model/crmcustomerkycmaster.model';
import { environment } from '../../environments/environment';
import { IcrmcustomermasterResponse } from '../model/crmcustomermaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class crmcustomermasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_crmcustomermasters(formData, crmcustomeraccountmasters, crmcustomerkycmasters,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        crmcustomeraccountmasters: crmcustomeraccountmasters.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        crmcustomerkycmasters: crmcustomerkycmasters.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/crmcustomermaster', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomermaster' + '/getdefaultdata').toPromise();
    }
  }
  get_crmcustomermasters_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomermaster').toPromise();
    }
  }
  getListBy_customerid(customerid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomermaster' + '/customerid/' + customerid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomermaster' + '/param/' + key).toPromise();
    }
  }


  get_crmcustomermasters_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomermaster' + '/e/' + id).toPromise();
    }
  }
  get_crmcustomermasters_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/crmcustomermaster' + '/' + id).toPromise();
    }
  }

  delete_crmcustomermaster(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/crmcustomermaster' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IcrmcustomermasterResponse> {
    return this.http.get<IcrmcustomermasterResponse>(AppConstants.ntirebizURL + '/crmcustomermaster')
      .pipe(
        tap((response: IcrmcustomermasterResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(crmcustomermaster => new crmcustomermaster(crmcustomermaster.customerid, crmcustomermaster.basebranchid, crmcustomermaster.basebranchiddesc, crmcustomermaster.customertype, crmcustomermaster.customertypedesc, crmcustomermaster.customergroup, crmcustomermaster.customergroupdesc, crmcustomermaster.categoryid, crmcustomermaster.categoryiddesc, crmcustomermaster.subcategoryid, crmcustomermaster.subcategoryiddesc, crmcustomermaster.territory, crmcustomermaster.territorydesc, crmcustomermaster.customercode, crmcustomermaster.companyname, crmcustomermaster.companytype, crmcustomermaster.companytypedesc, crmcustomermaster.incorporationdate, crmcustomermaster.businesssegment, crmcustomermaster.businesssegmentdesc, crmcustomermaster.companylogo, crmcustomermaster.thumbnail, crmcustomermaster.website, crmcustomermaster.mobilenumber, crmcustomermaster.officephone, crmcustomermaster.email, crmcustomermaster.metatags, crmcustomermaster.firstname, crmcustomermaster.lastname, crmcustomermaster.gender, crmcustomermaster.genderdesc, crmcustomermaster.dob, crmcustomermaster.emailid, crmcustomermaster.residencephone, crmcustomermaster.relationshipmanager, crmcustomermaster.relationshipmanagerdesc, crmcustomermaster.address, crmcustomermaster.shippingaddress, crmcustomermaster.billingcurrency, crmcustomermaster.billingcurrencydesc, crmcustomermaster.openingbalance, crmcustomermaster.asondate, crmcustomermaster.creditdays, crmcustomermaster.creditlimit, crmcustomermaster.accountstartfrom, crmcustomermaster.servicelevel, crmcustomermaster.slastartdate, crmcustomermaster.slaenddate, crmcustomermaster.gstregistrationtype, crmcustomermaster.gstregistrationtypedesc, crmcustomermaster.gstinnumber, crmcustomermaster.pannumber, crmcustomermaster.trnnumber, crmcustomermaster.tan, crmcustomermaster.cst, crmcustomermaster.salestax, crmcustomermaster.servicetax, crmcustomermaster.tin, crmcustomermaster.localtax, crmcustomermaster.itfilings, crmcustomermaster.lifetimevalue, crmcustomermaster.averageordervalue, crmcustomermaster.totalorders, crmcustomermaster.totalordervalue, crmcustomermaster.lastorderdate, crmcustomermaster.lastordervalue, crmcustomermaster.loyaltynumber, crmcustomermaster.pointsearned, crmcustomermaster.activepoints, crmcustomermaster.usedpoints, crmcustomermaster.expiredpoints, crmcustomermaster.lockedpoints, crmcustomermaster.blockedpoints, crmcustomermaster.pointsearnedincurrency, crmcustomermaster.activepointsincurrency, crmcustomermaster.usedpointsincurrency, crmcustomermaster.expiredpointsincurrency, crmcustomermaster.lockedpointsincurrency, crmcustomermaster.blockedpointsincurrency, crmcustomermaster.allocationmethod, crmcustomermaster.allocationmethoddesc, crmcustomermaster.customfield, crmcustomermaster.attachment, crmcustomermaster.cifnumber, crmcustomermaster.outstandingamt, crmcustomermaster.status, "", ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(crmcustomermaster => crmcustomermaster.lastname.includes(filter.name))

          return response;
        })
      );
  }


  getList_basebranchid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_basebranchid').toPromise();
  }

  getList_customertype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_customertype/').toPromise();
  }

  getList_customergroup(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_customergroup/').toPromise();
  }

  getList_categoryid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_categoryid').toPromise();
  }

  getList_subcategoryid(categoryid): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_subcategoryid/categoryid').toPromise();
  }

  getList_territory(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_territory').toPromise();
  }

  getList_companytype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_companytype/').toPromise();
  }

  getList_businesssegment(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_businesssegment/').toPromise();
  }

  getList_gender(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_gender/').toPromise();
  }

  getList_relationshipmanager(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_relationshipmanager').toPromise();
  }

  getList_billingcurrency(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_billingcurrency/').toPromise();
  }

  getList_gstregistrationtype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_gstregistrationtype/').toPromise();
  }

  getList_allocationmethod(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_allocationmethod/').toPromise();
  }


}

