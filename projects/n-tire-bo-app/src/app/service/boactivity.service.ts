import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boactivity } from '../model/boactivity.model';
import { environment } from '../../environments/environment';
import { IboactivityResponse } from '../model/boactivity.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boactivityService {
  formData: boactivity;
  readonly rootURL = AppConstants.baseURL;
  list: boactivity[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboactivities():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/boactivity', body);
  }
  }

  saveOrUpdateboactivitiesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boactivity', body);
  }
  }

  getboactivitiesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boactivity').toPromise();
  }
  }
  getListByactivityid(activityid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boactivity'+'/activityid/'+activityid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boactivity'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boactivity'+'/param/'+key).toPromise();
  }
  }


  getboactivitiesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boactivity'+'/e/'+id).toPromise();
  }
  }
  getboactivitiesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boactivity'+'/'+id).toPromise();
  }
  }

  deleteboactivity(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boactivity'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boactivity')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IboactivityResponse> {
return this.http.get<IboactivityResponse>(AppConstants.ntireboURL+'/boactivity')
.pipe(
tap((response: IboactivityResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(boactivity => new boactivity(boactivity.activityid,boactivity.activitytype,boactivity.activitytypedesc,boactivity.referenceid,boactivity.description,boactivity.startdate,boactivity.enddate,boactivity.duedate,boactivity.estimatedtime,boactivity.actualtimetaken,boactivity.priority,boactivity.prioritydesc,boactivity.assignedto,boactivity.assignedby,boactivity.assignedbydesc,boactivity.assigneddate,boactivity.contactpersonid,boactivity.contactpersoniddesc,boactivity.details,boactivity.activitystatus,boactivity.activitystatusdesc,boactivity.remarks,boactivity.customfield,boactivity.attachment,boactivity.status,boactivity.sourcefield,boactivity.sourcereference))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(boactivity => boactivity.description.includes(filter.name))

return response;
})
);
}



}

