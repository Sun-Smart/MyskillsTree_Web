import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bousermaster } from '../model/bousermaster.model';
import { bouserbranchaccess } from '../model/bouserbranchaccess.model';
import { bousermenuaccess } from '../model/bousermenuaccess.model';
import { environment } from '../../environments/environment';
import { IbousermasterResponse } from '../model/bousermaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bousermasterService {
  formData: bousermaster;
  readonly rootURL = AppConstants.baseURL;
  bouserbranchaccesses: bouserbranchaccess[]=[];
  Insertbouserbranchaccesses: bouserbranchaccess[]=[];
  bousermenuaccesses: bousermenuaccess[]=[];
  Insertbousermenuaccesses: bousermenuaccess[]=[];
  list: bousermaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebousermasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bouserbranchaccesses: this.Insertbouserbranchaccesses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      bousermenuaccesses: this.Insertbousermenuaccesses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/bousermaster', body);
  }
  }

  saveOrUpdatebousermastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bousermaster', body);
  }
  }

  getbousermastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousermaster').toPromise();
  }
  }
  getListByuserid(userid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousermaster'+'/userid/'+userid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousermaster'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousermaster'+'/param/'+key).toPromise();
  }
  }


  getbousermastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousermaster'+'/e/'+id).toPromise();
  }
  }
  getbousermastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousermaster'+'/'+id).toPromise();
  }
  }

  deletebousermaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bousermaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.bouserbranchaccesses = [];
this.bousermenuaccesses = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bousermaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbousermasterResponse> {
return this.http.get<IbousermasterResponse>(AppConstants.ntireboURL+'/bousermaster')
.pipe(
tap((response: IbousermasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bousermaster => new bousermaster(bousermaster.userid,bousermaster.sourcefield,bousermaster.sourcereference,bousermaster.userroleid,bousermaster.userroleiddesc,bousermaster.branchid,bousermaster.branchiddesc,bousermaster.departmentid,bousermaster.departmentiddesc,bousermaster.usercode,bousermaster.username,bousermaster.shortname,bousermaster.bio,bousermaster.avatar,bousermaster.designation,bousermaster.designationdesc,bousermaster.reportingto,bousermaster.reportingtodesc,bousermaster.role,bousermaster.roledesc,bousermaster.emailid,bousermaster.mobilenumber,bousermaster.password,bousermaster.nextloginchangepassword,bousermaster.validityfrom,bousermaster.validityto,bousermaster.educationid,bousermaster.educationiddesc,bousermaster.usersignature,bousermaster.userphoto,bousermaster.thumbnail,bousermaster.emailpassword,bousermaster.emailsignature,bousermaster.dateofbirth,bousermaster.defaultpage,bousermaster.defaultlanguage,bousermaster.defaultlanguagedesc,bousermaster.layoutpage,bousermaster.theme,bousermaster.gender,bousermaster.genderdesc,bousermaster.nationality,bousermaster.nationalitydesc,bousermaster.bloodgroup,bousermaster.bloodgroupdesc,bousermaster.religion,bousermaster.religiondesc,bousermaster.maritalstatus,bousermaster.maritalstatusdesc,bousermaster.referencenumber,bousermaster.address1,bousermaster.address2,bousermaster.countryid,bousermaster.countryiddesc,bousermaster.stateid,bousermaster.stateiddesc,bousermaster.cityid,bousermaster.cityiddesc,bousermaster.zipcode,bousermaster.emergencycontactperson,bousermaster.relationship,bousermaster.cpphonenumber,bousermaster.emailnotifications,bousermaster.whatsappnotifications,bousermaster.employeespecificapproval,bousermaster.autoapproval,bousermaster.approvallevel,bousermaster.approvalleveldesc,bousermaster.approvallevel1,bousermaster.approvallevel1desc,bousermaster.approvallevel2,bousermaster.approvallevel2desc,bousermaster.approvallevel3,bousermaster.approvallevel3desc,bousermaster.approvallevel4,bousermaster.approvallevel4desc,bousermaster.approvallevel5,bousermaster.approvallevel5desc,bousermaster.approvalleveltype1,bousermaster.approvalleveltype1desc,bousermaster.approvalleveltype2,bousermaster.approvalleveltype2desc,bousermaster.approvalleveltype3,bousermaster.approvalleveltype3desc,bousermaster.approvalleveltype4,bousermaster.approvalleveltype4desc,bousermaster.approvalleveltype5,bousermaster.approvalleveltype5desc,bousermaster.twitter,bousermaster.facebook,bousermaster.linkedin,bousermaster.skype,bousermaster.googleplus,bousermaster.customfield,bousermaster.attachment,bousermaster.status,bousermaster.employeeid,"",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bousermaster => bousermaster.username.includes(filter.name))

return response;
})
);
}


  login(email: string, pwd: string) {
   
    var body = {
      Username: email,
      Password: pwd
    };
    debugger;
    return this.http.get(this.rootURL + "/Token?email=" + email + "&Password=" + pwd).toPromise();
  }
}

