import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsapplicantmaster } from '../model/hrmsapplicantmaster.model';
import { hrmsinterviewschedule } from '../model/hrmsinterviewschedule.model';
import { hrmsapplicantoffer } from '../model/hrmsapplicantoffer.model';
import { hrmsapplicantcareer } from '../model/hrmsapplicantcareer.model';
import { hrmsapplicanteducation } from '../model/hrmsapplicanteducation.model';
import { hrmsapplicantskill } from '../model/hrmsapplicantskill.model';
import { hrmsmprapplicant } from '../model/hrmsmprapplicant.model';
import { environment } from '../../environments/environment';
import { IhrmsapplicantmasterResponse } from '../model/hrmsapplicantmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsapplicantmasterService {
  formData: hrmsapplicantmaster;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsapplicantmaster[];
  hrmsinterviewschedules: hrmsinterviewschedule[]=[];
  hrmsapplicantoffers: hrmsapplicantoffer[]=[];
  hrmsapplicantcareers: hrmsapplicantcareer[]=[];
  hrmsapplicanteducations: hrmsapplicanteducation[]=[];
  hrmsapplicantskills: hrmsapplicantskill[]=[];
  hrmsmprapplicants: hrmsmprapplicant[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsapplicantmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hrmsinterviewschedules: this.hrmsinterviewschedules.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsapplicantoffers: this.hrmsapplicantoffers.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsapplicantcareers: this.hrmsapplicantcareers.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsapplicanteducations: this.hrmsapplicanteducations.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsapplicantskills: this.hrmsapplicantskills.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsmprapplicants: this.hrmsmprapplicants.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsapplicantmaster', body);
  }
  }

  saveOrUpdatehrmsapplicantmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsapplicantmaster', body);
  }
  }

  gethrmsapplicantmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantmaster').toPromise();
  }
  }
  getListByapplicantid(applicantid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantmaster'+'/applicantid/'+applicantid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantmaster'+'/param/'+key).toPromise();
  }
  }


  gethrmsapplicantmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantmaster'+'/e/'+id).toPromise();
  }
  }
  gethrmsapplicantmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantmaster'+'/'+id).toPromise();
  }
  }

  deletehrmsapplicantmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsapplicantmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.hrmsinterviewschedules = [];
this.hrmsapplicantoffers = [];
this.hrmsapplicantcareers = [];
this.hrmsapplicanteducations = [];
this.hrmsapplicantskills = [];
this.hrmsmprapplicants = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IhrmsapplicantmasterResponse> {
return this.http.get<IhrmsapplicantmasterResponse>(AppConstants.ntirehrmsURL+'/hrmsapplicantmaster')
.pipe(
tap((response: IhrmsapplicantmasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(hrmsapplicantmaster => new hrmsapplicantmaster(hrmsapplicantmaster.applicantid,hrmsapplicantmaster.applicantiddesc,hrmsapplicantmaster.applicationdate,hrmsapplicantmaster.applicantcode,hrmsapplicantmaster.applicantname,hrmsapplicantmaster.title,hrmsapplicantmaster.jobrole,hrmsapplicantmaster.jobroledesc,hrmsapplicantmaster.department,hrmsapplicantmaster.departmentdesc,hrmsapplicantmaster.mobile,hrmsapplicantmaster.email,hrmsapplicantmaster.otherphone,hrmsapplicantmaster.dob,hrmsapplicantmaster.gender,hrmsapplicantmaster.genderdesc,hrmsapplicantmaster.maritalstatus,hrmsapplicantmaster.maritalstatusdesc,hrmsapplicantmaster.source,hrmsapplicantmaster.sourcedesc,hrmsapplicantmaster.sourcereferences,hrmsapplicantmaster.highestqualification,hrmsapplicantmaster.highestqualificationdesc,hrmsapplicantmaster.suitableposition,hrmsapplicantmaster.suitablepositiondesc,hrmsapplicantmaster.relatedexperience,hrmsapplicantmaster.totalexperience,hrmsapplicantmaster.internationalexperience,hrmsapplicantmaster.currentsalarycurrency,hrmsapplicantmaster.currentsalarycurrencydesc,hrmsapplicantmaster.currentsalary,hrmsapplicantmaster.expectedsalarycurrency,hrmsapplicantmaster.expectedsalarycurrencydesc,hrmsapplicantmaster.expectedfromsalary,hrmsapplicantmaster.expectedtosalary,hrmsapplicantmaster.noticeperiod,hrmsapplicantmaster.passportnumber,hrmsapplicantmaster.issuecountry,hrmsapplicantmaster.issuecountrydesc,hrmsapplicantmaster.issuedate,hrmsapplicantmaster.expirydate,hrmsapplicantmaster.nationality,hrmsapplicantmaster.nationalitydesc,hrmsapplicantmaster.locationpreference,hrmsapplicantmaster.locationpreferencedesc,hrmsapplicantmaster.address1,hrmsapplicantmaster.address2,hrmsapplicantmaster.countryid,hrmsapplicantmaster.countryiddesc,hrmsapplicantmaster.stateid,hrmsapplicantmaster.stateiddesc,hrmsapplicantmaster.cityid,hrmsapplicantmaster.cityiddesc,hrmsapplicantmaster.pincode,hrmsapplicantmaster.reference1,hrmsapplicantmaster.reference1mobile,hrmsapplicantmaster.reference1email,hrmsapplicantmaster.reference2,hrmsapplicantmaster.reference2mobile,hrmsapplicantmaster.reference2email,hrmsapplicantmaster.attachment,hrmsapplicantmaster.customfield,hrmsapplicantmaster.remarks,hrmsapplicantmaster.rejectiontill,hrmsapplicantmaster.status,"","","","","",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(hrmsapplicantmaster => hrmsapplicantmaster.applicantname.includes(filter.name))

return response;
})
);
}



}

