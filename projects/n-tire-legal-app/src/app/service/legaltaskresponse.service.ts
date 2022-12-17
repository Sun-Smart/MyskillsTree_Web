import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legaltaskresponse } from '../model/legaltaskresponse.model';
import { environment } from '../../environments/environment';
import { IlegaltaskresponseResponse } from '../model/legaltaskresponse.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legaltaskresponseService {
  formData: legaltaskresponse;
  readonly rootURL = AppConstants.baseURL;
  list: legaltaskresponse[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegaltaskresponses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legaltaskresponse', body);
  }
  }

  saveOrUpdatelegaltaskresponsesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legaltaskresponse', body);
  }
  }

  getlegaltaskresponsesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legaltaskresponse').toPromise();
  }
  }
  getListByresponseid(responseid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legaltaskresponse'+'/responseid/'+responseid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legaltaskresponse'+'/param/'+key).toPromise();
  }
  }


  getlegaltaskresponsesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legaltaskresponse'+'/e/'+id).toPromise();
  }
  }
  getlegaltaskresponsesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legaltaskresponse'+'/'+id).toPromise();
  }
  }

  deletelegaltaskresponse(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legaltaskresponse'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legaltaskresponse')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

