import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsalesorderdetail } from '../model/erpsalesorderdetail.model';
import { environment } from '../../environments/environment';
import { IerpsalesorderdetailResponse } from '../model/erpsalesorderdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsalesorderdetailService {
  formData: erpsalesorderdetail;
  readonly rootURL = AppConstants.baseURL;
  list: erpsalesorderdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsalesorderdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsalesorderdetail', body);
  }
  }

  saveOrUpdateerpsalesorderdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsalesorderdetail', body);
  }
  }

  geterpsalesorderdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsalesorderdetail').toPromise();
  }
  }
  getListBysodetailid(sodetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsalesorderdetail'+'/sodetailid/'+sodetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsalesorderdetail'+'/param/'+key).toPromise();
  }
  }


  geterpsalesorderdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsalesorderdetail'+'/e/'+id).toPromise();
  }
  }
  geterpsalesorderdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsalesorderdetail'+'/'+id).toPromise();
  }
  }

  deleteerpsalesorderdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsalesorderdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsalesorderdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

