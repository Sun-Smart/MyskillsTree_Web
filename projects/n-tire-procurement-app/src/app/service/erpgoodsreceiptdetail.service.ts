import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpgoodsreceiptdetail } from '../model/erpgoodsreceiptdetail.model';
import { environment } from '../../environments/environment';
import { IerpgoodsreceiptdetailResponse } from '../model/erpgoodsreceiptdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpgoodsreceiptdetailService {
  formData: erpgoodsreceiptdetail;
  readonly rootURL = AppConstants.baseURL;
  list: erpgoodsreceiptdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpgoodsreceiptdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpgoodsreceiptdetail', body);
  }
  }

  saveOrUpdateerpgoodsreceiptdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpgoodsreceiptdetail', body);
  }
  }

  geterpgoodsreceiptdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpgoodsreceiptdetail').toPromise();
  }
  }
  getListBygrndetailsid(grndetailsid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpgoodsreceiptdetail'+'/grndetailsid/'+grndetailsid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpgoodsreceiptdetail'+'/param/'+key).toPromise();
  }
  }


  geterpgoodsreceiptdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpgoodsreceiptdetail'+'/e/'+id).toPromise();
  }
  }
  geterpgoodsreceiptdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpgoodsreceiptdetail'+'/'+id).toPromise();
  }
  }

  deleteerpgoodsreceiptdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpgoodsreceiptdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpgoodsreceiptdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

