import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjprojectmaster } from '../model/prjprojectmaster.model';
import { prjprojectdeliverable } from '../model/prjprojectdeliverable.model';
import { prjexpense } from '../model/prjexpense.model';
import { prjprojecttask } from '../model/prjprojecttask.model';
import { bofact } from '../../../../n-tire-bo-app/src/app/model/bofact.model';
import { prjprojectchange } from '../model/prjprojectchange.model';
import { boremindermaster } from '../../../../n-tire-bo-app/src/app/model/boremindermaster.model';
import { prjprojectteammember } from '../model/prjprojectteammember.model';
import { prjprojectverification } from '../model/prjprojectverification.model';
import { prjtimecard } from '../model/prjtimecard.model';
import { prjdocument } from '../model/prjdocument.model';
import { prjprojectbilling } from '../model/prjprojectbilling.model';
import { prjprojectobjective } from '../model/prjprojectobjective.model';
import { prjdailystandup } from '../model/prjdailystandup.model';
import { prjchangerequest } from '../model/prjchangerequest.model';
import { prjrelease } from '../model/prjrelease.model';
import { proprocessgap } from '../../../../n-tire-bo-app/src/app/model/proprocessgap.model';
import { bouser } from '../../../../n-tire-bo-app/src/app/model/bouser.model';
import { prjprojectoutput } from '../model/prjprojectoutput.model';
import { prjprojectrequirement } from '../model/prjprojectrequirement.model';
import { environment } from '../../environments/environment';
import { IprjprojectmasterResponse } from '../model/prjprojectmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjprojectmasterService {
  formData: prjprojectmaster;
  readonly rootURL = AppConstants.baseURL;
  list: prjprojectmaster[];
  prjprojectdeliverables: prjprojectdeliverable[]=[];
  prjexpenses: prjexpense[]=[];
  prjprojecttasks: prjprojecttask[]=[];
  bofacts: bofact[]=[];
  prjprojectchanges: prjprojectchange[]=[];
  boremindermasters: boremindermaster[]=[];
  prjprojectteammembers: prjprojectteammember[]=[];
  prjprojectverifications: prjprojectverification[]=[];
  prjtimecards: prjtimecard[]=[];
  prjdocuments: prjdocument[]=[];
  prjprojectbillings: prjprojectbilling[]=[];
  prjprojectobjectives: prjprojectobjective[]=[];
  prjdailystandups: prjdailystandup[]=[];
  prjchangerequests: prjchangerequest[]=[];
  prjreleases: prjrelease[]=[];
  proprocessgaps: proprocessgap[]=[];
  bousers: bouser[]=[];
  Insertbousers: bouser[]=[];
  prjprojectoutputs: prjprojectoutput[]=[];
  prjprojectrequirements: prjprojectrequirement[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateprjprojectmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      prjprojectdeliverables: this.prjprojectdeliverables.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      prjexpenses: this.prjexpenses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      prjprojecttasks: this.prjprojecttasks.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      bofacts: this.bofacts.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      prjprojectchanges: this.prjprojectchanges.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      boremindermasters: this.boremindermasters.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      prjprojectteammembers: this.prjprojectteammembers.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      prjprojectverifications: this.prjprojectverifications.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      prjtimecards: this.prjtimecards.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      prjdocuments: this.prjdocuments.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      prjprojectbillings: this.prjprojectbillings.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      prjprojectobjectives: this.prjprojectobjectives.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      prjdailystandups: this.prjdailystandups.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      prjchangerequests: this.prjchangerequests.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      prjreleases: this.prjreleases.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      proprocessgaps: this.proprocessgaps.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      bousers: this.Insertbousers.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      prjprojectoutputs: this.prjprojectoutputs.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      prjprojectrequirements: this.prjprojectrequirements.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprojectURL + '/prjprojectmaster', body);
  }
  }

  saveOrUpdateprjprojectmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprojectURL + '/prjprojectmaster', body);
  }
  }

  getprjprojectmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectmaster').toPromise();
  }
  }
  getListByprojectid(projectid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectmaster'+'/projectid/'+projectid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectmaster'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectmaster'+'/param/'+key).toPromise();
  }
  }


  getprjprojectmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectmaster'+'/e/'+id).toPromise();
  }
  }
  getprjprojectmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectmaster'+'/'+id).toPromise();
  }
  }

  deleteprjprojectmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprojectURL + '/prjprojectmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.prjprojectdeliverables = [];
this.prjexpenses = [];
this.prjprojecttasks = [];
this.bofacts = [];
this.prjprojectchanges = [];
this.boremindermasters = [];
this.prjprojectteammembers = [];
this.prjprojectverifications = [];
this.prjtimecards = [];
this.prjdocuments = [];
this.prjprojectbillings = [];
this.prjprojectobjectives = [];
this.prjdailystandups = [];
this.prjchangerequests = [];
this.prjreleases = [];
this.proprocessgaps = [];
this.bousers = [];
this.prjprojectoutputs = [];
this.prjprojectrequirements = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprojectURL + '/prjprojectmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IprjprojectmasterResponse> {
return this.http.get<IprjprojectmasterResponse>(AppConstants.ntireprojectURL+'/prjprojectmaster')
.pipe(
tap((response: IprjprojectmasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(prjprojectmaster => new prjprojectmaster(prjprojectmaster.projectid,prjprojectmaster.sourcefield,prjprojectmaster.sourcereference,prjprojectmaster.projectcode,prjprojectmaster.projectname,prjprojectmaster.departmentid,prjprojectmaster.customerid,prjprojectmaster.customeriddesc,prjprojectmaster.salesorderid,prjprojectmaster.briefdescription,prjprojectmaster.projectscope,prjprojectmaster.thumbnail,prjprojectmaster.projectmanager,prjprojectmaster.projectmanagerdesc,prjprojectmaster.startdate,prjprojectmaster.enddate,prjprojectmaster.progressrate,prjprojectmaster.lastupdateddate,prjprojectmaster.actualstartdate,prjprojectmaster.projectedenddate,prjprojectmaster.completeddate,prjprojectmaster.closeddate,prjprojectmaster.lastreviseddate,prjprojectmaster.projecttype,prjprojectmaster.projecttypedesc,prjprojectmaster.priority,prjprojectmaster.prioritydesc,prjprojectmaster.projectphase,prjprojectmaster.projectphasedesc,prjprojectmaster.projectstatus,prjprojectmaster.projectstatusdesc,prjprojectmaster.currency,prjprojectmaster.currencydesc,prjprojectmaster.totalbudgetamount,prjprojectmaster.feedbacktags,prjprojectmaster.budgetmaterialcost,prjprojectmaster.budgetlabourcost,prjprojectmaster.actualmaterialcost,prjprojectmaster.actuallabourcost,prjprojectmaster.materialbudgetremaining,prjprojectmaster.totalbudgetremaining,prjprojectmaster.totalhoursestimated,prjprojectmaster.totalactualhours,prjprojectmaster.notes,prjprojectmaster.costcenterid,prjprojectmaster.customfield,prjprojectmaster.attachment,prjprojectmaster.status,"","","","","","","","","","","","","","","","","","",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(prjprojectmaster => prjprojectmaster.projectname.includes(filter.name))

return response;
})
);
}



}

