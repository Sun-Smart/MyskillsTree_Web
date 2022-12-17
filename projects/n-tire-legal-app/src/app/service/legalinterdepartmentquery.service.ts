import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalinterdepartmentquery } from '../model/legalinterdepartmentquery.model';
import { legalinterdepartmentqueryresponse } from '../model/legalinterdepartmentqueryresponse.model';
import { environment } from '../../environments/environment';
import { IlegalinterdepartmentqueryResponse } from '../model/legalinterdepartmentquery.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalinterdepartmentqueryService {
  formData: legalinterdepartmentquery;
  readonly rootURL = AppConstants.baseURL;
  list: legalinterdepartmentquery[];
  legalinterdepartmentqueryresponses: legalinterdepartmentqueryresponse[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalinterdepartmentqueries():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      legalinterdepartmentqueryresponses: this.legalinterdepartmentqueryresponses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalinterdepartmentquery', body);
  }
  }

  saveOrUpdatelegalinterdepartmentqueriesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalinterdepartmentquery', body);
  }
  }

  getlegalinterdepartmentqueriesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalinterdepartmentquery').toPromise();
  }
  }
  getListByidqid(idqid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalinterdepartmentquery'+'/idqid/'+idqid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalinterdepartmentquery'+'/param/'+key).toPromise();
  }
  }


  getlegalinterdepartmentqueriesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalinterdepartmentquery'+'/e/'+id).toPromise();
  }
  }
  getlegalinterdepartmentqueriesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalinterdepartmentquery'+'/'+id).toPromise();
  }
  }

  deletelegalinterdepartmentquery(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalinterdepartmentquery'+'/'+id).toPromise();
  }
  }
clearList(){
this.legalinterdepartmentqueryresponses = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalinterdepartmentquery')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IlegalinterdepartmentqueryResponse> {
return this.http.get<IlegalinterdepartmentqueryResponse>(AppConstants.ntirelegalURL+'/legalinterdepartmentquery')
.pipe(
tap((response: IlegalinterdepartmentqueryResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(legalinterdepartmentquery => new legalinterdepartmentquery(legalinterdepartmentquery.caseid,legalinterdepartmentquery.caseiddesc,legalinterdepartmentquery.idqid,legalinterdepartmentquery.idqdate,legalinterdepartmentquery.fromuser,legalinterdepartmentquery.fromuserdesc,legalinterdepartmentquery.touser,legalinterdepartmentquery.subject,legalinterdepartmentquery.description,legalinterdepartmentquery.attachment,legalinterdepartmentquery.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(legalinterdepartmentquery => legalinterdepartmentquery.subject.includes(filter.name))

return response;
})
);
}



}

