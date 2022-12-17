import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erptendersupplierresponsedetail } from '../model/erptendersupplierresponsedetail.model';
import { environment } from '../../environments/environment';
import { IerptendersupplierresponsedetailResponse } from '../model/erptendersupplierresponsedetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erptendersupplierresponsedetailService {
  formData: erptendersupplierresponsedetail;
  readonly rootURL = AppConstants.baseURL;
  list: erptendersupplierresponsedetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerptendersupplierresponsedetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptendersupplierresponsedetail', body);
  }
  }

  saveOrUpdateerptendersupplierresponsedetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptendersupplierresponsedetail', body);
  }
  }

  geterptendersupplierresponsedetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendersupplierresponsedetail').toPromise();
  }
  }
  getListByresponsedetailid(responsedetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendersupplierresponsedetail'+'/responsedetailid/'+responsedetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendersupplierresponsedetail'+'/param/'+key).toPromise();
  }
  }


  geterptendersupplierresponsedetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendersupplierresponsedetail'+'/e/'+id).toPromise();
  }
  }
  geterptendersupplierresponsedetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendersupplierresponsedetail'+'/'+id).toPromise();
  }
  }

  deleteerptendersupplierresponsedetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erptendersupplierresponsedetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erptendersupplierresponsedetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

