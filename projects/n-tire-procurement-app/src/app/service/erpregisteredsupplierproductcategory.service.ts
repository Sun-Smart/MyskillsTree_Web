import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpregisteredsupplierproductcategory } from '../model/erpregisteredsupplierproductcategory.model';
import { environment } from '../../environments/environment';
import { IerpregisteredsupplierproductcategoryResponse } from '../model/erpregisteredsupplierproductcategory.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpregisteredsupplierproductcategoryService {
  formData: erpregisteredsupplierproductcategory;
  readonly rootURL = AppConstants.baseURL;
  list: erpregisteredsupplierproductcategory[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpregisteredsupplierproductcategories():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpregisteredsupplierproductcategory', body);
  }
  }

  saveOrUpdateerpregisteredsupplierproductcategoriesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpregisteredsupplierproductcategory', body);
  }
  }

  geterpregisteredsupplierproductcategoriesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpregisteredsupplierproductcategory').toPromise();
  }
  }
  getListBysupplierproductcategoryid(supplierproductcategoryid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpregisteredsupplierproductcategory'+'/supplierproductcategoryid/'+supplierproductcategoryid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpregisteredsupplierproductcategory'+'/param/'+key).toPromise();
  }
  }


  geterpregisteredsupplierproductcategoriesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpregisteredsupplierproductcategory'+'/e/'+id).toPromise();
  }
  }
  geterpregisteredsupplierproductcategoriesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpregisteredsupplierproductcategory'+'/'+id).toPromise();
  }
  }

  deleteerpregisteredsupplierproductcategory(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpregisteredsupplierproductcategory'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpregisteredsupplierproductcategory')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

