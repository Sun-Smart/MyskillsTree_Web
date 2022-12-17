import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsproductmaster } from '../model/lmsproductmaster.model';
import { lmsbundledproduct } from '../model/lmsbundledproduct.model';
import { environment } from '../../environments/environment';
import { IlmsproductmasterResponse } from '../model/lmsproductmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsproductmasterService {
  formData: lmsproductmaster;
  readonly rootURL = AppConstants.baseURL;
  list: lmsproductmaster[];
  lmsbundledproducts: lmsbundledproduct[]=[];
  Insertlmsbundledproducts: lmsbundledproduct[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmsproductmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      lmsbundledproducts: this.Insertlmsbundledproducts.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsproductmaster', body);
  }
  }

  saveOrUpdatelmsproductmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsproductmaster', body);
  }
  }

  getlmsproductmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsproductmaster').toPromise();
  }
  }
  getListByproductid(productid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsproductmaster'+'/productid/'+productid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsproductmaster'+'/param/'+key).toPromise();
  }
  }


  getlmsproductmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsproductmaster'+'/e/'+id).toPromise();
  }
  }
  getlmsproductmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsproductmaster'+'/'+id).toPromise();
  }
  }

  deletelmsproductmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmsproductmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.lmsbundledproducts = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmsproductmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

