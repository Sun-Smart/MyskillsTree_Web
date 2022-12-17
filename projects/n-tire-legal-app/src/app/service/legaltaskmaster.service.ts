import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legaltaskmaster } from '../model/legaltaskmaster.model';
import { legaltaskresponse } from '../model/legaltaskresponse.model';
import { environment } from '../../environments/environment';
import { IlegaltaskmasterResponse } from '../model/legaltaskmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legaltaskmasterService {
  formData: legaltaskmaster;
  readonly rootURL = AppConstants.baseURL;
  list: legaltaskmaster[];
  legaltaskresponses: legaltaskresponse[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegaltaskmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      legaltaskresponses: this.legaltaskresponses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legaltaskmaster', body);
  }
  }

  saveOrUpdatelegaltaskmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legaltaskmaster', body);
  }
  }

  getlegaltaskmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legaltaskmaster').toPromise();
  }
  }
  getListBytaskid(taskid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legaltaskmaster'+'/taskid/'+taskid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legaltaskmaster'+'/param/'+key).toPromise();
  }
  }


  getlegaltaskmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legaltaskmaster'+'/e/'+id).toPromise();
  }
  }
  getlegaltaskmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legaltaskmaster'+'/'+id).toPromise();
  }
  }

  deletelegaltaskmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legaltaskmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.legaltaskresponses = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legaltaskmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IlegaltaskmasterResponse> {
return this.http.get<IlegaltaskmasterResponse>(AppConstants.ntirelegalURL+'/legaltaskmaster')
.pipe(
tap((response: IlegaltaskmasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(legaltaskmaster => new legaltaskmaster(legaltaskmaster.taskid,legaltaskmaster.caseid,legaltaskmaster.caseiddesc,legaltaskmaster.taskdate,legaltaskmaster.customerid,legaltaskmaster.customeriddesc,legaltaskmaster.description,legaltaskmaster.taskcategory,legaltaskmaster.taskcategorydesc,legaltaskmaster.tasktype,legaltaskmaster.tasktypedesc,legaltaskmaster.tasksubtype,legaltaskmaster.tasksubtypedesc,legaltaskmaster.priority,legaltaskmaster.prioritydesc,legaltaskmaster.assignedto,legaltaskmaster.estimatedhrs,legaltaskmaster.startdate,legaltaskmaster.target,legaltaskmaster.billable,legaltaskmaster.ratetype,legaltaskmaster.ratetypedesc,legaltaskmaster.rate,legaltaskmaster.taskstatus,legaltaskmaster.taskstatusdesc,legaltaskmaster.taskstarted,legaltaskmaster.remarks,legaltaskmaster.attachment,legaltaskmaster.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(legaltaskmaster => legaltaskmaster.description.includes(filter.name))

return response;
})
);
}



}

