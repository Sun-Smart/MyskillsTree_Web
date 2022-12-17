import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erprfqsupplier } from '../model/erprfqsupplier.model';
import { environment } from '../../environments/environment';
import { IerprfqsupplierResponse } from '../model/erprfqsupplier.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erprfqsupplierService {
  formData: erprfqsupplier;
  readonly rootURL = AppConstants.baseURL;
  list: erprfqsupplier[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerprfqsuppliers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erprfqsupplier', body);
  }
  }

  saveOrUpdateerprfqsuppliersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erprfqsupplier', body);
  }
  }

  geterprfqsuppliersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erprfqsupplier').toPromise();
  }
  }
  getListByrfqitemsupplierid(rfqitemsupplierid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erprfqsupplier'+'/rfqitemsupplierid/'+rfqitemsupplierid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erprfqsupplier'+'/param/'+key).toPromise();
  }
  }


  geterprfqsuppliersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erprfqsupplier'+'/e/'+id).toPromise();
  }
  }
  geterprfqsuppliersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erprfqsupplier'+'/'+id).toPromise();
  }
  }

  deleteerprfqsupplier(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erprfqsupplier'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erprfqsupplier')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

