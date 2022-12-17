import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bobranchmaster } from '../model/bobranchmaster.model';
import { bobranchholiday } from '../model/bobranchholiday.model';
import { environment } from '../../environments/environment';
import { IbobranchmasterResponse } from '../model/bobranchmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bobranchmasterService {
  formData: bobranchmaster;
  readonly rootURL = AppConstants.baseURL;
  bobranchholidays: bobranchholiday[]=[];
  list: bobranchmaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebobranchmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bobranchholidays: this.bobranchholidays.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/bobranchmaster', body);
  }
  }

  saveOrUpdatebobranchmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bobranchmaster', body);
  }
  }

  getbobranchmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchmaster').toPromise();
  }
  }
  getListBybranchid(branchid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchmaster'+'/branchid/'+branchid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchmaster'+'/param/'+key).toPromise();
  }
  }


  getbobranchmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchmaster'+'/e/'+id).toPromise();
  }
  }
  getbobranchmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchmaster'+'/'+id).toPromise();
  }
  }

  deletebobranchmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bobranchmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.bobranchholidays = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bobranchmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbobranchmasterResponse> {
return this.http.get<IbobranchmasterResponse>(AppConstants.ntireboURL+'/bobranchmaster')
.pipe(
tap((response: IbobranchmasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bobranchmaster => new bobranchmaster(bobranchmaster.branchid,bobranchmaster.branchcode,bobranchmaster.branchname,bobranchmaster.thumbnail,bobranchmaster.address1,bobranchmaster.address2,bobranchmaster.countryid,bobranchmaster.countryiddesc,bobranchmaster.stateid,bobranchmaster.stateiddesc,bobranchmaster.cityid,bobranchmaster.cityiddesc,bobranchmaster.locationid,bobranchmaster.locationiddesc,bobranchmaster.pin,bobranchmaster.latlong,bobranchmaster.starttime,bobranchmaster.endtime,bobranchmaster.weekoff1,bobranchmaster.weekoff1desc,bobranchmaster.weekoff2,bobranchmaster.weekoff2desc,bobranchmaster.remarks,bobranchmaster.totalregions,bobranchmaster.accounts,bobranchmaster.salespeople,bobranchmaster.resourceallocation,bobranchmaster.resourceallocationdesc,bobranchmaster.growthopportunity,bobranchmaster.growthopportunitydesc,bobranchmaster.salesdirector,bobranchmaster.customersuccessdirector,bobranchmaster.customersuccessdirectordesc,bobranchmaster.customfield,bobranchmaster.attachment,bobranchmaster.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bobranchmaster => bobranchmaster.branchname.includes(filter.name))

return response;
})
);
}



}

