import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bocity } from '../model/bocity.model';
import { bolocation } from '../model/bolocation.model';
import { environment } from '../../environments/environment';
import { IbocityResponse } from '../model/bocity.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bocityService {
  formData: bocity;
  readonly rootURL = AppConstants.baseURL;
  list: bocity[];
  bolocations: bolocation[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebocities():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bolocations: this.bolocations.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/bocity', body);
  }
  }

  saveOrUpdatebocitiesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bocity', body);
  }
  }

  getbocitiesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocity').toPromise();
  }
  }
  getListBycityid(cityid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocity'+'/cityid/'+cityid).toPromise();
  }
  }

  getListBystateid(stateid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocity'+'/stateid/'+stateid).toPromise();
  }
  }

  getListBycountryid(countryid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocity'+'/countryid/'+countryid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocity'+'/param/'+key).toPromise();
  }
  }


  getbocitiesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocity'+'/e/'+id).toPromise();
  }
  }
  getbocitiesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocity'+'/'+id).toPromise();
  }
  }

  deletebocity(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bocity'+'/'+id).toPromise();
  }
  }
clearList(){
this.bolocations = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bocity')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbocityResponse> {
return this.http.get<IbocityResponse>(AppConstants.ntireboURL+'/bocity')
.pipe(
tap((response: IbocityResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bocity => new bocity(bocity.cityid,bocity.code,bocity.name,bocity.stateid,bocity.countryid,bocity.countryiddesc,bocity.metro,bocity.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bocity => bocity.name.includes(filter.name))

return response;
})
);
}



}

