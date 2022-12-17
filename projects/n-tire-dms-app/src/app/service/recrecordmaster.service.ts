import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { recrecordmaster } from '../model/recrecordmaster.model';
import { reclinkedrecord } from '../model/reclinkedrecord.model';
import { environment } from '../../environments/environment';
import { IrecrecordmasterResponse } from '../model/recrecordmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class recrecordmasterService {
  formData: recrecordmaster;
  readonly rootURL = AppConstants.baseURL;
  list: recrecordmaster[];
  reclinkedrecords: reclinkedrecord[]=[];
  Insertreclinkedrecords: reclinkedrecord[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdaterecrecordmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      reclinkedrecords: this.Insertreclinkedrecords.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntiredmsURL + '/recrecordmaster', body);
  }
  }

  saveOrUpdaterecrecordmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/recrecordmaster', body);
  }
  }

  getrecrecordmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/recrecordmaster').toPromise();
  }
  }
  getListByrecordid(recordid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/recrecordmaster'+'/recordid/'+recordid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/recrecordmaster'+'/param/'+key).toPromise();
  }
  }


  getrecrecordmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/recrecordmaster'+'/e/'+id).toPromise();
  }
  }
  getrecrecordmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/recrecordmaster'+'/'+id).toPromise();
  }
  }

  deleterecrecordmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntiredmsURL + '/recrecordmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.reclinkedrecords = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntiredmsURL + '/recrecordmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IrecrecordmasterResponse> {
return this.http.get<IrecrecordmasterResponse>(AppConstants.ntiredmsURL+'/recrecordmaster')
.pipe(
tap((response: IrecrecordmasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(recrecordmaster => new recrecordmaster(recrecordmaster.recordid,recrecordmaster.recorddate,recrecordmaster.type,recrecordmaster.typedesc,recrecordmaster.referencenumber,recrecordmaster.description,recrecordmaster.folderid,recrecordmaster.folderiddesc,recrecordmaster.documentreference,recrecordmaster.documenttitle,recrecordmaster.documentdate,recrecordmaster.language,recrecordmaster.languagedesc,recrecordmaster.documenttype,recrecordmaster.documenttypedesc,recrecordmaster.documentgroup,recrecordmaster.documentgroupdesc,recrecordmaster.metadata,recrecordmaster.category,recrecordmaster.categorydesc,recrecordmaster.subcategory,recrecordmaster.subcategorydesc,recrecordmaster.notes,recrecordmaster.remarks,recrecordmaster.owner,recrecordmaster.customfield,recrecordmaster.attachment,recrecordmaster.allcomments,recrecordmaster.comments,recrecordmaster.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(recrecordmaster => recrecordmaster.referencenumber.includes(filter.name))

return response;
})
);
}



}

