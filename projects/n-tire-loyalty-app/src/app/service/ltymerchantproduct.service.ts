import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltymerchantproduct } from '../model/ltymerchantproduct.model';
import { environment } from '../../environments/environment';
import { IltymerchantproductResponse } from '../model/ltymerchantproduct.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltymerchantproductService {
  formData: ltymerchantproduct;
  readonly rootURL = AppConstants.baseURL;
  list: ltymerchantproduct[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltymerchantproducts():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltymerchantproduct', body);
  }
  }

  saveOrUpdateltymerchantproductsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltymerchantproduct', body);
  }
  }

  getltymerchantproductsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltymerchantproduct').toPromise();
  }
  }
  getListBymerchantproductid(merchantproductid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltymerchantproduct'+'/merchantproductid/'+merchantproductid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltymerchantproduct'+'/param/'+key).toPromise();
  }
  }


  getltymerchantproductsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltymerchantproduct'+'/e/'+id).toPromise();
  }
  }
  getltymerchantproductsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltymerchantproduct'+'/'+id).toPromise();
  }
  }

  deleteltymerchantproduct(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/ltymerchantproduct'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/ltymerchantproduct')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

