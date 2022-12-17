import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boteammember } from '../model/boteammember.model';
import { environment } from '../../environments/environment';
import { IboteammemberResponse } from '../model/boteammember.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boteammemberService {
  formData: boteammember;
  readonly rootURL = AppConstants.baseURL;
  list: boteammember[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboteammembers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/boteammember', body);
  }
  }

  saveOrUpdateboteammembersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boteammember', body);
  }
  }

  getboteammembersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boteammember').toPromise();
  }
  }
  getListByteammemberid(teammemberid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boteammember'+'/teammemberid/'+teammemberid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boteammember'+'/param/'+key).toPromise();
  }
  }


  getboteammembersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boteammember'+'/e/'+id).toPromise();
  }
  }
  getboteammembersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boteammember'+'/'+id).toPromise();
  }
  }

  deleteboteammember(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boteammember'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boteammember')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

