import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boprocessform } from '../model/boprocessform.model';
import { environment } from '../../environments/environment';
import { IboprocessformResponse } from '../model/boprocessform.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boprocessformService {
  formData: boprocessform;
  readonly rootURL = AppConstants.baseURL;
  list: boprocessform[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboprocessforms():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/boprocessform', body);
  }
  }

  saveOrUpdateboprocessformsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boprocessform', body);
  }
  }

  getboprocessformsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boprocessform').toPromise();
  }
  }
  getListByprocessformid(processformid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boprocessform'+'/processformid/'+processformid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boprocessform'+'/param/'+key).toPromise();
  }
  }


  getboprocessformsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boprocessform'+'/e/'+id).toPromise();
  }
  }
  getboprocessformsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boprocessform'+'/'+id).toPromise();
  }
  }

  deleteboprocessform(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boprocessform'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boprocessform')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

