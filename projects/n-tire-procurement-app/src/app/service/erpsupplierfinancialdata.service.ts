import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsupplierfinancialdata } from '../model/erpsupplierfinancialdata.model';
import { environment } from '../../environments/environment';
import { IerpsupplierfinancialdataResponse } from '../model/erpsupplierfinancialdata.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsupplierfinancialdataService {
  formData: erpsupplierfinancialdata;
  readonly rootURL = AppConstants.baseURL;
  list: erpsupplierfinancialdata[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsupplierfinancialdatas():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierfinancialdata', body);
  }
  }

  saveOrUpdateerpsupplierfinancialdatasList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierfinancialdata', body);
  }
  }

  geterpsupplierfinancialdatasList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierfinancialdata').toPromise();
  }
  }
  getListByfindataid(findataid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierfinancialdata'+'/findataid/'+findataid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierfinancialdata'+'/param/'+key).toPromise();
  }
  }


  geterpsupplierfinancialdatasByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierfinancialdata'+'/e/'+id).toPromise();
  }
  }
  geterpsupplierfinancialdatasByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierfinancialdata'+'/'+id).toPromise();
  }
  }

  deleteerpsupplierfinancialdata(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsupplierfinancialdata'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierfinancialdata')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

