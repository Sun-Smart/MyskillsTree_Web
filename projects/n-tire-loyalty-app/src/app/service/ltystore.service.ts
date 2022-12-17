import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltystore } from '../model/ltystore.model';
import { environment } from '../../environments/environment';
import { IltystoreResponse } from '../model/ltystore.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltystoreService {
  formData: ltystore;
  readonly rootURL = AppConstants.baseURL;
  list: ltystore[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltystores():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltystore', body);
  }
  }

  saveOrUpdateltystoresList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltystore', body);
  }
  }

  getltystoresList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltystore').toPromise();
  }
  }
  getListBystoreid(storeid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltystore'+'/storeid/'+storeid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltystore'+'/param/'+key).toPromise();
  }
  }


  getltystoresByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltystore'+'/e/'+id).toPromise();
  }
  }
  getltystoresByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltystore'+'/'+id).toPromise();
  }
  }

  deleteltystore(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/ltystore'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/ltystore')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

