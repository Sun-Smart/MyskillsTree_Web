import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erptenderquotationanswer } from '../model/erptenderquotationanswer.model';
import { environment } from '../../environments/environment';
import { IerptenderquotationanswerResponse } from '../model/erptenderquotationanswer.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erptenderquotationanswerService {
  formData: erptenderquotationanswer;
  readonly rootURL = AppConstants.baseURL;
  list: erptenderquotationanswer[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerptenderquotationanswers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptenderquotationanswer', body);
  }
  }

  saveOrUpdateerptenderquotationanswersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptenderquotationanswer', body);
  }
  }

  geterptenderquotationanswersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderquotationanswer').toPromise();
  }
  }
  getListByanswerid(answerid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderquotationanswer'+'/answerid/'+answerid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderquotationanswer'+'/param/'+key).toPromise();
  }
  }


  geterptenderquotationanswersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderquotationanswer'+'/e/'+id).toPromise();
  }
  }
  geterptenderquotationanswersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderquotationanswer'+'/'+id).toPromise();
  }
  }

  deleteerptenderquotationanswer(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erptenderquotationanswer'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erptenderquotationanswer')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IerptenderquotationanswerResponse> {
return this.http.get<IerptenderquotationanswerResponse>(AppConstants.ntireprocurementURL+'/erptenderquotationanswer')
.pipe(
tap((response: IerptenderquotationanswerResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(erptenderquotationanswer => new erptenderquotationanswer(erptenderquotationanswer.tenderid,erptenderquotationanswer.quotationid,erptenderquotationanswer.quotationiddesc,erptenderquotationanswer.answerid,erptenderquotationanswer.questionid,erptenderquotationanswer.questioniddesc,erptenderquotationanswer.question,erptenderquotationanswer.answer,erptenderquotationanswer.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(erptenderquotationanswer => erptenderquotationanswer.answer.includes(filter.name))

return response;
})
);
}



}

