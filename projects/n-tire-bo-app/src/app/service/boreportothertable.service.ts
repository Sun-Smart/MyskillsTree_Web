import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boreportothertable } from '../model/boreportothertable.model';
import { environment } from '../../environments/environment';
import { IboreportothertableResponse } from '../model/boreportothertable.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boreportothertableService {
  formData: boreportothertable;
  readonly rootURL = AppConstants.baseURL;
  list: boreportothertable[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboreportothertables():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/boreportothertable', body);
  }
  }

  saveOrUpdateboreportothertablesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boreportothertable', body);
  }
  }

  getboreportothertablesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreportothertable').toPromise();
  }
  }
  getListByothertableid(othertableid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreportothertable'+'/othertableid/'+othertableid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreportothertable'+'/param/'+key).toPromise();
  }
  }


  getboreportothertablesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreportothertable'+'/e/'+id).toPromise();
  }
  }
  getboreportothertablesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreportothertable'+'/'+id).toPromise();
  }
  }

  deleteboreportothertable(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boreportothertable'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boreportothertable')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

