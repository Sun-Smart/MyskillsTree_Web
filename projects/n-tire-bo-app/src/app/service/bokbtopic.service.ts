import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bokbtopic } from '../model/bokbtopic.model';
import { environment } from '../../environments/environment';
import { IbokbtopicResponse } from '../model/bokbtopic.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bokbtopicService {
  formData: bokbtopic;
  readonly rootURL = AppConstants.baseURL;
  list: bokbtopic[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebokbtopics():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bokbtopic', body);
  }
  }

  saveOrUpdatebokbtopicsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bokbtopic', body);
  }
  }

  getbokbtopicsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bokbtopic').toPromise();
  }
  }
  getListBykbtopicid(kbtopicid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bokbtopic'+'/kbtopicid/'+kbtopicid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bokbtopic'+'/param/'+key).toPromise();
  }
  }


  getbokbtopicsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bokbtopic'+'/e/'+id).toPromise();
  }
  }
  getbokbtopicsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bokbtopic'+'/'+id).toPromise();
  }
  }

  deletebokbtopic(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bokbtopic'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bokbtopic')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbokbtopicResponse> {
return this.http.get<IbokbtopicResponse>(AppConstants.ntireboURL+'/bokbtopic')
.pipe(
tap((response: IbokbtopicResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bokbtopic => new bokbtopic(bokbtopic.kbtopicid,bokbtopic.kbid,bokbtopic.kbiddesc,bokbtopic.description,bokbtopic.sequence,bokbtopic.contenttype,bokbtopic.contenttypedesc,bokbtopic.contenttext,bokbtopic.contenturl,bokbtopic.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bokbtopic => bokbtopic.description.includes(filter.name))

return response;
})
);
}



}

