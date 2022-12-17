import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bobranchlocation } from '../model/bobranchlocation.model';
import { bobranchsublocation } from '../model/bobranchsublocation.model';
import { environment } from '../../environments/environment';
import { IbobranchlocationResponse } from '../model/bobranchlocation.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bobranchlocationService {
  formData: bobranchlocation;
  readonly rootURL = AppConstants.baseURL;
  bobranchsublocations: bobranchsublocation[]=[];
  list: bobranchlocation[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebobranchlocations():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bobranchsublocations: this.bobranchsublocations.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/bobranchlocation', body);
  }
  }

  saveOrUpdatebobranchlocationsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bobranchlocation', body);
  }
  }

  getbobranchlocationsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchlocation').toPromise();
  }
  }
  getListBylocationid(locationid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchlocation'+'/locationid/'+locationid).toPromise();
  }
  }

  getListBybranchid(branchid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchlocation'+'/branchid/'+branchid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchlocation'+'/param/'+key).toPromise();
  }
  }


  getbobranchlocationsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchlocation'+'/e/'+id).toPromise();
  }
  }
  getbobranchlocationsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchlocation'+'/'+id).toPromise();
  }
  }

  deletebobranchlocation(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bobranchlocation'+'/'+id).toPromise();
  }
  }
clearList(){
this.bobranchsublocations = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bobranchlocation')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbobranchlocationResponse> {
return this.http.get<IbobranchlocationResponse>(AppConstants.ntireboURL+'/bobranchlocation')
.pipe(
tap((response: IbobranchlocationResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bobranchlocation => new bobranchlocation(bobranchlocation.branchid,bobranchlocation.locationid,bobranchlocation.locationcode,bobranchlocation.locationcodedesc,bobranchlocation.locationname,bobranchlocation.tag,bobranchlocation.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bobranchlocation => bobranchlocation.locationname.includes(filter.name))

return response;
})
);
}



}

