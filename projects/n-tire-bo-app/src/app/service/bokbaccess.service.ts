import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bokbaccess } from '../model/bokbaccess.model';
import { environment } from '../../environments/environment';
import { IbokbaccessResponse } from '../model/bokbaccess.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bokbaccessService {
  formData: bokbaccess;
  readonly rootURL = AppConstants.baseURL;
  list: bokbaccess[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebokbaccesses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bokbaccess', body);
  }
  }

  saveOrUpdatebokbaccessesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bokbaccess', body);
  }
  }

  getbokbaccessesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bokbaccess').toPromise();
  }
  }
  getListByaccessid(accessid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bokbaccess'+'/accessid/'+accessid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bokbaccess'+'/param/'+key).toPromise();
  }
  }


  getbokbaccessesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bokbaccess'+'/e/'+id).toPromise();
  }
  }
  getbokbaccessesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bokbaccess'+'/'+id).toPromise();
  }
  }

  deletebokbaccess(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bokbaccess'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bokbaccess')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

