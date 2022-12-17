import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bomodulehelp } from '../model/bomodulehelp.model';
import { environment } from '../../environments/environment';
import { IbomodulehelpResponse } from '../model/bomodulehelp.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bomodulehelpService {
  formData: bomodulehelp;
  readonly rootURL = AppConstants.baseURL;
  list: bomodulehelp[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebomodulehelps():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bomodulehelp', body);
  }
  }

  saveOrUpdatebomodulehelpsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bomodulehelp', body);
  }
  }

  getbomodulehelpsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomodulehelp').toPromise();
  }
  }
  getListBymodulehelpid(modulehelpid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomodulehelp'+'/modulehelpid/'+modulehelpid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomodulehelp'+'/param/'+key).toPromise();
  }
  }


  getbomodulehelpsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomodulehelp'+'/e/'+id).toPromise();
  }
  }
  getbomodulehelpsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomodulehelp'+'/'+id).toPromise();
  }
  }

  deletebomodulehelp(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bomodulehelp'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bomodulehelp')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbomodulehelpResponse> {
return this.http.get<IbomodulehelpResponse>(AppConstants.ntireboURL+'/bomodulehelp')
.pipe(
tap((response: IbomodulehelpResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bomodulehelp => new bomodulehelp(bomodulehelp.modulehelpid,bomodulehelp.modulekey,bomodulehelp.moduletitle,bomodulehelp.imageurl,bomodulehelp.titlelinktext,bomodulehelp.titlelinkurl,bomodulehelp.contenttext,bomodulehelp.contentlinktext,bomodulehelp.contentlinkurl,bomodulehelp.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bomodulehelp => bomodulehelp.moduletitle.includes(filter.name))

return response;
})
);
}



}

