import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsbundledproduct } from '../model/lmsbundledproduct.model';
import { environment } from '../../environments/environment';
import { IlmsbundledproductResponse } from '../model/lmsbundledproduct.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsbundledproductService {
  formData: lmsbundledproduct;
  readonly rootURL = AppConstants.baseURL;
  list: lmsbundledproduct[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmsbundledproducts():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsbundledproduct', body);
  }
  }

  saveOrUpdatelmsbundledproductsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsbundledproduct', body);
  }
  }

  getlmsbundledproductsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsbundledproduct').toPromise();
  }
  }
  getListBybundleproductid(bundleproductid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsbundledproduct'+'/bundleproductid/'+bundleproductid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsbundledproduct'+'/param/'+key).toPromise();
  }
  }


  getlmsbundledproductsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsbundledproduct'+'/e/'+id).toPromise();
  }
  }
  getlmsbundledproductsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsbundledproduct'+'/'+id).toPromise();
  }
  }

  deletelmsbundledproduct(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmsbundledproduct'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmsbundledproduct')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

