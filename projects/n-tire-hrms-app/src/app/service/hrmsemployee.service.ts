import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployee } from '../model/hrmsemployee.model';
import { hrmspaschedule } from '../model/hrmspaschedule.model';
import { hrmsdependantdetail } from '../model/hrmsdependantdetail.model';
import { hrmsemployeeeosdetail } from '../model/hrmsemployeeeosdetail.model';
import { hrmsemployeegeneralwaiver } from '../model/hrmsemployeegeneralwaiver.model';
import { hrmsemployeeinsurance } from '../model/hrmsemployeeinsurance.model';
import { hrmsemployeereporting } from '../model/hrmsemployeereporting.model';
import { hrmsemployeesalarymaster } from '../model/hrmsemployeesalarymaster.model';
import { hrmsemployeesalarymastershistory } from '../model/hrmsemployeesalarymastershistory.model';
import { hrmsemployeesectionwaiver } from '../model/hrmsemployeesectionwaiver.model';
import { hrmsemployeestatutorybenefit } from '../model/hrmsemployeestatutorybenefit.model';
import { hrmsemployeetaxcalculation } from '../model/hrmsemployeetaxcalculation.model';
import { hrmsemployeetaxdeclaration } from '../model/hrmsemployeetaxdeclaration.model';
import { hrmssubordinatedetail } from '../model/hrmssubordinatedetail.model';
import { hrmsemployeechecklist } from '../model/hrmsemployeechecklist.model';
import { hrmsemployeetransfer } from '../model/hrmsemployeetransfer.model';
import { hrmsemployeeasset } from '../model/hrmsemployeeasset.model';
import { hrmsemployeecareer } from '../model/hrmsemployeecareer.model';
import { hrmsemployeeeducation } from '../model/hrmsemployeeeducation.model';
import { hrmsemployeeinfrarequestmaster } from '../model/hrmsemployeeinfrarequestmaster.model';
import { hrmsemployerchecklist } from '../model/hrmsemployerchecklist.model';
import { hrmsemployeemonthlysalarymaster } from '../model/hrmsemployeemonthlysalarymaster.model';
import { hrmsemployeekra } from '../model/hrmsemployeekra.model';
import { hrmsemployeelanguageskill } from '../model/hrmsemployeelanguageskill.model';
import { hrmsemployeelettermanagement } from '../model/hrmsemployeelettermanagement.model';
import { hrmsemployeemembershipdetail } from '../model/hrmsemployeemembershipdetail.model';
import { hrmsemployeememo } from '../model/hrmsemployeememo.model';
import { hrmsemployeepresentation } from '../model/hrmsemployeepresentation.model';
import { hrmsemployeereward } from '../model/hrmsemployeereward.model';
import { hrmsemployeeskill } from '../model/hrmsemployeeskill.model';
import { hrmsemployeestationaryrequest } from '../model/hrmsemployeestationaryrequest.model';
import { hrmsemployeetraveldocument } from '../model/hrmsemployeetraveldocument.model';
import { hrmsemployeedocument } from '../model/hrmsemployeedocument.model';
import { hrmsemployeemonthlyattendance } from '../model/hrmsemployeemonthlyattendance.model';
import { hrmsemployeedependent } from '../model/hrmsemployeedependent.model';
import { hrmsemployeenominee } from '../model/hrmsemployeenominee.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeeResponse } from '../model/hrmsemployee.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeeService {
  formData: hrmsemployee;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployee[];
  hrmspaschedules: hrmspaschedule[]=[];
  hrmsdependantdetails: hrmsdependantdetail[]=[];
  hrmsemployeeeosdetails: hrmsemployeeeosdetail[]=[];
  hrmsemployeegeneralwaivers: hrmsemployeegeneralwaiver[]=[];
  hrmsemployeeinsurances: hrmsemployeeinsurance[]=[];
  hrmsemployeereportings: hrmsemployeereporting[]=[];
  hrmsemployeesalarymasters: hrmsemployeesalarymaster[]=[];
  hrmsemployeesalarymastershistories: hrmsemployeesalarymastershistory[]=[];
  hrmsemployeesectionwaivers: hrmsemployeesectionwaiver[]=[];
  hrmsemployeestatutorybenefits: hrmsemployeestatutorybenefit[]=[];
  hrmsemployeetaxcalculations: hrmsemployeetaxcalculation[]=[];
  hrmsemployeetaxdeclarations: hrmsemployeetaxdeclaration[]=[];
  hrmssubordinatedetails: hrmssubordinatedetail[]=[];
  hrmsemployeechecklists: hrmsemployeechecklist[]=[];
  hrmsemployeetransfers: hrmsemployeetransfer[]=[];
  hrmsemployeeassets: hrmsemployeeasset[]=[];
  hrmsemployeecareers: hrmsemployeecareer[]=[];
  hrmsemployeeeducations: hrmsemployeeeducation[]=[];
  hrmsemployeeinfrarequestmasters: hrmsemployeeinfrarequestmaster[]=[];
  hrmsemployerchecklists: hrmsemployerchecklist[]=[];
  hrmsemployeemonthlysalarymasters: hrmsemployeemonthlysalarymaster[]=[];
  hrmsemployeekras: hrmsemployeekra[]=[];
  hrmsemployeelanguageskills: hrmsemployeelanguageskill[]=[];
  hrmsemployeelettermanagements: hrmsemployeelettermanagement[]=[];
  hrmsemployeemembershipdetails: hrmsemployeemembershipdetail[]=[];
  hrmsemployeememos: hrmsemployeememo[]=[];
  hrmsemployeepresentations: hrmsemployeepresentation[]=[];
  hrmsemployeerewards: hrmsemployeereward[]=[];
  hrmsemployeeskills: hrmsemployeeskill[]=[];
  hrmsemployeestationaryrequests: hrmsemployeestationaryrequest[]=[];
  hrmsemployeetraveldocuments: hrmsemployeetraveldocument[]=[];
  hrmsemployeedocuments: hrmsemployeedocument[]=[];
  hrmsemployeemonthlyattendances: hrmsemployeemonthlyattendance[]=[];
  hrmsemployeedependents: hrmsemployeedependent[]=[];
  hrmsemployeenominees: hrmsemployeenominee[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployees():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hrmspaschedules: this.hrmspaschedules.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsdependantdetails: this.hrmsdependantdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeeeosdetails: this.hrmsemployeeeosdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeegeneralwaivers: this.hrmsemployeegeneralwaivers.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeeinsurances: this.hrmsemployeeinsurances.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeereportings: this.hrmsemployeereportings.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeesalarymasters: this.hrmsemployeesalarymasters.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeesalarymastershistories: this.hrmsemployeesalarymastershistories.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeesectionwaivers: this.hrmsemployeesectionwaivers.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeestatutorybenefits: this.hrmsemployeestatutorybenefits.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeetaxcalculations: this.hrmsemployeetaxcalculations.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeetaxdeclarations: this.hrmsemployeetaxdeclarations.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmssubordinatedetails: this.hrmssubordinatedetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeechecklists: this.hrmsemployeechecklists.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeetransfers: this.hrmsemployeetransfers.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeeassets: this.hrmsemployeeassets.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeecareers: this.hrmsemployeecareers.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeeeducations: this.hrmsemployeeeducations.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeeinfrarequestmasters: this.hrmsemployeeinfrarequestmasters.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployerchecklists: this.hrmsemployerchecklists.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeemonthlysalarymasters: this.hrmsemployeemonthlysalarymasters.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeekras: this.hrmsemployeekras.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeelanguageskills: this.hrmsemployeelanguageskills.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeelettermanagements: this.hrmsemployeelettermanagements.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeemembershipdetails: this.hrmsemployeemembershipdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeememos: this.hrmsemployeememos.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeepresentations: this.hrmsemployeepresentations.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeerewards: this.hrmsemployeerewards.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeeskills: this.hrmsemployeeskills.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeestationaryrequests: this.hrmsemployeestationaryrequests.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeetraveldocuments: this.hrmsemployeetraveldocuments.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeedocuments: this.hrmsemployeedocuments.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeemonthlyattendances: this.hrmsemployeemonthlyattendances.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeedependents: this.hrmsemployeedependents.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeenominees: this.hrmsemployeenominees.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployee', body);
  }
  }

  saveOrUpdatehrmsemployeesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployee', body);
  }
  }

  gethrmsemployeesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployee').toPromise();
  }
  }
  getListByemployeeid(employeeid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployee'+'/employeeid/'+employeeid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployee'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployee'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployee'+'/'+id).toPromise();
  }
  }

  deletehrmsemployee(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployee'+'/'+id).toPromise();
  }
  }
