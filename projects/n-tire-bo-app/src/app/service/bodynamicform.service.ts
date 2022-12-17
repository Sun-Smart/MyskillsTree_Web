import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bodynamicform } from '../model/bodynamicform.model';
import { bodynamicformdetail } from '../model/bodynamicformdetail.model';
import { environment } from '../../environments/environment';
import { IbodynamicformResponse } from '../model/bodynamicform.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bodynamicformService {
  formData: bodynamicform;
  readonly rootURL = AppConstants.baseURL;
  bodynamicformdetails: bodynamicformdetail[]=[];
  list: bodynamicform[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebodynamicforms():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bodynamicformdetails: this.bodynamicformdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/bodynamicform', body);
  }
  }

  saveOrUpdatebodynamicformsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bodynamicform', body);
  }
  }

  getbodynamicformsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodynamicform').toPromise();
  }
  }
  getListByformid(formid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodynamicform'+'/formid/'+formid).toPromise();
  }
  }

  getListBytableiddesc(tableiddesc:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodynamicform'+'/tableiddesc/'+tableiddesc).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodynamicform'+'/param/'+key).toPromise();
  }
  }


  getbodynamicformsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodynamicform'+'/e/'+id).toPromise();
  }
  }
  getbodynamicformsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodynamicform'+'/'+id).toPromise();
  }
  }

  deletebodynamicform(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bodynamicform'+'/'+id).toPromise();
  }
  }
clearList(){
this.bodynamicformdetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bodynamicform')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbodynamicformResponse> {
return this.http.get<IbodynamicformResponse>(AppConstants.ntireboURL+'/bodynamicform')
.pipe(
tap((response: IbodynamicformResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bodynamicform => new bodynamicform(bodynamicform.tableid,bodynamicform.tableiddesc,bodynamicform.tableiddesc,bodynamicform.conditionfield,bodynamicform.conditionvalue,bodynamicform.formid,bodynamicform.formname,bodynamicform.formtype,bodynamicform.formtypedesc,bodynamicform.formhtml,bodynamicform.cols,bodynamicform.templatehtml,bodynamicform.hasattachments,bodynamicform.sequence,bodynamicform.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bodynamicform => bodynamicform.formname.includes(filter.name))

return response;
})
);
}



}

