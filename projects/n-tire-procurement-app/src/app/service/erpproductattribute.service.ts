import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpproductattribute } from '../model/erpproductattribute.model';
import { environment } from '../../environments/environment';
import { IerpproductattributeResponse } from '../model/erpproductattribute.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpproductattributeService {
  formData: erpproductattribute;
  readonly rootURL = AppConstants.baseURL;
  list: erpproductattribute[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpproductattributes():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpproductattribute', body);
  }
  }

  saveOrUpdateerpproductattributesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpproductattribute', body);
  }
  }

  geterpproductattributesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductattribute').toPromise();
  }
  }
  getListByproductattributeid(productattributeid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductattribute'+'/productattributeid/'+productattributeid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductattribute'+'/param/'+key).toPromise();
  }
  }


  geterpproductattributesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductattribute'+'/e/'+id).toPromise();
  }
  }
  geterpproductattributesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductattribute'+'/'+id).toPromise();
  }
  }

  deleteerpproductattribute(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpproductattribute'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpproductattribute')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

