import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camsmisccost } from '../model/camsmisccost.model';
import { environment } from '../../environments/environment';
import { IcamsmisccostResponse } from '../model/camsmisccost.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camsmisccostService {
  formData: camsmisccost;
  readonly rootURL = AppConstants.baseURL;
  list: camsmisccost[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamsmisccosts():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsmisccost', body);
  }
  }

  saveOrUpdatecamsmisccostsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsmisccost', body);
  }
  }

  getcamsmisccostsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsmisccost').toPromise();
  }
  }
  getListBycostid(costid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsmisccost'+'/costid/'+costid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsmisccost'+'/param/'+key).toPromise();
  }
  }


  getcamsmisccostsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsmisccost'+'/e/'+id).toPromise();
  }
  }
  getcamsmisccostsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsmisccost'+'/'+id).toPromise();
  }
  }

  deletecamsmisccost(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camsmisccost'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camsmisccost')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

