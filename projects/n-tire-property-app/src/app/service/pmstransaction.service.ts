import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmstransaction } from '../model/pmstransaction.model';
import { environment } from '../../environments/environment';
import { IpmstransactionResponse } from '../model/pmstransaction.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmstransactionService {
  formData: pmstransaction;
  readonly rootURL = AppConstants.baseURL;
  list: pmstransaction[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmstransactions():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmstransaction', body);
  }
  }

  saveOrUpdatepmstransactionsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmstransaction', body);
  }
  }

  getpmstransactionsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmstransaction').toPromise();
  }
  }
  getListBytransactionid(transactionid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmstransaction'+'/transactionid/'+transactionid).toPromise();
  }
  }

  getListBycategoryid(categoryid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmstransaction'+'/categoryid/'+categoryid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmstransaction'+'/param/'+key).toPromise();
  }
  }


  getpmstransactionsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmstransaction'+'/e/'+id).toPromise();
  }
  }
  getpmstransactionsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmstransaction'+'/'+id).toPromise();
  }
  }

  deletepmstransaction(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmstransaction'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmstransaction')
.toPromise()
.then(res => this.list = res as any[]);
}
}
  getpmstransactionsListbycategoryid(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmstransaction/'+dt+'').toPromise();
  }
  }

  getpmstransactionsListbymonthwise(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmstransaction/'+dt+'').toPromise();
  }
  }



}

