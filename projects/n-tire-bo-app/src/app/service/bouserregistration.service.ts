import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bouserregistration } from '../model/bouserregistration.model';
import { environment } from '../../environments/environment';
import { IbouserregistrationResponse } from '../model/bouserregistration.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bouserregistrationService {
  formData: bouserregistration;
  readonly rootURL = AppConstants.baseURL;
  list: bouserregistration[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebouserregistrations():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bouserregistration', body);
  }
  }

  saveOrUpdatebouserregistrationsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bouserregistration', body);
  }
  }

  getbouserregistrationsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bouserregistration').toPromise();
  }
  }
  getListByregistrationid(registrationid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bouserregistration'+'/registrationid/'+registrationid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bouserregistration'+'/param/'+key).toPromise();
  }
  }


  getbouserregistrationsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bouserregistration'+'/e/'+id).toPromise();
  }
  }
  getbouserregistrationsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bouserregistration'+'/'+id).toPromise();
  }
  }

  deletebouserregistration(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bouserregistration'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bouserregistration')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