clearList(){
this.hrmspaschedules = [];
this.hrmsdependantdetails = [];
this.hrmsemployeeeosdetails = [];
this.hrmsemployeegeneralwaivers = [];
this.hrmsemployeeinsurances = [];
this.hrmsemployeereportings = [];
this.hrmsemployeesalarymasters = [];
this.hrmsemployeesalarymastershistories = [];
this.hrmsemployeesectionwaivers = [];
this.hrmsemployeestatutorybenefits = [];
this.hrmsemployeetaxcalculations = [];
this.hrmsemployeetaxdeclarations = [];
this.hrmssubordinatedetails = [];
this.hrmsemployeechecklists = [];
this.hrmsemployeetransfers = [];
this.hrmsemployeeassets = [];
this.hrmsemployeecareers = [];
this.hrmsemployeeeducations = [];
this.hrmsemployeeinfrarequestmasters = [];
this.hrmsemployerchecklists = [];
this.hrmsemployeemonthlysalarymasters = [];
this.hrmsemployeekras = [];
this.hrmsemployeelanguageskills = [];
this.hrmsemployeelettermanagements = [];
this.hrmsemployeemembershipdetails = [];
this.hrmsemployeememos = [];
this.hrmsemployeepresentations = [];
this.hrmsemployeerewards = [];
this.hrmsemployeeskills = [];
this.hrmsemployeestationaryrequests = [];
this.hrmsemployeetraveldocuments = [];
this.hrmsemployeedocuments = [];
this.hrmsemployeemonthlyattendances = [];
this.hrmsemployeedependents = [];
this.hrmsemployeenominees = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployee')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IhrmsemployeeResponse> {
return this.http.get<IhrmsemployeeResponse>(AppConstants.ntirehrmsURL+'/hrmsemployee')
.pipe(
tap((response: IhrmsemployeeResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(hrmsemployee => new hrmsemployee(hrmsemployee.branchid,hrmsemployee.branchiddesc,hrmsemployee.employeeid,hrmsemployee.applicantref,hrmsemployee.code,hrmsemployee.employeename,hrmsemployee.nickname,hrmsemployee.departmentid,hrmsemployee.departmentiddesc,hrmsemployee.designationid,hrmsemployee.designationiddesc,hrmsemployee.roleid,hrmsemployee.roleiddesc,hrmsemployee.dateofjoin,hrmsemployee.appointedby,hrmsemployee.jobnature,hrmsemployee.shiftid,hrmsemployee.shiftiddesc,hrmsemployee.grade,hrmsemployee.gradedesc,hrmsemployee.mobile,hrmsemployee.personalemail,hrmsemployee.residencephone,hrmsemployee.spousename,hrmsemployee.fathername,hrmsemployee.mothername,hrmsemployee.dob,hrmsemployee.age,hrmsemployee.countryofbirth,hrmsemployee.countryofbirthdesc,hrmsemployee.filenumber,hrmsemployee.validfrom,hrmsemployee.validto,hrmsemployee.glcode,hrmsemployee.photo,hrmsemployee.thumbnail,hrmsemployee.signature,hrmsemployee.gender,hrmsemployee.genderdesc,hrmsemployee.qualification1,hrmsemployee.qualification1desc,hrmsemployee.qualification2,hrmsemployee.qualification2desc,hrmsemployee.qualification3,hrmsemployee.qualification3desc,hrmsemployee.recruitmentmode,hrmsemployee.recruitmentmodedesc,hrmsemployee.currentlocationtype,hrmsemployee.currentaddress,hrmsemployee.permanentaddress,hrmsemployee.nationality,hrmsemployee.nationalitydesc,hrmsemployee.religion,hrmsemployee.religiondesc,hrmsemployee.maritalstatus,hrmsemployee.maritalstatusdesc,hrmsemployee.bloodgroup,hrmsemployee.bloodgroupdesc,hrmsemployee.nationalid,hrmsemployee.taxnumber,hrmsemployee.passportnumber,hrmsemployee.placeofissue,hrmsemployee.issuingcountry,hrmsemployee.issuingcountrydesc,hrmsemployee.issuingdate,hrmsemployee.expirydate,hrmsemployee.drivinglicensenumber,hrmsemployee.drivinglicenseexpiration,hrmsemployee.employmenttype,hrmsemployee.employmenttypedesc,hrmsemployee.probationmonths,hrmsemployee.confirmationdate,hrmsemployee.firstappraisalstartson,hrmsemployee.appraisalcyclemonths,hrmsemployee.category,hrmsemployee.categorydesc,hrmsemployee.noticeperiod,hrmsemployee.anyillness,hrmsemployee.emergencycontactname,hrmsemployee.relationship,hrmsemployee.relationshipdesc,hrmsemployee.contactmobile,hrmsemployee.email,hrmsemployee.leaveencashmenteligibility,hrmsemployee.hraeligibility,hrmsemployee.attendanceenabled,hrmsemployee.otenabled,hrmsemployee.companyaccommodation,hrmsemployee.freeticket,hrmsemployee.salarymode,hrmsemployee.salarymodedesc,hrmsemployee.bankname,hrmsemployee.accountnumber,hrmsemployee.branchname,hrmsemployee.address,hrmsemployee.bankcode,hrmsemployee.transportmode,hrmsemployee.transportmodedesc,hrmsemployee.transportpickuppoint,hrmsemployee.heightcms,hrmsemployee.weightkgs,hrmsemployee.identificationmark,hrmsemployee.disabilitycategory,hrmsemployee.disabilitycategorydesc,hrmsemployee.disabilitydegree,hrmsemployee.disabilitydegreedesc,hrmsemployee.disabilityinfo,hrmsemployee.medicalassessmentdate,hrmsemployee.notes,hrmsemployee.badgeno,hrmsemployee.cardno,hrmsemployee.reference1,hrmsemployee.reference2,hrmsemployee.familybenefitsallowed,hrmsemployee.accomodation,hrmsemployee.medicalinsurance,hrmsemployee.lifeinsurance,hrmsemployee.airticket,hrmsemployee.airsector,hrmsemployee.airticketcount,hrmsemployee.airticketyears,hrmsemployee.annualleaveininitialyr,hrmsemployee.initialyearscount,hrmsemployee.annualleaveafterinitialyr,hrmsemployee.pfnumber,hrmsemployee.esic,hrmsemployee.esicnumber,hrmsemployee.pancard,hrmsemployee.remarks,hrmsemployee.customfield,hrmsemployee.attachment,hrmsemployee.employeestatus,hrmsemployee.employeestatusremarks,hrmsemployee.status,hrmsemployee.salarytype,hrmsemployee.basic,hrmsemployee.userid,hrmsemployee.useriddesc,hrmsemployee.pan,hrmsemployee.castecategory,hrmsemployee.subcastecategory,hrmsemployee.differentlyabled,hrmsemployee.salarydrawnfrom,"","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(hrmsemployee => hrmsemployee.employeename.includes(filter.name))

return response;
})
);
}



}

