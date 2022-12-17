import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boprocesstaskform } from '../model/boprocesstaskform.model';
import { environment } from '../../environments/environment';
import { IboprocesstaskformResponse } from '../model/boprocesstaskform.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boprocesstaskformService {
  formData: boprocesstaskform;
  readonly rootURL = AppConstants.baseURL;
  list: boprocesstaskform[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboprocesstaskforms():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/boprocesstaskform', body);
  }
  }

  saveOrUpdateboprocesstaskformsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boprocesstaskform', body);
  }
  }

  getboprocesstaskformsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boprocesstaskform').toPromise();
  }
  }
  getListBytaskformid(taskformid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boprocesstaskform'+'/taskformid/'+taskformid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boprocesstaskform'+'/param/'+key).toPromise();
  }
  }


  getboprocesstaskformsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boprocesstaskform'+'/e/'+id).toPromise();
  }
  }
  getboprocesstaskformsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boprocesstaskform'+'/'+id).toPromise();
  }
  }

  deleteboprocesstaskform(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boprocesstaskform'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boprocesstaskform')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

