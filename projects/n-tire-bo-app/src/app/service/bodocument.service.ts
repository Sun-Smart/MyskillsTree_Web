import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bodocument } from '../model/bodocument.model';
import { environment } from '../../environments/environment';
import { IbodocumentResponse } from '../model/bodocument.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bodocumentService {
  formData: bodocument;
  readonly rootURL = AppConstants.baseURL;
  list: bodocument[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebodocuments():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bodocument', body);
  }
  }

  saveOrUpdatebodocumentsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bodocument', body);
  }
  }

  getbodocumentsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodocument').toPromise();
  }
  }
  getListBydocumentid(documentid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodocument'+'/documentid/'+documentid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodocument'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodocument'+'/param/'+key).toPromise();
  }
  }


  getbodocumentsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodocument'+'/e/'+id).toPromise();
  }
  }
  getbodocumentsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodocument'+'/'+id).toPromise();
  }
  }

  deletebodocument(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bodocument'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bodocument')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbodocumentResponse> {
return this.http.get<IbodocumentResponse>(AppConstants.ntireboURL+'/bodocument')
.pipe(
tap((response: IbodocumentResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bodocument => new bodocument(bodocument.documentid,bodocument.sourcefield,bodocument.sourcereference,bodocument.referencetype,bodocument.referenceid,bodocument.documenttype,bodocument.documenttypedesc,bodocument.documentcode,bodocument.versionnumber,bodocument.documentname,bodocument.category,bodocument.categorydesc,bodocument.subcategory,bodocument.subcategorydesc,bodocument.issuedate,bodocument.expirydate,bodocument.certified,bodocument.certificatenumber,bodocument.certifyingagency,bodocument.renewcompulsary,bodocument.reminder,bodocument.attachment,bodocument.remarks,bodocument.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bodocument => bodocument.documentname.includes(filter.name))

return response;
})
);
}



}

