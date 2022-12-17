import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bostate } from '../model/bostate.model';
import { bocity } from '../model/bocity.model';
import { environment } from '../../environments/environment';
import { IbostateResponse } from '../model/bostate.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bostateService {
  formData: bostate;
  readonly rootURL = AppConstants.baseURL;
  bocities: bocity[]=[];
  list: bostate[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebostates():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bocities: this.bocities.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/bostate', body);
  }
  }

  saveOrUpdatebostatesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bostate', body);
  }
  }

  getbostatesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bostate').toPromise();
  }
  }
  getListBystateid(stateid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bostate'+'/stateid/'+stateid).toPromise();
  }
  }

  getListBycountryid(countryid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bostate'+'/countryid/'+countryid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bostate'+'/param/'+key).toPromise();
  }
  }


  getbostatesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bostate'+'/e/'+id).toPromise();
  }
  }
  getbostatesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bostate'+'/'+id).toPromise();
  }
  }

  deletebostate(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bostate'+'/'+id).toPromise();
  }
  }
clearList(){
this.bocities = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bostate')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbostateResponse> {
return this.http.get<IbostateResponse>(AppConstants.ntireboURL+'/bostate')
.pipe(
tap((response: IbostateResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bostate => new bostate(bostate.stateid,bostate.code,bostate.name,bostate.countryid,bostate.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bostate => bostate.name.includes(filter.name))

return response;
})
);
}



}

