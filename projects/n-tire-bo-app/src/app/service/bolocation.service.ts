import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bolocation } from '../model/bolocation.model';
import { environment } from '../../environments/environment';
import { IbolocationResponse } from '../model/bolocation.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bolocationService {
  formData: bolocation;
  readonly rootURL = AppConstants.baseURL;
  list: bolocation[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebolocations():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bolocation', body);
  }
  }

  saveOrUpdatebolocationsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bolocation', body);
  }
  }

  getbolocationsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bolocation').toPromise();
  }
  }
  getListBylocationid(locationid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bolocation'+'/locationid/'+locationid).toPromise();
  }
  }

  getListBycityid(cityid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bolocation'+'/cityid/'+cityid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bolocation'+'/param/'+key).toPromise();
  }
  }


  getbolocationsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bolocation'+'/e/'+id).toPromise();
  }
  }
  getbolocationsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bolocation'+'/'+id).toPromise();
  }
  }

  deletebolocation(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bolocation'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bolocation')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

