import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bodatamasking } from '../model/bodatamasking.model';
import { bosecurityquestion } from '../model/bosecurityquestion.model';
import { bodatamaskingrolerestrict } from '../model/bodatamaskingrolerestrict.model';
import { environment } from '../../environments/environment';
import { IbodatamaskingResponse } from '../model/bodatamasking.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bodatamaskingService {
  formData: bodatamasking;
  readonly rootURL = AppConstants.baseURL;
  bosecurityquestions: bosecurityquestion[]=[];
  bodatamaskingrolerestricts: bodatamaskingrolerestrict[]=[];
  Insertbodatamaskingrolerestricts: bodatamaskingrolerestrict[]=[];
  list: bodatamasking[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebodatamaskings():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bosecurityquestions: this.bosecurityquestions.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      bodatamaskingrolerestricts: this.Insertbodatamaskingrolerestricts.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/bodatamasking', body);
  }
  }

  saveOrUpdatebodatamaskingsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bodatamasking', body);
  }
  }

  getbodatamaskingsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodatamasking').toPromise();
  }
  }
  getListBydatamaskid(datamaskid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodatamasking'+'/datamaskid/'+datamaskid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodatamasking'+'/param/'+key).toPromise();
  }
  }


  getbodatamaskingsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodatamasking'+'/e/'+id).toPromise();
  }
  }
  getbodatamaskingsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodatamasking'+'/'+id).toPromise();
  }
  }

  deletebodatamasking(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bodatamasking'+'/'+id).toPromise();
  }
  }
clearList(){
this.bosecurityquestions = [];
this.bodatamaskingrolerestricts = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bodatamasking')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbodatamaskingResponse> {
return this.http.get<IbodatamaskingResponse>(AppConstants.ntireboURL+'/bodatamasking')
.pipe(
tap((response: IbodatamaskingResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bodatamasking => new bodatamasking(bodatamasking.datamaskid,bodatamasking.tablename,bodatamasking.fieldname,bodatamasking.masklogic,bodatamasking.status,"",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bodatamasking => bodatamasking.fieldname.includes(filter.name))

return response;
})
);
}



}

