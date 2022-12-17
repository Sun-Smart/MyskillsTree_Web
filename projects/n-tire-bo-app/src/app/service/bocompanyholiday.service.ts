import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bocompanyholiday } from '../model/bocompanyholiday.model';
import { environment } from '../../environments/environment';
import { IbocompanyholidayResponse } from '../model/bocompanyholiday.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bocompanyholidayService {
  formData: bocompanyholiday;
  readonly rootURL = AppConstants.baseURL;
  list: bocompanyholiday[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebocompanyholidays():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bocompanyholiday', body);
  }
  }

  saveOrUpdatebocompanyholidaysList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bocompanyholiday', body);
  }
  }

  getbocompanyholidaysList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocompanyholiday').toPromise();
  }
  }
  getListByholidayid(holidayid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocompanyholiday'+'/holidayid/'+holidayid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocompanyholiday'+'/param/'+key).toPromise();
  }
  }


  getbocompanyholidaysByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocompanyholiday'+'/e/'+id).toPromise();
  }
  }
  getbocompanyholidaysByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocompanyholiday'+'/'+id).toPromise();
  }
  }

  deletebocompanyholiday(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bocompanyholiday'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bocompanyholiday')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbocompanyholidayResponse> {
return this.http.get<IbocompanyholidayResponse>(AppConstants.ntireboURL+'/bocompanyholiday')
.pipe(
tap((response: IbocompanyholidayResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bocompanyholiday => new bocompanyholiday(bocompanyholiday.holidayid,bocompanyholiday.financialyearid,bocompanyholiday.financialyeariddesc,bocompanyholiday.holidaydate,bocompanyholiday.holidayday,bocompanyholiday.holidaydaydesc,bocompanyholiday.reason,bocompanyholiday.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bocompanyholiday => bocompanyholiday.holidaydate.includes(filter.name))

return response;
})
);
}



}

