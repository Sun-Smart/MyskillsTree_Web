import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hmspatient } from '../model/hmspatient.model';
import { hmsinsurance } from '../model/hmsinsurance.model';
import { hmsoperation } from '../model/hmsoperation.model';
import { hmslabresult } from '../model/hmslabresult.model';
import { hmspatientdischarge } from '../model/hmspatientdischarge.model';
import { hmspatientfollowup } from '../model/hmspatientfollowup.model';
import { hmspatientpaymentmaster } from '../model/hmspatientpaymentmaster.model';
import { hmsreceipt } from '../model/hmsreceipt.model';
import { hmstreatment } from '../model/hmstreatment.model';
import { hmspatientvisit } from '../model/hmspatientvisit.model';
import { hmsadmission } from '../model/hmsadmission.model';
import { hmspatientvaccination } from '../model/hmspatientvaccination.model';
import { hmsappointment } from '../model/hmsappointment.model';
import { hmsconsent } from '../model/hmsconsent.model';
import { environment } from '../../environments/environment';
import { IhmspatientResponse } from '../model/hmspatient.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hmspatientService {
  formData: hmspatient;
  readonly rootURL = AppConstants.baseURL;
  hmsinsurances: hmsinsurance[] = [];
  hmsoperations: hmsoperation[] = [];
  hmslabresults: hmslabresult[] = [];
  hmspatientdischarges: hmspatientdischarge[] = [];
  hmspatientfollowups: hmspatientfollowup[] = [];
  hmspatientpaymentmasters: hmspatientpaymentmaster[] = [];
  hmsreceipts: hmsreceipt[] = [];
  hmstreatments: hmstreatment[] = [];
  hmspatientvisits: hmspatientvisit[] = [];
  hmsadmissions: hmsadmission[] = [];
  hmspatientvaccinations: hmspatientvaccination[] = [];
  hmsappointments: hmsappointment[] = [];
  hmsconsents: hmsconsent[] = [];
  list: hmspatient[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehmspatients() {
    {
      var body = {
        ...this.formData,
        hmsinsurances: this.hmsinsurances.filter(function (el) { return Object.keys(el).length != 0; }),
        hmsoperations: this.hmsoperations.filter(function (el) { return Object.keys(el).length != 0; }),
        hmslabresults: this.hmslabresults.filter(function (el) { return Object.keys(el).length != 0; }),
        hmspatientdischarges: this.hmspatientdischarges.filter(function (el) { return Object.keys(el).length != 0; }),
        hmspatientfollowups: this.hmspatientfollowups.filter(function (el) { return Object.keys(el).length != 0; }),
        hmspatientpaymentmasters: this.hmspatientpaymentmasters.filter(function (el) { return Object.keys(el).length != 0; }),
        hmsreceipts: this.hmsreceipts.filter(function (el) { return Object.keys(el).length != 0; }),
        hmstreatments: this.hmstreatments.filter(function (el) { return Object.keys(el).length != 0; }),
        hmspatientvisits: this.hmspatientvisits.filter(function (el) { return Object.keys(el).length != 0; }),
        hmsadmissions: this.hmsadmissions.filter(function (el) { return Object.keys(el).length != 0; }),
        hmspatientvaccinations: this.hmspatientvaccinations.filter(function (el) { return Object.keys(el).length != 0; }),
        hmsappointments: this.hmsappointments.filter(function (el) { return Object.keys(el).length != 0; }),
        hmsconsents: this.hmsconsents.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmspatient', body);
    }
  }

  saveOrUpdatehmspatientsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehospitalURL + '/hmspatient', body);
    }
  }

  gethmspatientsList() {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspatient').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspatient' + '/param/' + key).toPromise();
    }
  }

  gethmspatientsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehospitalURL + '/hmspatient' + '/' + id).toPromise();
    }
  }

  deletehmspatient(id: number) {
    {
      return this.http.delete(AppConstants.ntirehospitalURL + '/hmspatient' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.hmsinsurances = [];
    this.hmsoperations = [];
    this.hmslabresults = [];
    this.hmspatientdischarges = [];
    this.hmspatientfollowups = [];
    this.hmspatientpaymentmasters = [];
    this.hmsreceipts = [];
    this.hmstreatments = [];
    this.hmspatientvisits = [];
    this.hmsadmissions = [];
    this.hmspatientvaccinations = [];
    this.hmsappointments = [];
    this.hmsconsents = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirehospitalURL + '/hmspatient')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }
  search(filter: { name: string } = { name: '' }, page = 1): Observable<IhmspatientResponse> {
    return this.http.get<IhmspatientResponse>(AppConstants.ntirehospitalURL + '/hmspatient')
      .pipe(
        tap((response: IhmspatientResponse) => {
          console.log(response);
          //debugger;
          var response1;
          response1 = response;
          response.results = response1.map(hmspatient => new hmspatient(hmspatient.patientid, hmspatient.patientcode, hmspatient.aadhaarno, hmspatient.firstname, hmspatient.middlename, hmspatient.lastname, hmspatient.imageurl, hmspatient.gender, hmspatient.genderdesc, hmspatient.dateofbirth, hmspatient.referredby, hmspatient.address1, hmspatient.address2, hmspatient.countryid, hmspatient.countryiddesc, hmspatient.stateid, hmspatient.stateiddesc, hmspatient.cityid, hmspatient.cityiddesc, hmspatient.location, hmspatient.pincode, hmspatient.mobile, hmspatient.contactnoh, hmspatient.contactnoo, hmspatient.email, hmspatient.height, hmspatient.weight, hmspatient.bloodgroup, hmspatient.bloodgroupdesc, hmspatient.occupation, hmspatient.occupationdesc, hmspatient.maritialstatus, hmspatient.maritialstatusdesc, hmspatient.allergydetails, hmspatient.notes, hmspatient.contactperson, hmspatient.cpaddress1, hmspatient.cpaddress2, hmspatient.cpcountryid, hmspatient.cpcountryiddesc, hmspatient.cpstateid, hmspatient.cpstateiddesc, hmspatient.cpcityid, hmspatient.cpcityiddesc, hmspatient.cplocation, hmspatient.cppincode, hmspatient.cpmobile, hmspatient.cpcontactnoh, hmspatient.cpcontactnoo, hmspatient.cpemail, hmspatient.customfield, hmspatient.attachment, hmspatient.status, "", "", "", "", "", "", "", "", "", "", "", "", ""))
            // Not filtering in the server since in-memory-web-api has somewhat restricted api
            .filter(hmspatient => hmspatient.lastname.includes(filter.name))

          return response;
        })
      );
  }



}

