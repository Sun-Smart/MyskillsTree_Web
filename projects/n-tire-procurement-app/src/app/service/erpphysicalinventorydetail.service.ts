import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpphysicalinventorydetail } from '../model/erpphysicalinventorydetail.model';
import { environment } from '../../environments/environment';
import { IerpphysicalinventorydetailResponse } from '../model/erpphysicalinventorydetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpphysicalinventorydetailService {
  formData: erpphysicalinventorydetail;
  readonly rootURL = AppConstants.baseURL;
  list: erpphysicalinventorydetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpphysicalinventorydetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpphysicalinventorydetail', body);
  }
  }

  saveOrUpdateerpphysicalinventorydetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpphysicalinventorydetail', body);
  }
  }

  geterpphysicalinventorydetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpphysicalinventorydetail').toPromise();
  }
  }
  getListBypidetailid(pidetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpphysicalinventorydetail'+'/pidetailid/'+pidetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpphysicalinventorydetail'+'/param/'+key).toPromise();
  }
  }


  geterpphysicalinventorydetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpphysicalinventorydetail'+'/e/'+id).toPromise();
  }
  }
  geterpphysicalinventorydetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpphysicalinventorydetail'+'/'+id).toPromise();
  }
  }

  deleteerpphysicalinventorydetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpphysicalinventorydetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpphysicalinventorydetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

