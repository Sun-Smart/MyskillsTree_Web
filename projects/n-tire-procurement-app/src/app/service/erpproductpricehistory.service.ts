import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpproductpricehistory } from '../model/erpproductpricehistory.model';
import { environment } from '../../environments/environment';
import { IerpproductpricehistoryResponse } from '../model/erpproductpricehistory.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpproductpricehistoryService {
  formData: erpproductpricehistory;
  readonly rootURL = AppConstants.baseURL;
  list: erpproductpricehistory[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpproductpricehistories():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpproductpricehistory', body);
  }
  }

  saveOrUpdateerpproductpricehistoriesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpproductpricehistory', body);
  }
  }

  geterpproductpricehistoriesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductpricehistory').toPromise();
  }
  }
  getListBypriceid(priceid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductpricehistory'+'/priceid/'+priceid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductpricehistory'+'/param/'+key).toPromise();
  }
  }


  geterpproductpricehistoriesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductpricehistory'+'/e/'+id).toPromise();
  }
  }
  geterpproductpricehistoriesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductpricehistory'+'/'+id).toPromise();
  }
  }

  deleteerpproductpricehistory(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpproductpricehistory'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpproductpricehistory')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

