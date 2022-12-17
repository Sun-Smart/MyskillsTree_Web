import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bosecurityquestion } from '../model/bosecurityquestion.model';
import { environment } from '../../environments/environment';
import { IbosecurityquestionResponse } from '../model/bosecurityquestion.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bosecurityquestionService {
  formData: bosecurityquestion;
  readonly rootURL = AppConstants.baseURL;
  list: bosecurityquestion[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebosecurityquestions():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bosecurityquestion', body);
  }
  }

  saveOrUpdatebosecurityquestionsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bosecurityquestion', body);
  }
  }

  getbosecurityquestionsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bosecurityquestion').toPromise();
  }
  }
  getListByquestionid(questionid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bosecurityquestion'+'/questionid/'+questionid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bosecurityquestion'+'/param/'+key).toPromise();
  }
  }


  getbosecurityquestionsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bosecurityquestion'+'/e/'+id).toPromise();
  }
  }
  getbosecurityquestionsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bosecurityquestion'+'/'+id).toPromise();
  }
  }

  deletebosecurityquestion(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bosecurityquestion'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bosecurityquestion')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbosecurityquestionResponse> {
return this.http.get<IbosecurityquestionResponse>(AppConstants.ntireboURL+'/bosecurityquestion')
.pipe(
tap((response: IbosecurityquestionResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bosecurityquestion => new bosecurityquestion(bosecurityquestion.questionid,bosecurityquestion.questionname,bosecurityquestion.datamaskid,bosecurityquestion.tablename,bosecurityquestion.fieldname,bosecurityquestion.mode,bosecurityquestion.modedesc,bosecurityquestion.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bosecurityquestion => bosecurityquestion.questionname.includes(filter.name))

return response;
})
);
}



}

