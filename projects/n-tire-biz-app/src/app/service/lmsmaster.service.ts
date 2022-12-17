import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsmaster } from '../model/lmsmaster.model';
import { lmsopportunity } from '../model/lmsopportunity.model';
import { lmscall } from '../model/lmscall.model';
import { lmscorporatesecondarycontact } from '../model/lmscorporatesecondarycontact.model';
import { environment } from '../../environments/environment';
import { IlmsmasterResponse } from '../model/lmsmaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsmasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_lmsmasters(formData, lmsopportunities, lmscalls, lmscorporatesecondarycontacts,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        lmsopportunities: lmsopportunities.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        lmscalls: lmscalls.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        lmscorporatesecondarycontacts: lmscorporatesecondarycontacts.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/lmsmaster', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsmaster' + '/getdefaultdata').toPromise();
    }
  }
  get_lmsmasters_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsmaster').toPromise();
    }
  }
  getListBy_leadid(leadid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsmaster' + '/leadid/' + leadid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsmaster' + '/param/' + key).toPromise();
    }
  }


  get_lmsmasters_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsmaster' + '/e/' + id).toPromise();
    }
  }
  get_lmsmasters_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/lmsmaster' + '/' + id).toPromise();
    }
  }

  delete_lmsmaster(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/lmsmaster' + '/' + id).toPromise();
    }
  }

  getList_branchid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_branchid').toPromise();
  }

  getList_branchlocationid(branchid): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_branchlocationid/branchid').toPromise();
  }

  getList_iscorporate(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_iscorporate/').toPromise();
  }

  getList_leadowner(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_leadowner').toPromise();
  }

  getList_companytypeid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_companytypeid/').toPromise();
  }

  getList_categoryid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_categoryid/').toPromise();
  }

  getList_subcategoryid(categoryid): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_subcategoryid/categoryid').toPromise();
  }

  getList_groupname(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_groupname/').toPromise();
  }

  getList_salutation(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_salutation/').toPromise();
  }

  getList_designation(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_designation').toPromise();
  }

  getList_leadtype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_leadtype/').toPromise();
  }

  getList_leadsource(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_leadsource/').toPromise();
  }

  getList_campaignid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_campaignid').toPromise();
  }

  getList_segment(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_segment/').toPromise();
  }

  getList_businessvertical(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_businessvertical/').toPromise();
  }

  getList_revenue(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_revenue/').toPromise();
  }

  getList_employees(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_employees/').toPromise();
  }

  getList_language(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_language/').toPromise();
  }

  getList_paymentterms(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_paymentterms/').toPromise();
  }

  getList_leadstatus(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_leadstatus/').toPromise();
  }


}

