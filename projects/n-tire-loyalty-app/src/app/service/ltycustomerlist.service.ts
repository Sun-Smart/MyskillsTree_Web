import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltycustomerlist } from '../model/ltycustomerlist.model';
import { environment } from '../../environments/environment';
import { IltycustomerlistResponse } from '../model/ltycustomerlist.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltycustomerlistService {
  formData: ltycustomerlist;
  readonly rootURL = AppConstants.baseURL;
  list: ltycustomerlist[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltycustomerlists():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltycustomerlist', body);
  }
  }

  saveOrUpdateltycustomerlistsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltycustomerlist', body);
  }
  }

  getltycustomerlistsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomerlist').toPromise();
  }
  }
  getListBycustomerlistid(customerlistid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomerlist'+'/customerlistid/'+customerlistid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomerlist'+'/param/'+key).toPromise();
  }
  }


  getltycustomerlistsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomerlist'+'/e/'+id).toPromise();
  }
  }
  getltycustomerlistsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomerlist'+'/'+id).toPromise();
  }
  }

  deleteltycustomerlist(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/ltycustomerlist'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomerlist')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

