import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bomasterdata } from '../model/bomasterdata.model';
import { bosubcategorymaster } from '../model/bosubcategorymaster.model';
import { environment } from '../../environments/environment';
import { IbomasterdataResponse } from '../model/bomasterdata.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bomasterdataService {
  formData: bomasterdata;
  readonly rootURL = AppConstants.baseURL;
  bosubcategorymasters: bosubcategorymaster[]=[];
  list: bomasterdata[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebomasterdatas():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bosubcategorymasters: this.bosubcategorymasters.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/bomasterdata', body);
  }
  }

  saveOrUpdatebomasterdatasList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bomasterdata', body);
  }
  }

  getbomasterdatasList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomasterdata').toPromise();
  }
  }
  getListBymasterdataid(masterdataid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomasterdata'+'/masterdataid/'+masterdataid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomasterdata'+'/param/'+key).toPromise();
  }
  }


  getbomasterdatasByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomasterdata'+'/e/'+id).toPromise();
  }
  }
  getbomasterdatasByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomasterdata'+'/'+id).toPromise();
  }
  }

  deletebomasterdata(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bomasterdata'+'/'+id).toPromise();
  }
  }
clearList(){
this.bosubcategorymasters = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bomasterdata')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbomasterdataResponse> {
return this.http.get<IbomasterdataResponse>(AppConstants.ntireboURL+'/bomasterdata')
.pipe(
tap((response: IbomasterdataResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bomasterdata => new bomasterdata(bomasterdata.masterdataid,bomasterdata.masterdatatypeid,bomasterdata.masterdatatypeiddesc,bomasterdata.masterdatacode,bomasterdata.masterdatadescription,bomasterdata.orderno,bomasterdata.htmlcode,bomasterdata.param1,bomasterdata.param2,bomasterdata.helptext,bomasterdata.flag,bomasterdata.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bomasterdata => bomasterdata.masterdatadescription.includes(filter.name))

return response;
})
);
}



}

