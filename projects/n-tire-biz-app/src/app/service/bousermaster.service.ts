import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bousermaster } from '../model/bousermaster.model';
import { bousermenuaccess } from '../model/bousermenuaccess.model';
import { bouserbranchaccess } from '../model/bouserbranchaccess.model';
import { environment } from '../../environments/environment';
import { IbousermasterResponse } from '../model/bousermaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bousermasterService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdate_bousermasters(formData, bousermenuaccesses, Insertbousermenuaccesses, bouserbranchaccesses, Insertbouserbranchaccesses,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        bousermenuaccesses: Insertbousermenuaccesses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
        bouserbranchaccesses: Insertbouserbranchaccesses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/bousermaster', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousermaster' + '/getdefaultdata').toPromise();
    }
  }
  get_bousermasters_List(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousermaster').toPromise();
    }
  }
  getListBy_userid(userid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousermaster' + '/userid/' + userid).toPromise();
    }
  }

  getListBy_sourcereference(sourcereference: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousermaster' + '/sourcereference/' + sourcereference).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousermaster' + '/param/' + key).toPromise();
    }
  }


  get_bousermasters_ByEID(id: any): any {
    localStorage.setItem('pkcol',id);
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousermaster' + '/e/' + id).toPromise();
    }
  }
  get_bousermasters_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/bousermaster' + '/' + id).toPromise();
    }
  }

  delete_bousermaster(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/bousermaster' + '/' + id).toPromise();
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IbousermasterResponse> {
    return this.http.get<IbousermasterResponse>(AppConstants.ntirebizURL + '/bousermaster')
      .pipe(
        tap((response: IbousermasterResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(bousermaster => new bousermaster(bousermaster.userid, bousermaster.sourcefield, bousermaster.sourcereference, bousermaster.userroleid, bousermaster.userroleiddesc, bousermaster.branchid, bousermaster.branchiddesc, bousermaster.departmentid, bousermaster.departmentiddesc, bousermaster.usercode, bousermaster.username, bousermaster.shortname, bousermaster.bio, bousermaster.avatar, bousermaster.designation, bousermaster.designationdesc, bousermaster.reportingto, bousermaster.reportingtodesc, bousermaster.role, bousermaster.roledesc, bousermaster.emailid, bousermaster.mobilenumber, bousermaster.password, bousermaster.nextloginchangepassword, bousermaster.validityfrom, bousermaster.validityto, bousermaster.educationid, bousermaster.educationiddesc, bousermaster.usersignature, bousermaster.userphoto, bousermaster.thumbnail, bousermaster.emailpassword, bousermaster.emailsignature, bousermaster.dateofbirth, bousermaster.defaultpage, bousermaster.defaultlanguage, bousermaster.defaultlanguagedesc, bousermaster.layoutpage, bousermaster.theme, bousermaster.gender, bousermaster.genderdesc, bousermaster.nationality, bousermaster.nationalitydesc, bousermaster.bloodgroup, bousermaster.bloodgroupdesc, bousermaster.religion, bousermaster.religiondesc, bousermaster.maritalstatus, bousermaster.maritalstatusdesc, bousermaster.referencenumber, bousermaster.address1, bousermaster.address2, bousermaster.countryid, bousermaster.countryiddesc, bousermaster.stateid, bousermaster.stateiddesc, bousermaster.cityid, bousermaster.cityiddesc, bousermaster.zipcode, bousermaster.emergencycontactperson, bousermaster.relationship, bousermaster.cpphonenumber, bousermaster.emailnotifications, bousermaster.whatsappnotifications, bousermaster.employeespecificapproval, bousermaster.autoapproval, bousermaster.approvallevel, bousermaster.approvalleveldesc, bousermaster.approvallevel1, bousermaster.approvallevel1desc, bousermaster.approvallevel2, bousermaster.approvallevel2desc, bousermaster.approvallevel3, bousermaster.approvallevel3desc, bousermaster.approvallevel4, bousermaster.approvallevel4desc, bousermaster.approvallevel5, bousermaster.approvallevel5desc, bousermaster.approvalleveltype1, bousermaster.approvalleveltype1desc, bousermaster.approvalleveltype2, bousermaster.approvalleveltype2desc, bousermaster.approvalleveltype3, bousermaster.approvalleveltype3desc, bousermaster.approvalleveltype4, bousermaster.approvalleveltype4desc, bousermaster.approvalleveltype5, bousermaster.approvalleveltype5desc, bousermaster.twitter, bousermaster.facebook, bousermaster.linkedin, bousermaster.skype, bousermaster.googleplus, bousermaster.customfield, bousermaster.attachment, bousermaster.status, bousermaster.employeeid, "", ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(bousermaster => bousermaster.username.includes(filter.name))

          return response;
        })
      );
  }


  getList_userroleid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_userroleid').toPromise();
  }

  getList_branchid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_branchid').toPromise();
  }

  getList_departmentid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_departmentid/').toPromise();
  }

  getList_designation(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_designation/').toPromise();
  }

  getList_reportingto(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_reportingto').toPromise();
  }

  getList_role(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_role').toPromise();
  }

  getList_educationid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_educationid/').toPromise();
  }

  getList_defaultlanguage(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_defaultlanguage/').toPromise();
  }

  getList_gender(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_gender/').toPromise();
  }

  getList_nationality(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_nationality/').toPromise();
  }

  getList_bloodgroup(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_bloodgroup/').toPromise();
  }

  getList_religion(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_religion/').toPromise();
  }

  getList_maritalstatus(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_maritalstatus/').toPromise();
  }

  getList_countryid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_countryid').toPromise();
  }

  getList_stateid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_stateid').toPromise();
  }

  getList_cityid(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_cityid').toPromise();
  }

  getList_approvallevel(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_approvallevel').toPromise();
  }

  getList_approvallevel1(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_approvallevel1').toPromise();
  }

  getList_approvallevel2(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_approvallevel2').toPromise();
  }

  getList_approvallevel3(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_approvallevel3').toPromise();
  }

  getList_approvallevel4(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_approvallevel4').toPromise();
  }

  getList_approvallevel5(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_approvallevel5').toPromise();
  }

  getList_approvalleveltype1(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_approvalleveltype1/').toPromise();
  }

  getList_approvalleveltype2(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_approvalleveltype2/').toPromise();
  }

  getList_approvalleveltype3(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_approvalleveltype3/').toPromise();
  }

  getList_approvalleveltype4(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_approvalleveltype4/').toPromise();
  }

  getList_approvalleveltype5(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/bousermaster' + '/getList_approvalleveltype5/').toPromise();
  }

  login(email: string, pwd: string,remem:boolean) {

    var body = {
      email: email,
      Password: pwd,
      rememberMe:remem
    };
    debugger;
    return this.http.get(this.rootURL + "/Token?email=" + email + "&Password=" + pwd).toPromise();
  }

}

