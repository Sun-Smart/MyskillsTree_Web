import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erptendersuppliercomplianceresponse } from '../model/erptendersuppliercomplianceresponse.model';
import { environment } from '../../environments/environment';
import { IerptendersuppliercomplianceresponseResponse } from '../model/erptendersuppliercomplianceresponse.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erptendersuppliercomplianceresponseService {
  formData: erptendersuppliercomplianceresponse;
  readonly rootURL = AppConstants.baseURL;
  list: erptendersuppliercomplianceresponse[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerptendersuppliercomplianceresponses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptendersuppliercomplianceresponse', body);
  }
  }

  saveOrUpdateerptendersuppliercomplianceresponsesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptendersuppliercomplianceresponse', body);
  }
  }

  geterptendersuppliercomplianceresponsesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendersuppliercomplianceresponse').toPromise();
  }
  }
  getListBycomplianceid(complianceid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendersuppliercomplianceresponse'+'/complianceid/'+complianceid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendersuppliercomplianceresponse'+'/param/'+key).toPromise();
  }
  }


  geterptendersuppliercomplianceresponsesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendersuppliercomplianceresponse'+'/e/'+id).toPromise();
  }
  }
  geterptendersuppliercomplianceresponsesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendersuppliercomplianceresponse'+'/'+id).toPromise();
  }
  }

  deleteerptendersuppliercomplianceresponse(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erptendersuppliercomplianceresponse'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erptendersuppliercomplianceresponse')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

