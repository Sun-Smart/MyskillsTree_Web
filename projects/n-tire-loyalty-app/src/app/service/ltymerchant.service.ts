import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltymerchant } from '../model/ltymerchant.model';
import { ltymerchantproduct } from '../model/ltymerchantproduct.model';
import { ltystore } from '../model/ltystore.model';
import { environment } from '../../environments/environment';
import { IltymerchantResponse } from '../model/ltymerchant.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltymerchantService {
  formData: ltymerchant;
  readonly rootURL = AppConstants.baseURL;
  list: ltymerchant[];
  ltymerchantproducts: ltymerchantproduct[]=[];
  ltystores: ltystore[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltymerchants():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      ltymerchantproducts: this.ltymerchantproducts.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      ltystores: this.ltystores.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltymerchant', body);
  }
  }

  saveOrUpdateltymerchantsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltymerchant', body);
  }
  }

  getltymerchantsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltymerchant').toPromise();
  }
  }
  getListBymerchantid(merchantid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltymerchant'+'/merchantid/'+merchantid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltymerchant'+'/param/'+key).toPromise();
  }
  }


  getltymerchantsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltymerchant'+'/e/'+id).toPromise();
  }
  }
  getltymerchantsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltymerchant'+'/'+id).toPromise();
  }
  }

  deleteltymerchant(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/ltymerchant'+'/'+id).toPromise();
  }
  }
clearList(){
this.ltymerchantproducts = [];
this.ltystores = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/ltymerchant')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

