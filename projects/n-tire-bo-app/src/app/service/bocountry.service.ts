import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bocountry } from '../model/bocountry.model';
import { bostate } from '../model/bostate.model';
import { environment } from '../../environments/environment';
import { IbocountryResponse } from '../model/bocountry.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bocountryService {
  formData: bocountry;
  readonly rootURL = AppConstants.baseURL;
  bostates: bostate[]=[];
  list: bocountry[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebocountries():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bostates: this.bostates.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/bocountry', body);
  }
  }

  saveOrUpdatebocountriesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bocountry', body);
  }
  }

  getbocountriesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocountry').toPromise();
  }
  }
  getListBycountryid(countryid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocountry'+'/countryid/'+countryid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocountry'+'/param/'+key).toPromise();
  }
  }


  getbocountriesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocountry'+'/e/'+id).toPromise();
  }
  }
  getbocountriesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocountry'+'/'+id).toPromise();
  }
  }

  deletebocountry(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bocountry'+'/'+id).toPromise();
  }
  }
clearList(){
this.bostates = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bocountry')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbocountryResponse> {
return this.http.get<IbocountryResponse>(AppConstants.ntireboURL+'/bocountry')
.pipe(
tap((response: IbocountryResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bocountry => new bocountry(bocountry.countryid,bocountry.code,bocountry.name,bocountry.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bocountry => bocountry.name.includes(filter.name))

return response;
})
);
}



}

