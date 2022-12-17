import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boreportcolumn } from '../model/boreportcolumn.model';
import { environment } from '../../environments/environment';
import { IboreportcolumnResponse } from '../model/boreportcolumn.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boreportcolumnService {
  formData: boreportcolumn;
  readonly rootURL = AppConstants.baseURL;
  list: boreportcolumn[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboreportcolumns():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/boreportcolumn', body);
  }
  }

  saveOrUpdateboreportcolumnsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boreportcolumn', body);
  }
  }

  getboreportcolumnsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreportcolumn').toPromise();
  }
  }
  getListByreportcolumnid(reportcolumnid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreportcolumn'+'/reportcolumnid/'+reportcolumnid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreportcolumn'+'/param/'+key).toPromise();
  }
  }


  getboreportcolumnsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreportcolumn'+'/e/'+id).toPromise();
  }
  }
  getboreportcolumnsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreportcolumn'+'/'+id).toPromise();
  }
  }

  deleteboreportcolumn(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boreportcolumn'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boreportcolumn')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

