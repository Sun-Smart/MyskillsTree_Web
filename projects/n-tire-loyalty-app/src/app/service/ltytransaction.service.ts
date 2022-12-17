import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltytransaction } from '../model/ltytransaction.model';
import { ltytransactiondetail } from '../model/ltytransactiondetail.model';
import { environment } from '../../environments/environment';
import { IltytransactionResponse } from '../model/ltytransaction.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltytransactionService {
  formData: ltytransaction;
  readonly rootURL = AppConstants.baseURL;
  list: ltytransaction[];
  ltytransactiondetails: ltytransactiondetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltytransactions():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      ltytransactiondetails: this.ltytransactiondetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltytransaction', body);
  }
  }

  saveOrUpdateltytransactionsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltytransaction', body);
  }
  }

  getltytransactionsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltytransaction').toPromise();
  }
  }
  getListBytransactionid(transactionid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltytransaction'+'/transactionid/'+transactionid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltytransaction'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltytransaction'+'/param/'+key).toPromise();
  }
  }


  getltytransactionsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltytransaction'+'/e/'+id).toPromise();
  }
  }
  getltytransactionsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltytransaction'+'/'+id).toPromise();
  }
  }

  deleteltytransaction(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/ltytransaction'+'/'+id).toPromise();
  }
  }
clearList(){
this.ltytransactiondetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/ltytransaction')
.toPromise()
.then(res => this.list = res as any[]);
}
}
  getltytransactionsListbymonthwise(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltytransaction/'+dt+'').toPromise();
  }
  }



}

