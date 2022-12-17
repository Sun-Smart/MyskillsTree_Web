import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { recfolder } from '../model/recfolder.model';
import { environment } from '../../environments/environment';
import { IrecfolderResponse } from '../model/recfolder.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class recfolderService {
  formData: recfolder;
  readonly rootURL = AppConstants.baseURL;
  list: recfolder[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdaterecfolders():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/recfolder', body);
  }
  }

  saveOrUpdaterecfoldersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/recfolder', body);
  }
  }

  getrecfoldersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/recfolder').toPromise();
  }
  }
  getListByfolderid(folderid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/recfolder'+'/folderid/'+folderid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/recfolder'+'/param/'+key).toPromise();
  }
  }


  getrecfoldersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/recfolder'+'/e/'+id).toPromise();
  }
  }
  getrecfoldersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/recfolder'+'/'+id).toPromise();
  }
  }

  deleterecfolder(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntiredmsURL + '/recfolder'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntiredmsURL + '/recfolder')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IrecfolderResponse> {
return this.http.get<IrecfolderResponse>(AppConstants.ntiredmsURL+'/recfolder')
.pipe(
tap((response: IrecfolderResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(recfolder => new recfolder(recfolder.folderid,recfolder.foldername,recfolder.parentid,recfolder.parentiddesc,recfolder.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(recfolder => recfolder.foldername.includes(filter.name))

return response;
})
);
}



}

