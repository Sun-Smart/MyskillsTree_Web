import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { systemcolumn } from '../model/systemcolumn.model';
import { environment } from '../../environments/environment';
import { IsystemcolumnResponse } from '../model/systemcolumn.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class systemcolumnService {
  formData: systemcolumn;
  readonly rootURL = AppConstants.baseURL;
  list: systemcolumn[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatesystemcolumns():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/systemcolumn', body);
  }
  }

  saveOrUpdatesystemcolumnsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/systemcolumn', body);
  }
  }

  getsystemcolumnsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/systemcolumn').toPromise();
  }
  }
  getListBysyscolumnid(syscolumnid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/systemcolumn'+'/syscolumnid/'+syscolumnid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/systemcolumn'+'/param/'+key).toPromise();
  }
  }


  getsystemcolumnsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/systemcolumn'+'/e/'+id).toPromise();
  }
  }
  getsystemcolumnsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/systemcolumn'+'/'+id).toPromise();
  }
  }

  deletesystemcolumn(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/systemcolumn'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/systemcolumn')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

