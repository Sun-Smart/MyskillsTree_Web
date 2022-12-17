import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bocontact } from '../model/bocontact.model';
import { environment } from '../../environments/environment';
import { IbocontactResponse } from '../model/bocontact.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bocontactService {
  formData: bocontact;
  readonly rootURL = AppConstants.baseURL;
  list: bocontact[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebocontacts():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bocontact', body);
  }
  }

  saveOrUpdatebocontactsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bocontact', body);
  }
  }

  getbocontactsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocontact').toPromise();
  }
  }
  getListBycontactid(contactid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocontact'+'/contactid/'+contactid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocontact'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocontact'+'/param/'+key).toPromise();
  }
  }


  getbocontactsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocontact'+'/e/'+id).toPromise();
  }
  }
  getbocontactsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocontact'+'/'+id).toPromise();
  }
  }

  deletebocontact(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bocontact'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bocontact')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbocontactResponse> {
return this.http.get<IbocontactResponse>(AppConstants.ntireboURL+'/bocontact')
.pipe(
tap((response: IbocontactResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bocontact => new bocontact(bocontact.contactid,bocontact.referencetype,bocontact.referencetypedesc,bocontact.referenceid,bocontact.contacttype,bocontact.contacttypedesc,bocontact.firstname,bocontact.lastname,bocontact.title,bocontact.activefromdate,bocontact.activetodate,bocontact.department,bocontact.category,bocontact.categorydesc,bocontact.phone,bocontact.donotcall,bocontact.email1,bocontact.email2,bocontact.assignedto,bocontact.sourcefield,bocontact.sourcereference,bocontact.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bocontact => bocontact.lastname.includes(filter.name))

return response;
})
);
}



}

