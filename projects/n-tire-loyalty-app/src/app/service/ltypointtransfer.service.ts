import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltypointtransfer } from '../model/ltypointtransfer.model';
import { environment } from '../../environments/environment';
import { IltypointtransferResponse } from '../model/ltypointtransfer.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltypointtransferService {
  formData: ltypointtransfer;
  readonly rootURL = AppConstants.baseURL;
  list: ltypointtransfer[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltypointtransfers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltypointtransfer', body);
  }
  }

  saveOrUpdateltypointtransfersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltypointtransfer', body);
  }
  }

  getltypointtransfersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltypointtransfer').toPromise();
  }
  }
  getListBytransferid(transferid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltypointtransfer'+'/transferid/'+transferid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltypointtransfer'+'/param/'+key).toPromise();
  }
  }


  getltypointtransfersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltypointtransfer'+'/e/'+id).toPromise();
  }
  }
  getltypointtransfersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltypointtransfer'+'/'+id).toPromise();
  }
  }

  deleteltypointtransfer(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/ltypointtransfer'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/ltypointtransfer')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

