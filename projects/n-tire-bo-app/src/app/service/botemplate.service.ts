import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { botemplate } from '../model/botemplate.model';
import { environment } from '../../environments/environment';
import { IbotemplateResponse } from '../model/botemplate.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class botemplateService {
  formData: botemplate;
  readonly rootURL = AppConstants.baseURL;
  list: botemplate[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebotemplates():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/botemplate', body);
  }
  }

  saveOrUpdatebotemplatesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/botemplate', body);
  }
  }

  getbotemplatesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/botemplate').toPromise();
  }
  }
  getListBytemplateid(templateid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/botemplate'+'/templateid/'+templateid).toPromise();
  }
  }

  getListBytemplatecode(templatecode:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/botemplate'+'/templatecode/'+templatecode).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/botemplate'+'/param/'+key).toPromise();
  }
  }


  getbotemplatesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/botemplate'+'/e/'+id).toPromise();
  }
  }
  getbotemplatesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/botemplate'+'/'+id).toPromise();
  }
  }

  deletebotemplate(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/botemplate'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/botemplate')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbotemplateResponse> {
return this.http.get<IbotemplateResponse>(AppConstants.ntireboURL+'/botemplate')
.pipe(
tap((response: IbotemplateResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(botemplate => new botemplate(botemplate.templateid,botemplate.templatetype,botemplate.templatetypedesc,botemplate.templatecode,botemplate.templatetext,botemplate.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(botemplate => botemplate.templatecode.includes(filter.name))

return response;
})
);
}



}

