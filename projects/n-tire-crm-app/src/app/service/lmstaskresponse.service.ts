import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmstaskresponse } from '../model/lmstaskresponse.model';
import { environment } from '../../environments/environment';
import { IlmstaskresponseResponse } from '../model/lmstaskresponse.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmstaskresponseService {
  formData: lmstaskresponse;
  readonly rootURL = AppConstants.baseURL;
  list: lmstaskresponse[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmstaskresponses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmstaskresponse', body);
  }
  }

  saveOrUpdatelmstaskresponsesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmstaskresponse', body);
  }
  }

  getlmstaskresponsesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstaskresponse').toPromise();
  }
  }
  getListByresponseid(responseid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstaskresponse'+'/responseid/'+responseid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstaskresponse'+'/param/'+key).toPromise();
  }
  }


  getlmstaskresponsesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstaskresponse'+'/e/'+id).toPromise();
  }
  }
  getlmstaskresponsesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstaskresponse'+'/'+id).toPromise();
  }
  }

  deletelmstaskresponse(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmstaskresponse'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmstaskresponse')
.toPromise()
.then(res => this.list = res as any[]);
}
}



}

