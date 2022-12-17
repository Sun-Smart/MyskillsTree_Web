import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpproductaccess } from '../model/erpproductaccess.model';
import { environment } from '../../environments/environment';
import { IerpproductaccessResponse } from '../model/erpproductaccess.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpproductaccessService {
  formData: erpproductaccess;
  readonly rootURL = AppConstants.baseURL;
  list: erpproductaccess[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpproductaccesses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpproductaccess', body);
  }
  }

  saveOrUpdateerpproductaccessesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpproductaccess', body);
  }
  }

  geterpproductaccessesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductaccess').toPromise();
  }
  }
  getListByaccessid(accessid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductaccess'+'/accessid/'+accessid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductaccess'+'/param/'+key).toPromise();
  }
  }


  geterpproductaccessesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductaccess'+'/e/'+id).toPromise();
  }
  }
  geterpproductaccessesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductaccess'+'/'+id).toPromise();
  }
  }

  deleteerpproductaccess(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpproductaccess'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpproductaccess')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

