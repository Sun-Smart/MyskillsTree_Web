import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bousertypemenuaccess } from '../model/bousertypemenuaccess.model';
import { environment } from '../../environments/environment';
import { IbousertypemenuaccessResponse } from '../model/bousertypemenuaccess.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bousertypemenuaccessService {
  formData: bousertypemenuaccess;
  readonly rootURL = AppConstants.baseURL;
  list: bousertypemenuaccess[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebousertypemenuaccesses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bousertypemenuaccess', body);
  }
  }

  saveOrUpdatebousertypemenuaccessesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bousertypemenuaccess', body);
  }
  }

  getbousertypemenuaccessesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousertypemenuaccess').toPromise();
  }
  }
  getListByrolemenuaccessid(rolemenuaccessid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousertypemenuaccess'+'/rolemenuaccessid/'+rolemenuaccessid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousertypemenuaccess'+'/param/'+key).toPromise();
  }
  }


  getbousertypemenuaccessesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousertypemenuaccess'+'/e/'+id).toPromise();
  }
  }
  getbousertypemenuaccessesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bousertypemenuaccess'+'/'+id).toPromise();
  }
  }

  deletebousertypemenuaccess(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bousertypemenuaccess'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bousertypemenuaccess')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

