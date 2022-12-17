import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bouserbranchaccess } from '../model/bouserbranchaccess.model';
import { environment } from '../../environments/environment';
import { IbouserbranchaccessResponse } from '../model/bouserbranchaccess.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bouserbranchaccessService {
  formData: bouserbranchaccess;
  readonly rootURL = AppConstants.baseURL;
  list: bouserbranchaccess[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebouserbranchaccesses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bouserbranchaccess', body);
  }
  }

  saveOrUpdatebouserbranchaccessesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bouserbranchaccess', body);
  }
  }

  getbouserbranchaccessesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bouserbranchaccess').toPromise();
  }
  }
  getListByaccessid(accessid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bouserbranchaccess'+'/accessid/'+accessid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bouserbranchaccess'+'/param/'+key).toPromise();
  }
  }


  getbouserbranchaccessesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bouserbranchaccess'+'/e/'+id).toPromise();
  }
  }
  getbouserbranchaccessesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bouserbranchaccess'+'/'+id).toPromise();
  }
  }

  deletebouserbranchaccess(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bouserbranchaccess'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bouserbranchaccess')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

