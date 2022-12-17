import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bocompanyregistration } from '../model/bocompanyregistration.model';
import { environment } from '../../environments/environment';
import { IbocompanyregistrationResponse } from '../model/bocompanyregistration.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bocompanyregistrationService {
  formData: bocompanyregistration;
  readonly rootURL = AppConstants.baseURL;
  list: bocompanyregistration[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebocompanyregistrations():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bocompanyregistration', body);
  }
  }

  saveOrUpdatebocompanyregistrationsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bocompanyregistration', body);
  }
  }

  getbocompanyregistrationsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocompanyregistration').toPromise();
  }
  }
  getListByregistrationid(registrationid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocompanyregistration'+'/registrationid/'+registrationid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocompanyregistration'+'/param/'+key).toPromise();
  }
  }


  getbocompanyregistrationsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocompanyregistration'+'/e/'+id).toPromise();
  }
  }
  getbocompanyregistrationsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocompanyregistration'+'/'+id).toPromise();
  }
  }

  deletebocompanyregistration(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bocompanyregistration'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bocompanyregistration')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

