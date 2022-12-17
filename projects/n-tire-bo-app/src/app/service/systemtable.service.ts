import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { systemtable } from '../model/systemtable.model';
import { systemtabletemplate } from '../model/systemtabletemplate.model';
import { environment } from '../../environments/environment';
import { IsystemtableResponse } from '../model/systemtable.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class systemtableService {
  formData: systemtable;
  readonly rootURL = AppConstants.baseURL;
  list: systemtable[];
  systemtabletemplates: systemtabletemplate[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatesystemtables():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      systemtabletemplates: this.systemtabletemplates.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/systemtable', body);
  }
  }

  saveOrUpdatesystemtablesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/systemtable', body);
  }
  }

  getsystemtablesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/systemtable').toPromise();
  }
  }
  getListBytableid(tableid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/systemtable'+'/tableid/'+tableid).toPromise();
  }
  }

  getListBytablename(tablename:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/systemtable'+'/tablename/'+tablename).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/systemtable'+'/param/'+key).toPromise();
  }
  }


  getsystemtablesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/systemtable'+'/e/'+id).toPromise();
  }
  }
  getsystemtablesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/systemtable'+'/'+id).toPromise();
  }
  }

  deletesystemtable(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/systemtable'+'/'+id).toPromise();
  }
  }
clearList(){
this.systemtabletemplates = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/systemtable')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

