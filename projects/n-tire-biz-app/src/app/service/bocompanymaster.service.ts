import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bocompanymaster } from '../model/bocompanymaster.model';
import { bocompanyholiday } from '../model/bocompanyholiday.model';
import { bofinancialyear } from '../model/bofinancialyear.model';
import { environment } from '../../environments/environment';
import { IbocompanymasterResponse } from '../model/bocompanymaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bocompanymasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bocompanymasters(formData, bocompanyholidays, bofinancialyears,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        bocompanyholidays: bocompanyholidays.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        bofinancialyears: bofinancialyears.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/bocompanymaster', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanymaster' + '/getdefaultdata').toPromise();
    }
  }
  get_bocompanymasters_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanymaster').toPromise();
    }
  }
  getListBy_companyid(companyid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanymaster' + '/companyid/' + companyid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanymaster' + '/param/' + key).toPromise();
    }
  }


  get_bocompanymasters_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanymaster' + '/e/' + id).toPromise();
    }
  }
  get_bocompanymasters_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bocompanymaster' + '/' + id).toPromise();
    }
  }

  delete_bocompanymaster(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bocompanymaster' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbocompanymasterResponse> {
    return this.http.get<IbocompanymasterResponse>(AppConstants.ntirebizURL + '/bocompanymaster')
      .pipe(
        tap((response: IbocompanymasterResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bocompanymaster => new bocompanymaster(bocompanymaster.companyid, bocompanymaster.code, bocompanymaster.companyname, bocompanymaster.registrationnumber, bocompanymaster.companytype, bocompanymaster.companytypedesc, bocompanymaster.companylogo, bocompanymaster.website, bocompanymaster.phone, bocompanymaster.email, bocompanymaster.address1, bocompanymaster.address2, bocompanymaster.countryid, bocompanymaster.countryiddesc, bocompanymaster.stateid, bocompanymaster.stateiddesc, bocompanymaster.cityid, bocompanymaster.cityiddesc, bocompanymaster.locationid, bocompanymaster.locationiddesc, bocompanymaster.pincode, bocompanymaster.contactname, bocompanymaster.designation, bocompanymaster.designationdesc, bocompanymaster.cpphone, bocompanymaster.cpemail, bocompanymaster.incorporationdate, bocompanymaster.businesssegment, bocompanymaster.businesssegmentdesc, bocompanymaster.details, bocompanymaster.services, bocompanymaster.startdate, bocompanymaster.enddate, bocompanymaster.bankid, bocompanymaster.chartofaccounts, bocompanymaster.shippingaddress1, bocompanymaster.shippingaddress2, bocompanymaster.shippingcountryid, bocompanymaster.shippingcountryiddesc, bocompanymaster.shippingstateid, bocompanymaster.shippingstateiddesc, bocompanymaster.shippingcityid, bocompanymaster.shippingcityiddesc, bocompanymaster.shippingpincode, bocompanymaster.basecurrency, bocompanymaster.basecurrencydesc, bocompanymaster.gstregistrationtype, bocompanymaster.gstregistrationtypedesc, bocompanymaster.gstinnumber, bocompanymaster.pannumber, bocompanymaster.trnnumber, bocompanymaster.tan, bocompanymaster.cst, bocompanymaster.salestax, bocompanymaster.servicetax, bocompanymaster.tin, bocompanymaster.localtax, bocompanymaster.accountstartdate, bocompanymaster.numberofusers, bocompanymaster.starttime, bocompanymaster.endtime, bocompanymaster.weekoff1, bocompanymaster.weekoff1desc, bocompanymaster.weekoff2, bocompanymaster.weekoff2desc, bocompanymaster.facebookaccountname, bocompanymaster.facebookaccounturl, bocompanymaster.twitteraccountname, bocompanymaster.twitteraccounturl, bocompanymaster.linkedinaccountname, bocompanymaster.linkedinaccounturl, bocompanymaster.instagramaccountname, bocompanymaster.instagramaccounturl, bocompanymaster.brandname, bocompanymaster.mailingemailaddress, bocompanymaster.mailingsendername, bocompanymaster.localization, bocompanymaster.localizationdesc, bocompanymaster.timezone, bocompanymaster.timezonedesc, bocompanymaster.customfield, bocompanymaster.attachment, bocompanymaster.status, "", ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bocompanymaster => bocompanymaster.companyname.includes(filter.name))

          return response;
        })
      );
  }


  getList_companytype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_companytype/').toPromise();
  }

  getList_countryid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_countryid').toPromise();
  }

  getList_stateid(countryid): any {
    // return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_stateid/countryid').toPromise();
    return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_stateid/' + countryid).toPromise();
  }

  getList_cityid(stateid): any {
    // return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_cityid/stateid').toPromise();
    return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_cityid/' + stateid).toPromise();
  }

  getList_locationid(cityid): any {
    // return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_locationid/cityid').toPromise();
    return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_locationid/' + cityid).toPromise();
  }

  getList_designation(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_designation').toPromise();
  }

  getList_businesssegment(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_businesssegment/').toPromise();
  }

  getList_shippingcountryid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_shippingcountryid').toPromise();
  }

  getList_shippingstateid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_shippingstateid').toPromise();
  }

  getList_shippingcityid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_shippingcityid').toPromise();
  }

  getList_basecurrency(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_basecurrency/').toPromise();
  }

  getList_gstregistrationtype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_gstregistrationtype/').toPromise();
  }

  getList_weekoff1(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_weekoff1/').toPromise();
  }

  getList_weekoff2(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_weekoff2/').toPromise();
  }

  getList_localization(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_localization/').toPromise();
  }

  getList_timezone(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_timezone/').toPromise();
  }


}

