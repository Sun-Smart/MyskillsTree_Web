import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bomasterdatatype } from '../model/bomasterdatatype.model';
import { bomasterdata } from '../model/bomasterdata.model';
import { environment } from '../../environments/environment';
import { IbomasterdatatypeResponse } from '../model/bomasterdatatype.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bomasterdatatypeService {
  formData: bomasterdatatype;
  readonly rootURL = AppConstants.baseURL;
  bomasterdatas: bomasterdata[]=[];
  list: bomasterdatatype[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebomasterdatatypes():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bomasterdatas: this.bomasterdatas.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/bomasterdatatype', body);
  }
  }

  saveOrUpdatebomasterdatatypesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bomasterdatatype', body);
  }
  }

  getbomasterdatatypesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomasterdatatype').toPromise();
  }
  }
  getListBydatatypeid(datatypeid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomasterdatatype'+'/datatypeid/'+datatypeid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomasterdatatype'+'/param/'+key).toPromise();
  }
  }


  getbomasterdatatypesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomasterdatatype'+'/e/'+id).toPromise();
  }
  }
  getbomasterdatatypesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomasterdatatype'+'/'+id).toPromise();
  }
  }

  deletebomasterdatatype(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bomasterdatatype'+'/'+id).toPromise();
  }
  }
clearList(){
this.bomasterdatas = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bomasterdatatype')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbomasterdatatypeResponse> {
return this.http.get<IbomasterdatatypeResponse>(AppConstants.ntireboURL+'/bomasterdatatype')
.pipe(
tap((response: IbomasterdatatypeResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bomasterdatatype => new bomasterdatatype(bomasterdatatype.datatypeid,bomasterdatatype.code,bomasterdatatype.codedesc,bomasterdatatype.masterdataname,bomasterdatatype.hassubcategory,bomasterdatatype.canadd,bomasterdatatype.canedit,bomasterdatatype.candelete,bomasterdatatype.erp,bomasterdatatype.cams,bomasterdatatype.crm,bomasterdatatype.procurement,bomasterdatatype.legal,bomasterdatatype.hrms,bomasterdatatype.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bomasterdatatype => bomasterdatatype.masterdataname.includes(filter.name))

return response;
})
);
}



}

