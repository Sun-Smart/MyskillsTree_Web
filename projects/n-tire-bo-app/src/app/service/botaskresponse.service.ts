import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { botaskresponse } from '../model/botaskresponse.model';
import { environment } from '../../environments/environment';
import { IbotaskresponseResponse } from '../model/botaskresponse.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class botaskresponseService {
  formData: botaskresponse;
  readonly rootURL = AppConstants.baseURL;
  list: botaskresponse[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebotaskresponses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/botaskresponse', body);
  }
  }

  saveOrUpdatebotaskresponsesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/botaskresponse', body);
  }
  }

  getbotaskresponsesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/botaskresponse').toPromise();
  }
  }
  getListByresponseid(responseid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/botaskresponse'+'/responseid/'+responseid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/botaskresponse'+'/param/'+key).toPromise();
  }
  }


  getbotaskresponsesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/botaskresponse'+'/e/'+id).toPromise();
  }
  }
  getbotaskresponsesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/botaskresponse'+'/'+id).toPromise();
  }
  }

  deletebotaskresponse(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/botaskresponse'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/botaskresponse')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

