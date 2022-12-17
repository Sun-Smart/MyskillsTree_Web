import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpdcdetail } from '../model/erpdcdetail.model';
import { environment } from '../../environments/environment';
import { IerpdcdetailResponse } from '../model/erpdcdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpdcdetailService {
  formData: erpdcdetail;
  readonly rootURL = AppConstants.baseURL;
  list: erpdcdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpdcdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpdcdetail', body);
  }
  }

  saveOrUpdateerpdcdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpdcdetail', body);
  }
  }

  geterpdcdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpdcdetail').toPromise();
  }
  }
  getListBydcdetailid(dcdetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpdcdetail'+'/dcdetailid/'+dcdetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpdcdetail'+'/param/'+key).toPromise();
  }
  }


  geterpdcdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpdcdetail'+'/e/'+id).toPromise();
  }
  }
  geterpdcdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpdcdetail'+'/'+id).toPromise();
  }
  }

  deleteerpdcdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpdcdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpdcdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

