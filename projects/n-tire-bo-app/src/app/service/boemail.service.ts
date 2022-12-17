import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boemail } from '../model/boemail.model';
import { environment } from '../../environments/environment';
import { IboemailResponse } from '../model/boemail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boemailService {
  formData: boemail;
  readonly rootURL = AppConstants.baseURL;
  list: boemail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboemails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/boemail', body);
  }
  }

  saveOrUpdateboemailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boemail', body);
  }
  }

  getboemailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boemail').toPromise();
  }
  }
  getListBymailid(mailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boemail'+'/mailid/'+mailid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boemail'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boemail'+'/param/'+key).toPromise();
  }
  }


  getboemailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boemail'+'/e/'+id).toPromise();
  }
  }
  getboemailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boemail'+'/'+id).toPromise();
  }
  }

  deleteboemail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boemail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boemail')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IboemailResponse> {
return this.http.get<IboemailResponse>(AppConstants.ntireboURL+'/boemail')
.pipe(
tap((response: IboemailResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(boemail => new boemail(boemail.mailid,boemail.emailtemplateid,boemail.sourcefield,boemail.sourcereference,boemail.fromemail,boemail.toemail,boemail.cc,boemail.subject,boemail.emailtext,boemail.mailstatus,boemail.mailstatusdesc,boemail.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(boemail => boemail.subject.includes(filter.name))

return response;
})
);
}



}

