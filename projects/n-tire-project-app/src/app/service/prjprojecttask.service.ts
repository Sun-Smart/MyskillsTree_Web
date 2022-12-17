import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjprojecttask } from '../model/prjprojecttask.model';
import { bofact } from '../../../../n-tire-bo-app/src/app/model/bofact.model';
import { environment } from '../../environments/environment';
import { IprjprojecttaskResponse } from '../model/prjprojecttask.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjprojecttaskService {
  formData: prjprojecttask;
  readonly rootURL = AppConstants.baseURL;
  list: prjprojecttask[];
  bofacts: bofact[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateprjprojecttasks():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bofacts: this.bofacts.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprojectURL + '/prjprojecttask', body);
  }
  }

  saveOrUpdateprjprojecttasksList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprojectURL + '/prjprojecttask', body);
  }
  }

  getprjprojecttasksList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojecttask').toPromise();
  }
  }
  getListBytaskid(taskid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojecttask'+'/taskid/'+taskid).toPromise();
  }
  }

  getListBydeliverableid(deliverableid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojecttask'+'/deliverableid/'+deliverableid).toPromise();
  }
  }

  getListByprojectid(projectid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojecttask'+'/projectid/'+projectid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojecttask'+'/param/'+key).toPromise();
  }
  }


  getprjprojecttasksByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojecttask'+'/e/'+id).toPromise();
  }
  }
  getprjprojecttasksByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojecttask'+'/'+id).toPromise();
  }
  }

  deleteprjprojecttask(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprojectURL + '/prjprojecttask'+'/'+id).toPromise();
  }
  }
clearList(){
this.bofacts = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprojectURL + '/prjprojecttask')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IprjprojecttaskResponse> {
return this.http.get<IprjprojecttaskResponse>(AppConstants.ntireprojectURL+'/prjprojecttask')
.pipe(
tap((response: IprjprojecttaskResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(prjprojecttask => new prjprojecttask(prjprojecttask.projectid,prjprojecttask.deliverableid,prjprojecttask.departmentid,prjprojecttask.taskid,prjprojecttask.taskcode,prjprojecttask.taskname,prjprojecttask.storypoints,prjprojecttask.feedbacktags,prjprojecttask.details,prjprojecttask.issues,prjprojecttask.milestone,prjprojecttask.startdate,prjprojecttask.enddate,prjprojecttask.assignedto,prjprojecttask.workdoneby,prjprojecttask.workdonebydesc,prjprojecttask.priority,prjprojecttask.prioritydesc,prjprojecttask.complexity,prjprojecttask.complexitydesc,prjprojecttask.taskcategory,prjprojecttask.taskcategorydesc,prjprojecttask.tasktype,prjprojecttask.tasktypedesc,prjprojecttask.activitytype,prjprojecttask.isbillable,prjprojecttask.colorcode,prjprojecttask.colorcodedesc,prjprojecttask.parenttasks,prjprojecttask.dependenttasks,prjprojecttask.taskstatus,prjprojecttask.taskstatusdesc,prjprojecttask.actualworkdone,prjprojecttask.actualstartdate,prjprojecttask.actualenddate,prjprojecttask.estimatedpercentage,prjprojecttask.completionpercentage,prjprojecttask.estimatedeffort,prjprojecttask.actualeffort,prjprojecttask.utilizationpercentage,prjprojecttask.labourbudget,prjprojecttask.labouractual,prjprojecttask.predecessor,prjprojecttask.sequence,prjprojecttask.feedbacknotes,prjprojecttask.notes,prjprojecttask.draft,prjprojecttask.outputid,prjprojecttask.customfield,prjprojecttask.attachment,prjprojecttask.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(prjprojecttask => prjprojecttask.taskname.includes(filter.name))

return response;
})
);
}



}

