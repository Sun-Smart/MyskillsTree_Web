import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bousergroup } from '../model/bousergroup.model';
import { bousergroupaccess } from '../model/bousergroupaccess.model';
import { environment } from '../../environments/environment';
import { IbousergroupResponse } from '../model/bousergroup.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bousergroupService {
  formData: bousergroup;
  readonly rootURL = AppConstants.baseURL;
  bousergroupaccesses: bousergroupaccess[]=[];
  Insertbousergroupaccesses: bousergroupaccess[]=[];
  list: bousergroup[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebousergroups():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bousergroupaccesses: this.Insertbousergroupaccesses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/bousergroup', body);
  }
  }

  saveOrUpdatebousergroupsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bousergroup', body);
  }
  }

  getbousergroupsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousergroup').toPromise();
  }
  }
  getListByusergroupid(usergroupid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousergroup'+'/usergroupid/'+usergroupid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousergroup'+'/param/'+key).toPromise();
  }
  }


  getbousergroupsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousergroup'+'/e/'+id).toPromise();
  }
  }
  getbousergroupsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousergroup'+'/'+id).toPromise();
  }
  }

  deletebousergroup(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bousergroup'+'/'+id).toPromise();
  }
  }
clearList(){
this.bousergroupaccesses = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bousergroup')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbousergroupResponse> {
return this.http.get<IbousergroupResponse>(AppConstants.ntireboURL+'/bousergroup')
.pipe(
tap((response: IbousergroupResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bousergroup => new bousergroup(bousergroup.usergroupid,bousergroup.groupname,bousergroup.notes,bousergroup.customfield,bousergroup.attachment,bousergroup.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bousergroup => bousergroup.groupname.includes(filter.name))

return response;
})
);
}



}

