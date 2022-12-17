import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boholidaylist } from '../model/boholidaylist.model';
import { environment } from '../../environments/environment';
import { IboholidaylistResponse } from '../model/boholidaylist.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boholidaylistService {
  formData: boholidaylist;
  readonly rootURL = AppConstants.baseURL;
  list: boholidaylist[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboholidaylists():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/boholidaylist', body);
  }
  }

  saveOrUpdateboholidaylistsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boholidaylist', body);
  }
  }

  getboholidaylistsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boholidaylist').toPromise();
  }
  }
  getListByholidayid(holidayid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boholidaylist'+'/holidayid/'+holidayid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boholidaylist'+'/param/'+key).toPromise();
  }
  }


  getboholidaylistsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boholidaylist'+'/e/'+id).toPromise();
  }
  }
  getboholidaylistsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boholidaylist'+'/'+id).toPromise();
  }
  }

  deleteboholidaylist(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boholidaylist'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boholidaylist')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

