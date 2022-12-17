import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstapplicantskilldetail } from '../model/mstapplicantskilldetail.model';
import { environment } from '../../environments/environment';
import { ImstapplicantskilldetailResponse } from '../model/mstapplicantskilldetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { id } from 'date-fns/locale';
@Injectable({
  providedIn: 'root'
})
export class mstapplicantskilldetailService {
  getskilldata(e: any) {
    throw new Error('Method not implemented.');
  }
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_mstapplicantskilldetails(formData): any {
    debugger
    if (this.valid()) {
      var body = {
        ...formData,
      };
      return this.http.post(AppConstants.ntirebizURL + '/mstapplicantskilldetail', body);
    }
  }



  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantskilldetail' + '/getdefaultdata').toPromise();
    }
  }
  get_mstapplicantskilldetails_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantskilldetail').toPromise();
    }
  }
  getListBy_skillid(skillid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantskilldetail' + '/skillid/' + skillid).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantskilldetail' + '/param/' + key).toPromise();
    }
  }


  get_mstapplicantskilldetails_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantskilldetail' + '/e/' + id).toPromise();
    }
  }
  get_mstapplicantskilldetails_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantskilldetail' + '/' + id).toPromise();
    }
  }
  get_mstapplicantskilldetails_ByApplicantID(id: number): any {
    // let appid=localStorage.getItem('applicantid');
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/mstapplicantskilldetail' + '/applicantid/' + id).toPromise();
    }
  }
  delete_mstapplicantskilldetail(id: number): any {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    }
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/mstapplicantskilldetail' + '/' + id, options).toPromise();
    }
  }

  getList_applicantid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantskilldetail' + '/getList_applicantid').toPromise();
  }

  getList_skillcategory(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantskilldetail' + '/getList_skillcategory/').toPromise();
  }

  getList_subcategoryid(categoryid): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantskilldetail' + '/getList_subcategoryid/' + categoryid).toPromise();
  }

  getList_referenceacceptance(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/mstapplicantskilldetail' + '/getList_referenceacceptance/').toPromise();
  }

// new
  getList_segmentcategory(): any {
    return this.http.get(AppConstants.ntirebizURL + '/mstsegment').toPromise();
  }

  getList_skillcategory2(id:any): any {

    debugger
    return this.http.get(AppConstants.ntirebizURL + '/mstcategory' + '/segmentid/' + id).toPromise();

   }

  getList_subcategoryid2(categoryid): any {
    debugger
    return this.http.get(AppConstants.ntirebizURL + '/mstsubcategory' + '/categoryid/' + categoryid).toPromise();
  }


}

